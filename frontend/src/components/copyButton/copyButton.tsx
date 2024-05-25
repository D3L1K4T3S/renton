'use client'

import React, {FC, useState} from 'react';
import {IconButton, Snackbar} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type Props = {
    text: string
}

const CopyButton:FC<Props> = ({text}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <IconButton onClick={handleClick} color="primary" sx={{height: '20px'}}>
                <ContentCopyIcon/>
            </IconButton>
            <Snackbar
                message="Скопировано"
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                open={open}
            />
        </>
    );
};

export default CopyButton;
