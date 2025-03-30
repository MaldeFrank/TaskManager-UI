import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../model/Profile";

interface profilelistState {
  list: Profile[];
}

const initialState: profilelistState = {
  list: [],
};

{
  /* ---------------------------------------------------------------------
    Function: profileSlicer
    Purpose: To manage profilelist state with the reducer functions
    --------------------------------------------------------------------- */
}
const profileSlicer = createSlice({
  name: "profilelist",
  initialState,
  reducers: {
    addProfile(state, action: PayloadAction<Profile>) {
      const profileIndex = state.list.findIndex((item) => item.id === action.payload.id);
      if (profileIndex !== -1) {
        state.list[profileIndex] = {
          ...state.list[profileIndex],
          ...action.payload,
        };
      } else {
        state.list.push(action.payload);
      }
    },
    setProfiles(state, action: PayloadAction<Profile[]>) {
      state.list = action.payload;
    },
    removeProfile(state, action: PayloadAction<{ id: number }>) {
      const index = state.list.findIndex((profile) => profile.id === action.payload.id);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
  },
});

export const { addProfile, setProfiles, removeProfile } = profileSlicer.actions;

export default profileSlicer.reducer;
