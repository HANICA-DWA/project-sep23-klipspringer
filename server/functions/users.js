import User from "../model/user.js";

export async function getUserByUsername(username) {
  const user = User.findById(username);
  return user;
}

export async function getUserBySSOId(id, provider) {
  const user = User.findOne({ sso_id: id, sso_provider: provider });
  return user;
}

export async function getUniqueId(username) {
  let usernameSuggestion = username;
  let number = 0;
  while (await User.findById(usernameSuggestion)) {
    number++;
    usernameSuggestion = `${username}${number}`;
  }
  return usernameSuggestion;
}
