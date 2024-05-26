import {Box, Button, Grid, Typography} from "@mui/material";
import React from "react";
import Link from "next/link";

const blockStyle = {
    border: '1px solid',
    borderColor: 'primary.main',
    padding: '20px',
    borderRadius: '10px',
    minHeight: '200px',
    height: '100%'
}

export default function Home() {
    return (
        <main>
            <Box display='flex' sx={{flexDirection:'column', gap: '20px'}}>
                <Typography variant='h3' component='h1'>
                    Ренессанс крипта
                </Typography>
                <Typography>
                    Хотите стать первооткрывателем новой системы оплаты??? Тогда мы вам идеально подходим!
                </Typography>
                <Typography variant='h6' component='h4'>
                    Наши преимущества:
                </Typography>
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <Box sx={blockStyle}>
                            <Typography variant='h6' component='h4'>
                                Низкая комиссия
                            </Typography>
                            <Typography>
                                Комиссия не зависит от суммы перевода, и в среднем всегда равна около 1 рубля
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Box sx={blockStyle}>
                            <Typography variant='h6' component='h4'>
                                Быстрая обработка транзакций
                            </Typography>
                            <Typography>
                                Транзакции происходят моментально и со 100% гарантией
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Box sx={blockStyle}>
                            <Typography variant='h6' component='h4'>
                                Безопасность при оплате
                            </Typography>
                            <Typography>
                                Для прохождения всех операций необходимо голосовое подтверждение
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{width:'100%', textAlign: 'center'}}>Попробуйте сами <Link href='/reg'>
                    <Button variant='contained'>Попробовать</Button>
                </Link></Box>
            </Box>
        </main>
    );
}
