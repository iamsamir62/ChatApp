import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    allUsers: [],
    otherUsers: null,
    filterUsers: null,
    selectedUser: null,
    onlineUsers: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setFilteredUsers: (state, action) => {
      state.filterUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    }
  }
})

export const { setAuthUser, setOtherUsers, setSelectedUser, setAllUsers, setOnlineUsers, setFilteredUsers } = userSlice.actions;
export default userSlice.reducer;