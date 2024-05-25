import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import AuthButtons from "@/components/authButtons/authButtons";

const Header = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{background: '#000'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Банк
                    </Typography>
                    <AuthButtons/>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
