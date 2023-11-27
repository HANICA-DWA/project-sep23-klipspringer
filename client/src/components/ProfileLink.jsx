import { IosShare } from "@mui/icons-material";

export default function ProfileLink({ alert }) {

    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href)
    }

    return (
        <IosShare onClick={() => {
            handleClick();
            alert();
        }}></IosShare>
    )
}