import React from 'react';
import Link from "next/link";
import {Button} from "@mui/material";

const AuthButtons = () => {


    return (
        <>
            <Link href='/login'>
                <Button color="inherit">Вход</Button>
            </Link>
            <Link href='/reg'>
                <Button color="inherit">Регистрация</Button>
            </Link>
        </>
    );
};

export default AuthButtons;
