import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const PolicyCard = ({ policy }) => {
    return (
        <Card style={{ margin: '10px', maxWidth: '300px' }}>
            <CardContent>
                <Typography variant="h5">{policy.name}</Typography>
                <Typography variant="body2" color="textSecondary">{policy.description}</Typography>
                <Button size="small" color="primary">View Details</Button>
                <IconButton color="primary">
    <InfoIcon />
</IconButton>
            </CardContent>
        </Card>
    );
};

export default PolicyCard;
