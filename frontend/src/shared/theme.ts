'use client'
import {createTheme} from "@mui/material";
import {roboto} from "@/shared/font";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#e41f7b',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#86003c',
            // light: '#F5EBFF',
            // dark: will be calculated from palette.secondary.main,
            // contrastText: '#ffffff',
        },
        mode: 'dark'
    },
    typography: {
        fontFamily: roboto.style.fontFamily
    }
});
