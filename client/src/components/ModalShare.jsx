import {Box, FormControl, IconButton, InputAdornment, Modal, Stack, TextField, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SocialCard from "./SocialCard.jsx";
import {useRef} from "react";
import {toPng} from "html-to-image";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function ModalShare({alert, open, handleClose, profileInfo = {}}) {
	const elementRef = useRef(null);

	const handleClick = () => {
		navigator.clipboard.writeText(window.location.href);
		alert();
	};

	function htmlToImageConvert() {
		const imageId = "socialCardPNG";

		elementRef.current.style.display = "flex";
		elementRef.current.dataset.testid="socialCard";
		if(document.body.querySelector(`img#${imageId}`)) {
			document.body.querySelector(`img#${imageId}`).style.display = "none";
		}
		toPng(elementRef.current, {
			cacheBust: true,
			fetchRequestInit: {referrerPolicy: "no-referrer"}})
			.then((dataUrl) => {
				const img = document.createElement("img");
				img.src = dataUrl;
				img.style.height = "50vh";
				img.id = imageId;
				img.dataset.testid = "socialCardPNG";
				return img;
			})
			.then((img)=>{
				elementRef.current.style.display = "none";
				if(document.body.querySelector(`img#${img.id}`)){
					img.style.display = "flex";
					img.style.justifyContent = "center";
					document.body.querySelector(`img#${img.id}`).replaceWith(img);
				}
				else{
					elementRef.current.parentNode.appendChild(img);
				}

				return img;
			})
			.then((img)=>{
				const link = document.createElement("a");
				link.href = img.src;
				link.download = `BKS - ${profileInfo.name ?? ""}.png`;
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
						sx={{padding: "15px", borderBottom: "2px solid #EFEFEF"}}
					>
						<Typography fontWeight="600" align="center">
							Share
						</Typography>
						<Close onClick={handleClose} sx={{position: "absolute", right: "10px", transform: "scale(0.8)"}}/>
					</Stack>

					<IconButton data-testid={"DownloadButton"} onClick={htmlToImageConvert} sx={{
						position: "static",
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

						<Box sx={{padding: "2px", height: "50vh",}}>
							<Stack
								direction="column"
								alignItems="center"
							>
							<SocialCard
								sx={{display: "none"}}
								elementRef={elementRef} name={profileInfo.name ?? ""}
								avatar={profileInfo.profile_picture ?? ""} handle={profileInfo._id ?? ""}
								top_three={profileInfo.top_three}
							/>

							</Stack>
						</Box>
						<Box sx={{padding: "15px", height: "50vh", width: "95%"}}>
							<FormControl fullWidth>
								<TextField
									value={window.location.href}
									placeholder="BKS/..."
									onClick={handleClick}
									InputProps={{
										readOnly: true,
										startAdornment: (
											<InputAdornment position="start">
												<IconButton type="submit" edge="end">
													<ContentPasteIcon/>
												</IconButton>
											</InputAdornment>
										),
										sx: {
											borderRadius: "8px",
											outline: "0px",
											"& fieldset": {border: "none"},
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