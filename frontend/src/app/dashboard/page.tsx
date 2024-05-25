import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoughnutChart from "@/components/doughnutChart/doughnutChart";

const blockStyle = {
    border: '1px solid',
    borderColor: 'primary.main',
    padding: '20px',
    borderRadius: '10px',
    height: '100%'
}

const Page = () => {

    return (
        <main>
            <Typography variant='h3' component='h2' sx={{mb: '20px'}}>
                Дашборд
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                    <Box sx={blockStyle}>
                        <Typography
                            sx={{maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                            <b>Адрес:</b> бебеебебебебебеебеебебеебебеебебебебебеебеб
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box sx={blockStyle}>
                        <b>Баланс:</b> 50 рублей
                    </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box sx={blockStyle}>
                        <form>
                            <Box display='flex' gap='10px' sx={{flexDirection: 'column'}}>
                                <Typography variant='h6' component='h5'>Подключить telegram</Typography>
                                <TextField label='Username' name='telegram' variant='standard' sx={{width: '100%'}}
                                           required/>
                                <Button type='submit' variant='contained'>Подключить</Button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Box sx={blockStyle}>
                        <Box sx={{maxHeight: '320px', overflowX: 'auto'}}>
                            <Typography variant='h6' component='h5'>Транзакции</Typography>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                >
                                    Транзакция 1
                                </AccordionSummary>
                                <AccordionDetails sx={{fontSize: '13px'}}>
                                    <Typography
                                        sx={{
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            fontSize: '14px'
                                        }}>
                                        <b>Перевод на адрес:</b> бубубубуубубубуубубубубуубубубубуб
                                    </Typography>
                                    <Typography
                                        sx={{
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            fontSize: '14px'
                                        }}>
                                        <b>Сумма перевода:</b> 10 рублей
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
                                    <Typography
                                        sx={{
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            fontSize: '14px'
                                        }}>
                                        <b>Перевод на адрес:</b> бубубубуубубубуубубубубуубубубубуб
                                    </Typography>
                                    <Typography
                                        sx={{
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            fontSize: '14px'
                                        }}>
                                        <b>Сумма перевода:</b> 10 рублей
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Box sx={blockStyle}>
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
            </Grid>
        </main>
    );
};

export default Page;
