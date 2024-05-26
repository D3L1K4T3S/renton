'use client'

import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {telegramAPI} from "@/lib/services/TelegramService";
import {useAppSelector} from "@/lib/hooks";
import TextWithCopy from "@/components/textWithCopy/textWithCopy";
import Link from 'next/dist/client/link';

type Props = {
    enable: VoidFunction
}

const TelegramConnect:FC<Props> = ({enable}) => {
    const [username, setUsername] = useState('')
    const [verify, {data}] = telegramAPI.useVerifyMutation()
    const {access} = useAppSelector(state => state.userReducer)
    const [status, setStatus] = useState<'wait' | 'pending' | 'success'>('wait')
    const [skip, setSkip] = useState(false)

    const {currentData, error} = telegramAPI.useCheckQuery({
        access
    }, {
        pollingInterval: 1000,
        skip: !access || skip || status === 'success'
    })

    useEffect(() => {
        if (currentData?.activated) {
            enable()
            setStatus('success')
        }
        else if (currentData?.activated === false || error) {
            setSkip(true)
        }
    }, [currentData]);

    const handleVerify = (event: FormEvent) => {
        const verifyTg = async () => {
            const result = await verify({
                tgName: username,
                access
            })
            if (result.data) {
                setStatus('pending')
            }
        }

        event.preventDefault()
        if (!username) {
            return
        }
        verifyTg()

    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value)
    }

    return (
        <>
            {status === 'wait' && <form onSubmit={handleVerify}>
                <Box display='flex' gap='10px' sx={{flexDirection: 'column'}}>
                    <Typography variant='h6' component='h5'>Подключить telegram</Typography>
                    <TextField label='Username' name='telegram' variant='standard' sx={{width: '100%'}}
                               required onChange={handleChange}/>
                    <Button type='submit' variant='contained'>Подключить</Button>
                </Box>
            </form>}
            {status === 'pending' && data &&
                <Box>
                    <Typography variant='h6' component='h5'>Подтвердите подключение в Telegram, введя код:</Typography>
                    <TextWithCopy copy={data.code}>{data.code}</TextWithCopy>
                    <Link href='https://t.me/renton_voice_bot' target='_blank'>Перейти в Telegram</Link>
                </Box>
            }
            {status === 'success' &&
                <Box>
                    <Typography variant='h6' component='h5'>Telegram аккаунт подключен</Typography>
                </Box>
            }
        </>
    );
};

export default TelegramConnect;
