export default async function getProfileData(username, fields) {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_HOST +
        "/user/" +
        username +
        "?" +
        new URLSearchParams({
          fields: fields,
        }),
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}
