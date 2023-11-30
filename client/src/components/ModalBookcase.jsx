import { Close } from "@mui/icons-material";
import { Modal, Typography, Stack, Box } from "@mui/material";
import { useState, useEffect } from "react";

export default function ModalBookcase({ open, handleClose, bookcase }) {
  const styleModal = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    bgcolor: "white",
    overflow: "scroll",
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <Stack direction="row" justifyContent="center" alignItems="center" sx={{ padding: "15px", bgcolor: "#F3F3F3" }}>
            <Typography fontWeight="600" color="#8D8D8D" align="center">
              Choose from bookcase
            </Typography>
            <Close onClick={handleClose} sx={{ position: "absolute", right: "10px", transform: "scale(0.8)" }} />
          </Stack>
          {bookcase.map((book) => (
            <Typography>{book.title}</Typography>
          ))}
        </Box>
      </Modal>
    </>
  );
}
