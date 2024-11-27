'use client'

import { createTheme } from "@/lib/mui";

const theme = createTheme({
  palette: {
    mode: "light"
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
        },
      },
    },
  },
  typography: {
    button: {
      fontSize: "1rem",
    },
  },
});

export default theme;