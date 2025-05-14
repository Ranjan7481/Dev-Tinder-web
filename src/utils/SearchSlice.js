import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    setSearchResults: (state, action) => {
      return action.payload;
    },
    clearSearchResults: () => {
      return [];
    },
  },
});

export const { setSearchResults, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
