import { Circle, NotificationsOutlined } from "@mui/icons-material";
import { Avatar, Button, Divider, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationTray() {
    const [notifications, setNotifications] = useState([
        {
            _id: "janwillem",
            profile_picture: "https://yt3.ggpht.com/yti/ADpuP3Pg_aDqzJqgvkj6wSF_s-1ERdm5tS9DEegXejKT=s88-c-k-c0x00ffffff-no-rj"
        },
        {
            _id: "hallo",
            profile_picture: "https://yt3.ggpht.com/yti/ADpuP3Pg_aDqzJqgvkj6wSF_s-1ERdm5tS9DEegXejKT=s88-c-k-c0x00ffffff-no-rj"
        }
    ]);

    const [notificationAnchor, setNotificationAnchor] = useState(null);

    const hasNotification = () => notifications.length > 0;

    const handleOpen = (event) => {
        setNotificationAnchor(event.currentTarget);
    }

    const clearNotifications = () => {
        setNotificationAnchor(null);
        setTimeout(() => setNotifications([]), 200);
    }

    return (
        <div style={{position: "relative"}}>
            {hasNotification() && <Circle 
                htmlColor="#FF2222" 
                sx={{width: "0.5rem", height: "0.5rem", position: "absolute", top: "6%", left: "60%"}}
            />}
            <NotificationsOutlined 
                onClick={handleOpen}
                aria-haspopup="true"
                aria-controls={notificationAnchor ? 'notification-tray' : undefined}
                aria-expanded={notificationAnchor ? 'true' : undefined}
            />
            <Menu
                id="notification-tray"
                anchorEl={notificationAnchor}
                open={notificationAnchor ? true : false}
                onClose={() => setNotificationAnchor(null)}
                sx={{margin: "10px 10px 10px -10px"}}
            >
                {hasNotification() &&
                    notifications.map((item) => <NotificationItem key={item._id} item={item}/>)}
                {hasNotification() && <Stack>
                    <Button
                        onClick={clearNotifications}
                    >Clear notifications</Button>    
                </Stack>}
                {!hasNotification() && <span style={{padding: "5px"}}>You are up to date!</span>}
            </Menu>
        </div>
    )
}

function NotificationItem({ item }) {

    const navigate = useNavigate()

    return (
        <>
            <MenuItem onClick={() => navigate("/" + item._id)}>
                <Stack flexDirection="row" alignItems="center">
                    <Avatar src={item.profile_picture}/>
                    <span style={{paddingLeft: "10px"}}>@{item._id} has followed you!</span>
                </Stack>
            </MenuItem>
            <Divider />
        </>
    )
}