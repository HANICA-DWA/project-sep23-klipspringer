import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.unshift(action.payload);
    },
    removeNotification: (state, action) => {
      state.splice(action.payload, 1);
    },
    clearAllNotifications: (state) => {
      return (state = []);
    },
  },
});

export default notificationsSlice.reducer;
export const { addNotification, removeNotification, clearAllNotifications } = notificationsSlice.actions;
