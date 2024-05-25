import React, {FC, PropsWithChildren} from 'react';
import {Box, Typography} from "@mui/material";
import CopyButton from "@/components/copyButton/copyButton";

type Props = PropsWithChildren & {
    copy: string
}

const TextWithCopy: FC<Props> = ({copy, children}) => {
    return (
        <Box
            display='flex'
            sx={{
                width: '100%',
                alignItems: 'center'
            }}
        >
            <Typography
                sx={{
                    maxWidth: 'calc(100% - 40px)',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                }}
            >
                {children}
            </Typography>
            <CopyButton text={copy}/>
        </Box>
    );
};

export default TextWithCopy
