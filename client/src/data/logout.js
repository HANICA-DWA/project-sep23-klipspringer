export default async function (setLoggedIn) {
  await fetch(import.meta.env.VITE_BACKEND_HOST + "/sessions", {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  });
  setLoggedIn({ loggedIn: false, username: undefined });
}
