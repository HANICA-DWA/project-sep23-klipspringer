import Header from "../components/Header.jsx";
import Privacy from "../components/Privacy.jsx";
import {Stack} from "@mui/material";

export default function PrivacyPolicyPage(){
      return (
            <Stack justifyContent="flex-start" alignItems="center" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
                  <Header backButton />
                  <Privacy/>
            </Stack>
      )
}