'use client'

import {Box, Button, TextField, Typography} from "@mui/material";
import {FC, FormEvent} from "react";
import Link from "next/link";

type Props = {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void,
    type: 'reg' | 'auth',
    isLoading: boolean,
}

const AuthPage: FC<Props> = ({onSubmit, type, isLoading}) => {

    return (
        <Box sx={{maxWidth: '400px', width: "100%", m: 'auto'}}>
            <form onSubmit={onSubmit}>
                <Box display={'flex'} sx={{
                    flexDirection: 'column',
                    gap: '5px',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    p: '20px',
                    borderRadius: '10px'
                }}>
                    <Typography variant='h5' color='text.primary'>
                        {type === "reg" ? 'Регистрация' : 'Авторизация'}
                    </Typography>
                    <TextField label="Логин" variant="standard" name='username' required/>
                    <TextField label="Пароль" type='password' variant="standard" name='password' required/>
                    {type === 'reg' &&
                        <TextField label="Повтор пароля" type='password' variant="standard" name='repeatPassword'
                                   required/>
                    }
                    <Button variant="contained" sx={{mt: '10px'}} type='submit' disabled={isLoading}>
                        {type === 'reg' ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                    <Link href={type === 'reg' ? '/login' : '/reg'}>
                        <Button
                            sx={{width: '100%'}}>{type === 'reg' ? 'Уже зарегистрирован?' : 'Нет аккаунта?'}</Button>
                    </Link>
                </Box>
            </form>
        </Box>
    );
};

export default AuthPage;
