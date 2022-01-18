import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                h6: {
                    fontWeight: 800,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    borderRadius: "6px",
                    boxShadow: "none",
                    "&:focus": {
                        boxShadow: "none",
                    },
                },
            },
        },
    },
    palette: {
        primary: {
            main: "#48b30c",
            contrastText: "White",
        },
    },
});
