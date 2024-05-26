import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {userAPI} from "@/lib/services/UserService";
import {setAccessToken, setTokens} from "@/lib/reducers/userSlice";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const {access, refresh} = useAppSelector(state => state.userReducer)
    const pathname = usePathname()
    const {push} = useRouter();
    const dispatch = useAppDispatch()

    const [refreshUser] = userAPI.useRefreshUserMutation()

    const refreshFunction = async () => {
        const result = await refreshUser({refreshToken: refresh})

        if (result.error) {
            dispatch(setTokens({access: '', refresh: ''}))
            setIsAuthenticated(false)
        } else {
            dispatch(setAccessToken({access: result.data.accessToken}))
        }
    }

    useEffect(() => {
        if (refresh) {
            refreshFunction()
        }
    }, []);

    useEffect(() => {
        if (refresh) {
            if (!access) {
                refreshFunction()
            } else {
                setIsAuthenticated(true)
                setTimeout(refreshFunction, 1000 * 60 * 4)
            }
        }
    }, [access]);

    useEffect(() => {
        if (access && refresh) {
            if (pathname === '/login' || pathname === '/reg') {
                push('/dashboard')
            }
        }
        else {
            if (pathname === '/dashboard') {
                push('/login')
            }
        }
    }, [refresh, pathname])

    useEffect(() => {
        if (!access && !refresh) {
            setIsAuthenticated(false)
        }
    }, [access, refresh]);

    return {
        isAuthenticated
    }
}
