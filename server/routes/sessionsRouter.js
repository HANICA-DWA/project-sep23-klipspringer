import express from "express";
import { googleVerifyIdToken, linkedInVerifyIdToken } from "../functions/authorization.js";
import { createError } from "../functions/errorCreation.js";
import { getUniqueId, getUserBySSOId } from "../functions/users.js";
import User from "../model/user.js";

const router = express.Router();

router.post("/google", async (req, res, next) => {
  const { idToken } = req.body;
  try {
    const googleUser = await googleVerifyIdToken(idToken);
    const { name, sub, picture } = googleUser;
    const user = await getUserBySSOId(sub);
    if (!user) {
      const username = await getUniqueId(name.replace(/\s+/g, ""));
      picture
        ? await User.create({ _id: username, sso_id: sub, sso_provider: "Google", name, profile_picture: picture })
        : await User.create({ _id: username, sso_id: sub, sso_provider: "Google", name });
    }
    req.session.loggedIn = true;
    res.status(201).json({ status: "LOGGED_IN" });
  } catch (err) {
    const error = createError("Signing in failed", 400);
    next(error);
  }
});

router.post("/linkedin", async (req, res, next) => {
  const { authorizationCode } = req.body;
  try {
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
    const user = await getUserBySSOId(sub);
    if (!user) {
      const username = await getUniqueId(name.replace(/\s+/g, ""));
      picture
        ? await User.create({ _id: username, sso_id: sub, sso_provider: "LinkedIn", name, profile_picture: picture })
        : await User.create({ _id: username, sso_id: sub, sso_provider: "LinkedIn", name });
    }
    req.session.loggedIn = true;
    res.status(201).json({ status: "LOGGED_IN" });
  } catch (err) {
    next(err);
  }
});

export default router;
