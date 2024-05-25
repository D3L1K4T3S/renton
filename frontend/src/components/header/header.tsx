import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import AuthButtons from "@/components/authButtons/authButtons";
import Link from "next/link";

const Header = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{background: '#000'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link href='/' style={{textDecoration: 'none'}}>Банк</Link>
                    </Typography>
                    <AuthButtons/>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
