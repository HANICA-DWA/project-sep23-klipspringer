import express from "express";
import { googleVerifyIdToken, linkedInVerifyIdToken } from "../functions/authorization.js";
import { createError } from "../functions/errorCreation.js";
import { getUniqueId, getUserBySSOId, getUserByUsername } from "../functions/users.js";
import User from "../model/user.js";

const router = express.Router();

/* node:coverage disable */

const forbiddenNames = ["register", "login", "search", "find", "linkedin", "unauthorized"]

router.post("/google", async (req, res, next) => {
  const { idToken, username } = req.body;
  try {
    if (forbiddenNames.includes(username))
      throw createError("Illegal username", 403);
    const googleUser = await googleVerifyIdToken(idToken);
    const { name, sub, picture } = googleUser;
    const user = await getUserBySSOId(sub, "Google");
    let usernameAccount = username;
    if (!user) {
      if (!usernameAccount) throw new Error("No account found");
      const duplicateUser = await getUserByUsername(usernameAccount);
      if (duplicateUser) throw new Error("Username already exists");

      picture
        ? await User.create({ _id: usernameAccount, sso_id: sub, sso_provider: "Google", name, profile_picture: picture })
        : await User.create({ _id: usernameAccount, sso_id: sub, sso_provider: "Google", name });
    } else {
      usernameAccount = user._id;
    }
    req.session.loggedIn = true;
    req.session.user = usernameAccount;
    res.status(201).json({ status: "LOGGED_IN", username: usernameAccount });
  } catch (err) {
    let error = createError("Signing in failed", 400);
    if (err) error = createError(err.message, 400);
    if (err.errors) error = createError(err.errors[Object.keys(err.errors)[0]].message, 400);
    next(error);
  }
});

router.post("/linkedin", async (req, res, next) => {
  const { authorizationCode, username } = req.body;
  try {
    if (forbiddenNames.includes(username))
      throw createError("Illegal username", 403);
    const response = await fetch(
      `https://www.linkedin.com/oauth/v2/accessToken?code=${authorizationCode}&grant_type=authorization_code&client_id=${
        process.env.LINKEDIN_APP_ID
      }&client_secret=${process.env.LINKEDIN_APP_SECRET}&redirect_uri=${"http://localhost:5173/linkedin"}`,
      {
        method: "POST",
      }
    );

    const responseData = await response.json();
    const verifiedData = await linkedInVerifyIdToken(responseData.id_token);
    const { name, sub, picture } = verifiedData;
    const user = await getUserBySSOId(sub, "LinkedIn");
    let usernameAccount = username;
    if (!user) {
      if (!usernameAccount) throw new Error("No account found");
      const duplicateUser = await getUserByUsername(usernameAccount);
      if (duplicateUser) throw new Error("Username already exists");

      picture
        ? await User.create({ _id: usernameAccount, sso_id: sub, sso_provider: "LinkedIn", name, profile_picture: picture })
        : await User.create({ _id: usernameAccount, sso_id: sub, sso_provider: "LinkedIn", name });
    } else {
      usernameAccount = user._id;
    }
    req.session.loggedIn = true;
    req.session.user = usernameAccount;
    res.status(201).json({ status: "LOGGED_IN", username: usernameAccount });
  } catch (err) {
    let error = createError("Signing in failed", 400);
    if (err) error = createError(err.message, 400);
    if (err.errors) error = createError(err.errors[Object.keys(err.errors)[0]].message, 400);
    next(error);
  }
});

router.delete("/", (req, res, next) => {
  req.session.loggedIn = false;
  req.session.user = undefined;
  res.status(200).json({ status: "LOGGED_OUT" });
});

router.get("/current", (req, res, next) => {
  res.status(200).json({ loggedIn: req.session.loggedIn ? true : false, username: req.session.user });
});

export default router;

/* node:coverage enable */
