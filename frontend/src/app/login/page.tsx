'use client'

import {FC, FormEvent, useState} from "react";
import AuthPage from "@/components/pages/authPage/authPage";
import {userAPI} from "@/lib/services/UserService";
import {useAppDispatch} from "@/lib/hooks";
import {setTokens} from "@/lib/reducers/userSlice";

const Page: FC = () => {
    const [auth, {isLoading}] = userAPI.useAuthUserMutation()
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()

    const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        const result = await auth({
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
                setError('Ошибка авторизации')
            }
        }
    }

    return (
        <AuthPage onSubmit={handleAuth} type='auth' isLoading={isLoading}/>
    );
};

export default Page;
