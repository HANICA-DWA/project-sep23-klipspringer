import { Circle, NotificationsOutlined } from "@mui/icons-material";
import { Avatar, Button, Divider, Menu, MenuItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWebSocket, getWebSocket } from "../data/websockets";
import ProfileAvatar from "./ProfileAvatar";

export default function NotificationTray() {
  useEffect(() => {
    getWebSocket().onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "notification_follow") {
        setNotifications(notifications.concat(data.person));
      }
    };
  }, []);

  const [notifications, setNotifications] = useState([]);

  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const hasNotification = () => notifications.length > 0;

  const handleOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const clearNotifications = () => {
    setNotificationAnchor(null);
    setTimeout(() => setNotifications([]), 200);
  };

  return (
    <div style={{ position: "relative" }}>
      {hasNotification() && <Circle htmlColor="#FF2222" sx={{ width: "0.5rem", height: "0.5rem", position: "absolute", top: "6%", left: "60%" }} />}
      <NotificationsOutlined
        onClick={handleOpen}
        aria-haspopup="true"
        aria-controls={notificationAnchor ? "notification-tray" : undefined}
        aria-expanded={notificationAnchor ? "true" : undefined}
      />
      <Menu
        id="notification-tray"
        anchorEl={notificationAnchor}
        open={notificationAnchor ? true : false}
        onClose={() => setNotificationAnchor(null)}
        sx={{ margin: "10px 10px 10px -10px" }}
      >
        {hasNotification() &&
          notifications.map((item) => <NotificationItem key={item._id} item={item} setNotificationAnchor={setNotificationAnchor} />)}
        {hasNotification() && (
          <Stack>
            <Button onClick={clearNotifications}>Clear notifications</Button>
          </Stack>
        )}
        {!hasNotification() && <span style={{ padding: "5px" }}>You are up to date!</span>}
      </Menu>
    </div>
  );
}

function NotificationItem({ item, setNotificationAnchor }) {
  const navigate = useNavigate();

  return (
    <>
      <MenuItem
        onClick={() => {
          setNotificationAnchor(null);
          navigate("/" + item._id);
        }}
      >
        <Stack flexDirection="row" alignItems="center">
          <ProfileAvatar alt={item._id} image={item.profile_picture} border={false} size={40} />
          <span style={{ paddingLeft: "10px" }}>@{item._id} has followed you!</span>
        </Stack>
      </MenuItem>
      <Divider />
    </>
  );
}