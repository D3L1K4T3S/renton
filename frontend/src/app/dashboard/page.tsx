'use client'

import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoughnutChart from "@/components/doughnutChart/doughnutChart";
import CopyButton from "@/components/copyButton/copyButton";
import TextWithCopy from "@/components/textWithCopy/textWithCopy";
import TelegramConnect from "@/components/telegramConnect/telegramConnect";
import classes from "./page.module.css";
// import {TonConnectUIProvider} from "@tonconnect/ui-react";
// import {useMasterContract} from "@/hooks/useMasterContract";
import {useUserData} from "@/hooks/useUserData";

const blockStyle = {
    border: '1px solid',
    borderColor: 'primary.main',
    padding: '20px',
    borderRadius: '10px',
    height: '100%'
}

const Page = () => {
    const [disabled, setDisabled] = useState(true)
    const {id} = useUserData()
    // const {childWalletAddress, balance, mint} = useMasterContract(+id);

    // useEffect(() => {
    //     mint()
    // }, [mint]);
    const [counter, setCounter] = useState(3.899)
    const [buttonDisable, setButtonDisable] = useState(false)

    const handleCount = () => {
        setButtonDisable(true)
        setTimeout(()=> {
            setCounter(0.899)
            setButtonDisable(false)
        }, 9000)
    }

    return (
            <main>
                <Typography variant='h3' component='h2' sx={{mb: '20px'}}>
                    Дашборд
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Box sx={blockStyle} className={disabled ? classes.blur : ''}>
                            <TextWithCopy copy='EQCsGjmygYM0cyeNdwXgspsNFVO_8_LztnOhA4SfuACmm60C'>
                                <b>Адрес:</b> EQCsGjmygYM0cyeNdwXgspsNFVO_8_LztnOhA4SfuACmm60C
                            </TextWithCopy>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box sx={blockStyle} className={disabled ? classes.blur : ''}>
                            <Typography
                                sx={{
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
                                }}>
                                <b>Баланс:</b> {counter} Ton
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box sx={blockStyle}>
                            <TelegramConnect enable={() => setDisabled(false)}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box sx={blockStyle} className={disabled ? classes.blur : ''}>
                            <Box sx={{maxHeight: '320px', overflowX: 'auto'}}>
                                <Typography variant='h6' component='h5'>Транзакции</Typography>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                    >
                                        Транзакция 1
                                    </AccordionSummary>
                                    <AccordionDetails sx={{fontSize: '13px'}}>
                                        <TextWithCopy copy="AAE_whYrbM0Hf9G1eRc_rRvGC2BH6qH3jko">
                                            <b>Перевод на адрес:</b> AAE_whYrbM0Hf9G1eRc_rRvGC2BH6qH3jko
                                        </TextWithCopy>
                                        <Typography
                                            sx={{
                                                maxWidth: '100%',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                fontSize: '14px'
                                            }}>
                                            <b>Сумма перевода:</b> 1.188 Ton
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                    >
                                        Транзакция 2
                                    </AccordionSummary>
                                    <AccordionDetails sx={{fontSize: '13px'}}>
                                        <TextWithCopy copy="AAE_whYrbM0Hf9G1eRc_rRvGC2BH6qH3jko">
                                            <b>Перевод на адрес:</b> AAE_whYrphfRaf9G1eRc_rRvGC2BH6qH3jko
                                        </TextWithCopy>
                                        <Typography
                                            sx={{
                                                maxWidth: '100%',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                fontSize: '14px'
                                            }}>
                                            <b>Сумма перевода:</b> 2.491 Ton
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box sx={blockStyle} className={disabled ? classes.blur : ''}>
                            <Box sx={{maxHeight: '200px', width: 'max-content', m: 'auto'}}>
                                <DoughnutChart
                                    data={[50, 40]}
                                    colors={['#e41f7b', '#86003c']}
                                    label='Ton:'
                                    labels={['Заработано', 'Потрачено']}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box sx={blockStyle} className={disabled ? classes.blur : ''}>
                            <Box sx={{maxHeight: '200px', width: 'max-content', m: 'auto'}}>
                                <Button variant={'contained'} onClick={handleCount} disabled={buttonDisable}>Выставление счета (демо)</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </main>
        // </TonConnectUIProvider>
    )
};

export default Page;
