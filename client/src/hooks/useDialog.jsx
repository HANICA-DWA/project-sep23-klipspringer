import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material";
import { useState } from "react"

export function useDialog(dialogTitle, dialogText, disagreeText, agreeText, agreeFunction, agreeFunctionParam) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClose = () => {
        setDialogOpen(false);
    };
    const handleOpen = () => {
        setDialogOpen(true);
    };

    const dialog = 
    <Dialog
    open={dialogOpen}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
        {dialogTitle ? 
        <DialogTitle id="alert-dialog-title">
            <Typography>{dialogTitle}</Typography>
        </DialogTitle>
        :
        null
        }

    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <Typography>{dialogText}</Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="secondary" onClick={handleClose}><Typography>{disagreeText}</Typography></Button>
      <Button color="primary" onClick={
        () => {
          handleClose()
          agreeFunction(agreeFunctionParam)
        }} 
        autoFocus>
            <Typography>{agreeText}</Typography>
      </Button>
    </DialogActions>
  </Dialog>

    return [handleOpen, dialog]
}