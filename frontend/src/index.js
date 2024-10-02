import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this line
import App from './App';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root')); // Update this line

// Render your application
root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
