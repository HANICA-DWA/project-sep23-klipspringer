import { IosShare } from "@mui/icons-material";

export default function ProfileLink({ alert }) {

    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href)
    }

    return (
        <IosShare style={{margin: "10px"}}
        onClick={() => {
            handleClick();
            alert();
        }}></IosShare>
    )
}