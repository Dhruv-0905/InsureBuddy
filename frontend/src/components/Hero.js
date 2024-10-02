import React from 'react';
import { Button, Typography } from '@mui/material';

const Hero = () => {
    return (
        <div style={{
            backgroundImage: 'url("/path/to/image.jpg")',
            height: '400px',
            backgroundSize: 'cover',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }}>
            <Typography variant="h2">Revolutionizing Your Insurance Experience</Typography>
            <Button variant="contained" color="secondary" style={{ marginTop: '20px' }}>
                Explore Policies
            </Button>
        </div>
    );
};

export default Hero;
