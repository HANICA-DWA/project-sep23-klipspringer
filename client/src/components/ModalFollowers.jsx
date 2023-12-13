import { Close } from "@mui/icons-material";
import { Box, Modal, Stack, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel, TabContext } from '@mui/lab';
import FollowerList from "./FollowerList";

export default function ({ open, handleClose, valueTabs, setValueTabs, followers, following, profile }) {
    const styleModal = {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        bgcolor: "white",
        overflowY: "scroll",
    };

    const handleChange = (event, newValue) => {
        setValueTabs(newValue);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={styleModal} >
                <Box sx={{ position: "sticky", top: "0px", zIndex: "100"}}>
                    <Stack alignItems="center" sx={{ bgcolor: "#F3F3F3" }}>
                        <Typography fontWeight="600" margin="10px" color="#8D8D8D">@{profile}</Typography>
                    </Stack>
                    <Close onClick={handleClose} sx={{ position: "absolute", right: "10px", top: "10px", transform: "scale(0.8)", color: "#8D8D8D" }} />
                    <Tabs onChange={handleChange} value={valueTabs} variant="fullWidth" sx={{ marginBottom: "-15px", bgcolor: "white" }}>
                        <Tab value="followers" label="Followers" />
                        <Tab value="following" label="Following" />
                    </Tabs>
                </Box>
                <TabContext value={valueTabs} >
                    <TabPanel value="followers" variant="scrollable">
                        <FollowerList list={followers} />
                    </TabPanel>
                    <TabPanel value="following">
                        <FollowerList list={following} />
                    </TabPanel>
                </TabContext>
            </Box>
        </Modal>
    )
}