import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducers/profileReducer";
import notificationsReducer from "../reducers/notificationsReducer";

export default configureStore({
    reducer: {
        profile: profileReducer,
        notifications: notificationsReducer,
    }
})