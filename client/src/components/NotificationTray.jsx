import { Circle, NotificationsOutlined } from "@mui/icons-material";
import { Button, Divider, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";
import { useDispatch, useSelector } from "react-redux";
import { addFollower, removeFollower } from "../redux/reducers/profileReducer";
import useWebsocket from "../hooks/useWebsocket";
import { addNotification, clearAllNotifications, removeNotification } from "../redux/reducers/notificationsReducer";

export default function NotificationTray() {
  const notifications = useSelector((state) => state.notifications);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const dispatch = useDispatch();

  useWebsocket((data) => {
    switch (data.type) {
      case "notification_follow":
        dispatch(addNotification({ ...data, message: `@${data.person._id} has followed you!` }));
        dispatch(addFollower({ _id: data.person._id, profile_picture: data.person.profile_picture }));
        break;
      case "notification_unfollow":
        dispatch(addNotification({ ...data, message: `@${data.person._id} stopped following you` }));
        dispatch(removeFollower(data.person._id));
        break;
      case "edited_top_three":
        dispatch(addNotification({ ...data, message: `@${data.person._id} made changes to their top three!` }));
        break;
      case "edited_shelf":
        dispatch(addNotification({ ...data, message: `@${data.person._id} made changes to a shelf!` }));
        break;
      case "new_shelf":
        dispatch(addNotification({ ...data, message: `@${data.person._id} created a new shelf!` }));
        break;
      case "new_book":
        dispatch(addNotification({ ...data, message: `@${data.person._id} added a new book!` }));
        break;
      default:
        console.log("Unknown message type");
    }
  });

  const hasNotification = () => notifications.length > 0;

  const handleOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const clearNotifications = () => {
    setNotificationAnchor(null);
    setTimeout(() => dispatch(clearAllNotifications()), 200);
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
          notifications
            .map((item, index) => <NotificationItem key={`${item.person._id}${index}`} item={item} index={index} setNotificationAnchor={setNotificationAnchor} />)}
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

function NotificationItem({ item, index, setNotificationAnchor }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <MenuItem
        onClick={() => {
          setNotificationAnchor(null);
          dispatch(removeNotification(index));
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