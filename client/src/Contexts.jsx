import { createContext } from "react";

export const LoggedInContext = createContext({ loggedIn: false, username: "" });
