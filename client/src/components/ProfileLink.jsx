import { IosShare } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ModalBookcase from "./ModalBookcase.jsx";
import {useState} from "react";
import ModalShare from "./ModalShare.jsx";

export default function ProfileLink({ profileInfo, alert }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


  return (
      <>
      <ModalShare alert={alert} open={open} handleClose={handleClose} profileInfo={profileInfo}/>
    <IconButton
      style={{ color: "black", marginLeft: "10px" }}
      onClick={handleOpen}
    >
      <IosShare />
    </IconButton>
      </>
  );
}