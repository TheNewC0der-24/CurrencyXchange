import React from 'react';
import './App.css';

import {
  Box, Typography,
} from '@mui/material';

import CurrencyConverter from './Components/CurrencyConverter';

function App() {

  return (
    <React.Fragment>
      <Box sx={{ mt: 5, mb: 5, textAlign: "center" }}>
        <Typography variant="h4">CurrencyXchange</Typography>
        <Typography variant="subtitle1">Check live foreign currency exchange rates</Typography>
      </Box>
      <CurrencyConverter />
    </React.Fragment>
  );
}

export default App;
