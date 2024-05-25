import {useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";

export const useUsername = () => {
    const {access} = useAppSelector(state => state.userReducer)
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (access) {
            try {
                const decrypt = JSON.parse(atob(access.split('.')[1])).sub
                setUsername(decrypt)
            }
            catch {}
        }
    }, [access]);

    return username
}
