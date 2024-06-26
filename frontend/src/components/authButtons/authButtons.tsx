'use client'

import React from 'react';
import Link from "next/link";
import {Button} from "@mui/material";
import {useUserData} from "@/hooks/useUserData";
import {useAuth} from "@/hooks/useAuth";
import PersonIcon from '@mui/icons-material/Person';
import {useAppDispatch} from "@/lib/hooks";
import {setTokens} from "@/lib/reducers/userSlice";
import {useRouter} from "next/navigation";

const AuthButtons = () => {
    const {isAuthenticated} = useAuth()
    const {username} = useUserData()
    const dispatch = useAppDispatch()
    const {push} = useRouter()

    const signOut = () => {
        dispatch(setTokens({refresh: '', access: ''}))
        push('/')
    }

    return (isAuthenticated
            ? <>
                <PersonIcon/>
                {username}
                <Button variant='outlined' color="inherit" onClick={signOut} sx={{ml: '10px'}}>
                    Выйти
                </Button>
            </>
            : <>
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
