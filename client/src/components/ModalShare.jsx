import {Box, FormControl, IconButton, InputAdornment, Modal, Stack, TextField, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SocialCard from "./SocialCard.jsx";
import {useRef} from "react";
import {toPng} from "html-to-image";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function ModalShare({ alert, open, handleClose, profileInfo}) {
	const elementRef = useRef(null);

	const handleClick = () => {
		navigator.clipboard.writeText(window.location.href);
		alert();
	};

	function htmlToImageConvert() {
		toPng(elementRef.current, { cacheBust: true })
			.then((dataUrl) => {
				const img = document.createElement("img");
				img.src = dataUrl;
				img.style.width = "100%";
				elementRef.current.style.display = "none";
				elementRef.current.parentNode.appendChild(img);

				const link = document.createElement("a");
				link.href = dataUrl;
				link.download = `BKS - ${profileInfo.name??""}.png`;
				link.click();
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
					<Box sx={{padding: "2px", height: "40vh",}}>
						{/*<Stack*/}
						{/*	direction="row"*/}
						{/*	justifyContent="center"*/}
						{/*	alignItems="center"*/}
						{/*	>*/}
						<IconButton onClick={htmlToImageConvert} sx={{
							position: "fixed",
							color: "black",
							top: "0",
							left: "0",
							bgcolor: "white",
							borderRadius: "8px",
							boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.1)",
							padding: "2px",
						}}>
							<ArrowCircleDownIcon fontSize={"large"}/>
						</IconButton>
						<SocialCard
							sx={{display: "none"}}
							elementRef={elementRef} name={profileInfo.name??""} avatar={profileInfo.profile_picture??""} handle={profileInfo._id??""} top_three={profileInfo.top_three} />

						{/*</Stack>*/}
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