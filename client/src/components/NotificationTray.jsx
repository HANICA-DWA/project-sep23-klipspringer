import { Circle, NotificationsOutlined } from "@mui/icons-material";
import { useState } from "react";

export default function NotificationTray() {

    const [hasNotification, setHasNotification] = useState(true);
    const [notifications, setNotifications] = useState([
        {
            _id: "Jan Willem",
            profile_picture: "https://yt3.ggpht.com/yti/ADpuP3Pg_aDqzJqgvkj6wSF_s-1ERdm5tS9DEegXejKT=s88-c-k-c0x00ffffff-no-rj"
        }
    ]);

    return (
        <div style={{position: "relative"}}>
            {hasNotification && <Circle 
                htmlColor="#FF2222" 
                sx={{width: "0.5rem", height: "0.5rem", position: "absolute", top: "6%", left: "60%"}}
            />}
            <NotificationsOutlined 
                onBlur={() => alert("ding")}
            />
        </div>
    )
}