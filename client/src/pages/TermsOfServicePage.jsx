import Header from "../components/Header.jsx";
import Terms from "../components/Terms.jsx";
import {Stack} from "@mui/material";

export default function TermsOfServicePage(){
	return (
		<Stack justifyContent="flex-start" alignItems="center" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
			<Header backButton />
			<Terms/>
		</Stack>
	)
}