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

export const editProfile = createAsyncThunk("profile/edit", async ({ name, image, cb }, { getState }) => {
  const formData = new FormData();
  if (image) formData.append("image", image);
  formData.append("name", name);

  const response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${getState().profile._id}`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
    mode: "cors",
  });
  const data = await response.json();
  if (data.error) {
    cb && cb({ type: "error", message: data.error });
    throw new Error(data.error);
  } else {
    cb && cb({ type: "success", message: data.message });
  }
  return data;
});

export const addBookToShelf = createAsyncThunk("profile/addBookToShelf", async ({ shelf, book, cb }, { getState }) => {
  const response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${getState().profile._id}/shelves/${shelf}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({ book: book }),
  });
  const data = await response.json();
  if (data.error) {
    cb && cb(data.error);
    throw new Error(data.error);
  } else {
    cb && cb(null);
  }
  return { book: data, shelf };
});

export const deleteShelf = createAsyncThunk("profile/deleteShelf", async ({ shelf, cb }, { getState }) => {
  const response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${getState().profile._id}/shelves/${shelf}`, {
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
  return { message: data, shelf };
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
    builder.addCase(editProfile.fulfilled, (state, action) => {
      const { profile_picture, name } = action.payload;
      state.profile_picture = profile_picture;
      state.name = name;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(addBookToShelf.fulfilled, (state, action) => {
      const { shelf, book } = action.payload;
      const books = Array.isArray(book) ? book : [book];

      books.forEach((book) => {
        if (!state.bookcase.find((element) => element._id === book._id)) state.bookcase.push(book);
      });

      if (shelf === "top_three") {
        if (Array.isArray(book)) {
          book.forEach((item) => {
            state.top_three.books.push(item);
          });
        } else {
          state.top_three.books.push(book);
        }
      } else {
        const userShelfIndex = state.shelf.findIndex((shelfFromState) => shelfFromState._id === shelf);
        if (Array.isArray(book)) {
          book.forEach((item) => {
            state.shelf[userShelfIndex].books.push(item);
          });
        } else {
          state.shelf[userShelfIndex].books.push(book);
        }
      }
    });
    builder.addCase(addBookToShelf.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteShelf.fulfilled, (state, action) => {
      const { shelf } = action.payload;
      const index = state.shelf.findIndex((shelfFromState) => shelfFromState._id === shelf);
      state.shelf.splice(index, 1);
    });
    builder.addCase(deleteShelf.rejected), (state, action) => {
        state.error = action.error.message;
      };
  },
});

export default profileSlice.reducer;
