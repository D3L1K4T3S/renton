import type {Metadata} from "next";
import "./globals.css";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {Container, ThemeProvider} from "@mui/material";
import {theme} from "@/shared/theme";
import React from "react";
import StoreProvider from "@/lib/storeProvider";
import Header from "@/components/header/header";

export const metadata: Metadata = {
    title: "Хакатон",
};

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="ru">
        <body style={{background: '#151515'}}>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <StoreProvider>
                    <Header/>
                    <Container sx={{pt: '20px', pb: '20px'}}>
                        {children}
                    </Container>
                    <footer/>
                </StoreProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
