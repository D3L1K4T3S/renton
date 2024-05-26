import {useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";

export const useUserData = () => {
    const {access} = useAppSelector(state => state.userReducer)
    const [username, setUsername] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if (access) {
            try {
                const decrypt = JSON.parse(atob(access.split('.')[1]))
                setUsername(decrypt.sub)
                setId(decrypt.id)
            }
            catch {}
        }
    }, [access]);

    return {id, username}
}
