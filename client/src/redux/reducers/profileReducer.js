import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const logUserIn = createAsyncThunk("profile/getProfileData", async ({ username }) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_HOST +
      "/user/" +
      username +
      "?" +
      new URLSearchParams({
        fields: ["_id", "name", "profile_picture", "top_three", "shelf", "bookcase", "followers", "following", "sso_provider"],
      }),
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
});

export const followAccount = createAsyncThunk("profile/followAccount", async ({ accountToFollow }, { getState }) => {
  const response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/user/" + getState().profile._id + "/follow", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({ account: accountToFollow }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
});

export const unFollowAccount = createAsyncThunk("profile/unfollowAccount", async ({ accountToUnFollow }, { getState }) => {
  const response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/user/" + getState().profile._id + "/unfollow", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({ account: accountToUnFollow }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
});

export const addToBookcase = createAsyncThunk("profile/addToBookcase", async ({ book, cb }, { getState }) => {
  const response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${getState().profile._id}/bookcase`, {
    method: "PUT",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ book }),
  });
  const data = await response.json();
  if (data.error) {
    cb && cb(data.error);
    throw new Error(data.error);
  } else {
    cb && cb(null);
  }
  return data;
});

export const removeFromBookcase = createAsyncThunk("profile/removeFromBookcase", async ({ isbn, cb }, { getState }) => {
  const response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${getState().profile._id}/bookcase/${isbn}`, {
    method: "DELETE",
    credentials: "include",
    mode: "cors",
  });
  const data = await response.json();
  if (data.error) {
    cb && cb(data.error);
    throw new Error(data.error);
  } else {
    cb && cb(null);
  }
  return data;
});

export const logOut = createAsyncThunk("profile/logout", async () => {
  const response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/sessions", {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
});

const initialState = {
  loggedIn: false,
  _id: "",
  name: "",
  profile_picture: "",
  top_three: {
    name: "",
    books: [],
  },
  shelf: [],
  bookcase: [],
  followers: [],
  following: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(logUserIn.fulfilled, (state, action) => {
      return (state = { ...action.payload, loggedIn: true });
    });
    builder.addCase(logUserIn.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(followAccount.fulfilled, (state, action) => {
      state.following.push({ _id: action.payload._id, profile_picture: action.payload.profile_picture });
    });
    builder.addCase(followAccount.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(unFollowAccount.fulfilled, (state, action) => {
      const index = state.following.indexOf((follow) => follow._id === action.payload._id);
      state.following.splice(index, 1);
    });
    builder.addCase(unFollowAccount.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      return (state = initialState);
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(addToBookcase.fulfilled, (state, action) => {
      state.bookcase.push(action.payload);
    });
    builder.addCase(addToBookcase.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(removeFromBookcase.fulfilled, (state, action) => {
      const index = state.bookcase.indexOf((book) => book._id === action.payload);
      state.bookcase.splice(index, 1);
    });
    builder.addCase(removeFromBookcase.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default profileSlice.reducer;
