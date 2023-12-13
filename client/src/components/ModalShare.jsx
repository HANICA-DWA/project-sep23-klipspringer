import {Box, Button, FormControl, IconButton, InputAdornment, Modal, Stack, TextField, Typography} from "@mui/material";
import {Close, Search} from "@mui/icons-material";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SocialCard from "./SocialCard.jsx";
import {useRef} from "react";
import {toPng} from "html-to-image";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function ModalShare({alert, open, handleClose, profileInfo}) {
	const elementRef = useRef(null);
	const handleClick = () => {
		navigator.clipboard.writeText(window.location.href);
		alert();
	};

	function htmlToImageConvert() {
		elementRef.current.style.display = "block";
		toPng(elementRef.current, { cacheBust: true })
			.then((dataUrl) => {
				elementRef.current.style.display = "none";
				const img = document.createElement("img");
				img.src = dataUrl;
				elementRef.current.parentNode.appendChild(img)
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const styleModal = {
		position: "absolute",
		top: "0",
		left: "0",
		width: "100vw",
		height: "100vh",
		bgcolor: "white",
	};

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<Box sx={styleModal}>
					<Stack
						direction="row"
						justifyContent="center"
						alignItems="center"
						sx={{ padding: "15px", borderBottom: "2px solid #EFEFEF" }}
					>
						<Typography fontWeight="600" align="center">
							Share
						</Typography>
						<Close onClick={handleClose} sx={{ position: "absolute", right: "10px", transform: "scale(0.8)" }} />
					</Stack>
					{/*<Box sx={{padding: "15px"}}>*/}
					<Box sx={{padding: "15px", overflowY: "scroll", height: "40vh"}}>
						<IconButton onClick={htmlToImageConvert} sx={{
							position: "relative",
							bottom: "0",
							right: "0",
							padding: "2px",
							color: "black",
						}}>
							<ArrowCircleDownIcon />
						</IconButton>
						<SocialCard elementRef={elementRef} name={profileInfo.name??""} avatar={profileInfo.profile_picture??""} handle={profileInfo._id??""} top_three={profileInfo.top_three} />
					</Box>
					<Box sx={{padding: "15px",height: "10vh" }}>
						<FormControl fullWidth>
							<TextField
								value={window.location.href}
								placeholder="BKS/..."
								readOnly
								onClick={handleClick}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<IconButton type="submit" edge="end">
												<ContentPasteIcon />
											</IconButton>
										</InputAdornment>
									),
									sx: {
										borderRadius: "8px",
										outline: "0px",
										"& fieldset": { border: "none" },
										backgroundColor: "rgba(0, 0, 0, 0.082)",
									},
								}}
							/>
						</FormControl>
					</Box>
				</Box>
			</Modal>
		</>
	);
}