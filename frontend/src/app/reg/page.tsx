'use client'

import {FC, FormEvent, useState} from "react";
import AuthPage from "@/components/pages/authPage/authPage";
import {userAPI} from "@/lib/services/UserService";
import {useAppDispatch} from "@/lib/hooks";
import {setTokens} from "@/lib/reducers/userSlice";

const Page: FC = () => {
    const [register, {isLoading}] = userAPI.useRegisterUserMutation()
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const repeatPassword = formData.get('repeatPassword') as string;
        if (password !== repeatPassword) {
            setError('Пароли не совпадают!')
            return
        }
        const result = await register({
            username,
            password
        })

        if (result.data) {
            dispatch(setTokens({
                access: result.data.accessToken,
                refresh: result.data.refreshToken
            }))
        }
        else {
            if (result.error){
                setError('Ошибка регистрации')
            }
        }
    }

    return (
        <AuthPage onSubmit={handleRegister} type='reg' isLoading={isLoading}/>
    );
};

export default Page;
