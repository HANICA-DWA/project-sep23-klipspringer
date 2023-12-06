import { IosShare } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ProfileLink({ alert }) {
  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <IconButton
      style={{ color: "black", marginLeft: "10px" }}
      onClick={() => {
        handleClick();
        alert();
      }}
    >
      <IosShare />
    </IconButton>
  );
}