import express from "express";
import { googleVerifyIdToken } from "../functions/authorization.js";
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

export default router;
