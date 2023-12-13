import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getProfileData from "../data/getProfileData.js";
import { Box, Button, Divider, FormControl, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { AlternateEmail, ArrowBackIosNew, Edit } from "@mui/icons-material";
import ProfileAvatar from "../components/ProfileAvatar.jsx";
import logout from "../data/logout.js";
import imageCompression from "browser-image-compression";
import { useAlert } from "../hooks/useAlert.jsx";

export default function EditProfilePage({ setLoggedIn }) {
  const navigate = useNavigate();
  const { userName } = useParams();
  const [profileInfo, setProfileInfo] = useState({ _id: "" });
  const [edits, setEdits] = useState({ image: "", nameInput: "" });
  const [message, setMessage] = useState({ type: "", message: "" });
  const [setAlertOn, alert] = useAlert(message.message, 3000, message.type === "error" ? "error" : "success");

  useEffect(() => {
    const getFunction = async () => {
      const data = await getProfileData(userName, ["_id", "profile_picture", "name", "sso_provider"]);
      setProfileInfo(data);
      setEdits({ image: data.profile_picture, nameInput: data.name || "" });
    };
    getFunction();
  }, [userName]);

  const uploadHandler = (e) => {
    e.preventDefault();

    const selectedFile = e.target.files.item(0);
    setEdits({ ...edits, image: selectedFile });
    if (selectedFile && selectedFile.type.match("image.*")) {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const dataUrl = event.target.result;
        setProfileInfo({ ...profileInfo, profile_picture: dataUrl });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const nameInputHandler = (e) => {
    e.preventDefault();

    setEdits({ ...edits, nameInput: e.target.value });
  };

  const onSave = async (e) => {
    const { image, nameInput } = edits;
    const formData = new FormData();

    if (edits.image && edits.image !== profileInfo.profile_picture) {
      const compressedImage = await imageCompression(image, { maxSizeMB: 2 });
      formData.append("image", compressedImage);
    }
    formData.append("name", nameInput);

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${userName}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
        mode: "cors",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setMessage({ type: "success", message: result.message });
    } catch (err) {
      setMessage({ type: "error", message: err.message });
    } finally {
      setAlertOn();
    }
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
          <ProfileAvatar name={profileInfo.name} image={profileInfo.profile_picture} />
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
              value={profileInfo._id}
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
        {profileInfo.sso_provider && (
          <Typography variant="body1" fontWeight={500}>
            Connected via {profileInfo.sso_provider}
          </Typography>
        )}
        <Typography
          variant="body1"
          fontWeight={600}
          color="#6A9D8A"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            logout(setLoggedIn);
            navigate(`/${userName}`);
          }}
        >
          Log Out
        </Typography>
      </Stack>
    </Stack>
  );
}
