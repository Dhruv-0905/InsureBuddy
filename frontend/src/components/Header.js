import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" style={{ background: '#007BFF' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Insurance Agent
                </Typography>
                <Button color="inherit">Get Started</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
