import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Divider, FormControl, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { AlternateEmail, ArrowBackIosNew, Edit } from "@mui/icons-material";
import ProfileAvatar from "../components/ProfileAvatar.jsx";
import imageCompression from "browser-image-compression";
import { useAlert } from "../hooks/useAlert.jsx";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, logOut } from "../redux/reducers/profileReducer.js";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [edits, setEdits] = useState({ imageUrl: "", imageFile: "", nameInput: "" });
  const [message, setMessage] = useState({ type: "", message: "" });
  const [setAlertOn, alert] = useAlert(message.message, 3000, message.type === "error" ? "error" : "success");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setEdits({ ...edits, imageUrl: profile.profile_picture, nameInput: profile.name || "" });
  }, [profile]);

  const uploadHandler = (e) => {
    e.preventDefault();

    const selectedFile = e.target.files.item(0);
    if (selectedFile && selectedFile.type.match("image.*")) {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const dataUrl = event.target.result;
        setEdits({ ...edits, imageUrl: dataUrl, imageFile: selectedFile });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const nameInputHandler = (e) => {
    e.preventDefault();

    setEdits({ ...edits, nameInput: e.target.value });
  };

  const onSave = async (e) => {
    const { imageFile, nameInput } = edits;
    let compressedImage;

    if (imageFile) {
      compressedImage = await imageCompression(imageFile, {
        maxSizeMB: 0.5,
        onProgress: (percentage) => setProgress(percentage),
      });
    }

    const cb = (messageObj) => {
      setMessage(messageObj);
      setAlertOn();
    };

    dispatch(editProfile({ name: nameInput, image: compressedImage, cb }));
  };

  return (
    <Stack alignItems="center" mt={2} useFlexGap gap={2} minHeight="90vh">
      {alert}
      <Stack direction="row" justifyContent="space-between" width="100%">
        <ArrowBackIosNew sx={{ position: "relative", left: 15 }} onClick={() => navigate(-1)} />
        <Typography variant="h5" fontWeight="600" sx={{ position: "relative", left: -15 }}>
          Edit profile
        </Typography>
        <div></div>
      </Stack>
      <Divider style={{ width: "100%" }} />
      <Stack alignItems="center" useFlexGap gap={5}>
        <Box position="relative">
          <CircularProgress variant="determinate" value={progress} size={70} sx={{ position: "absolute", zIndex: 0, top: -3, left: -3.5 }} />

          <ProfileAvatar name={profile.profile_picture} image={edits.imageUrl} />
          <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" hidden onChange={uploadHandler} />
          <label htmlFor="avatar">
            <IconButton
              component="span"
              sx={{
                bgcolor: "black",
                color: "white",
                "&:hover": { bgcolor: "primary.main" },
                width: "40%",
                height: "40%",
                position: "absolute",
                bottom: 0,
                right: -4,
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </label>
        </Box>
        <form>
          <FormControl sx={{ gap: 3 }}>
            <TextField
              value={profile._id}
              disabled
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmail />
                  </InputAdornment>
                ),
              }}
            />
            <TextField value={edits.nameInput} onChange={nameInputHandler} />
          </FormControl>
        </form>
        <Button variant="outlined" sx={{ width: "100%" }} onClick={onSave}>
          Save profile
        </Button>
      </Stack>
      <Stack mt="auto" alignItems="center" useFlexGap gap={1}>
        {profile.sso_provider && (
          <Typography variant="body1" fontWeight={500}>
            Connected via {profile.sso_provider}
          </Typography>
        )}
        <Typography
          variant="body1"
          fontWeight={600}
          color="#6A9D8A"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            const linkToRedirect = `/${profile._id}`;
            dispatch(logOut());
            navigate(linkToRedirect);
          }}
        >
          Log Out
        </Typography>
      </Stack>
    </Stack>
  );
}
