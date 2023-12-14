import { Circle, NotificationsOutlined } from "@mui/icons-material";
import { Button, Divider, Menu, MenuItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWebSocket } from "../data/websockets";
import ProfileAvatar from "./ProfileAvatar";

export default function NotificationTray() {
  useEffect(() => {
    getWebSocket().onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.type) {
        case "notification_follow":
          setNotifications(notifications.concat({ link: data.link, person: data.person, message: `@${data.person._id} has followed you!` }));
          break;
        case "edited_top_three":
          setNotifications(
            notifications.concat({ link: data.link, person: data.person, message: `@${data.person._id} made changes to their top three!` })
          );
          break;
        case "edited_shelf":
          setNotifications(notifications.concat({ link: data.link, person: data.person, message: `@${data.person._id} made changes to a shelf!` }));
          break;
        case "new_shelf":
          setNotifications(notifications.concat({ ...data, message: `@${data.person._id} created a new shelf!` }));
          break;
        case "new_book":
          setNotifications(notifications.concat({ ...data, message: `@${data.person._id} added a new book!` }));
          break;
        default:
          console.log("Unknown message type");
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
          navigate(item.link);
        }}
      >
        <Stack flexDirection="row" alignItems="center">
          <ProfileAvatar alt={item.person._id} image={item.person.profile_picture} border={false} size={40} />
          <span style={{ paddingLeft: "10px" }}>{item.message}</span>
        </Stack>
      </MenuItem>
      <Divider />
    </>
  );
}