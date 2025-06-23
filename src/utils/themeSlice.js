import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "dracula";

const themeSlice = createSlice({
  name: "theme",
  initialState: initialTheme,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === "winter" ? "dracula" : "winter";
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      return newTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeSelector = (state) => state.theme;
export default themeSlice.reducer;
