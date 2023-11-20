import { useContext } from "react";
import { LoggedInContext } from "../Contexts";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { Stack } from "@mui/material";

export default function Header({ setLoggedIn }) {
    const loggedIn = useContext(LoggedInContext).loggedIn;

    return (
        <>
            <Stack direction="row" justifyContent="flex-end">
                {loggedIn ? <LogoutButton setLoggedIn={setLoggedIn} /> : <LoginButton />}
            </Stack>
        </>
    )
}