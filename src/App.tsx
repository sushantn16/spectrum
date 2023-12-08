import React from 'react';
import SensorData from './components/SensorData'; // Update the path as needed
import Header from './components/Header';
import SensorDataStream from './components/SensorDataStream';
import { Box, Tab, Tabs, Typography } from '@mui/material';

const App: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };


  return (
    <div>
      <Header />
      <Box>
      <Tabs value={value} sx={{mb:2}} onChange={(e, newValue)=>handleChange(e,newValue)} centered>
        <Tab label="Sensor Data (Task 1)" />
        <Tab label="Live Sensor Data (Task 2)" />
      </Tabs>
      <Box role="tabpanel" hidden={value !== 0}>
        {value === 0 && (
          <Box p={3}>
            <Typography>
              <SensorData />
            </Typography>
          </Box>
        )}
      </Box>
      <Box role="tabpanel" hidden={value !== 1}>
        {value === 1 && (
          <Box p={3}>
            <Typography>
              <SensorDataStream />
            </Typography>
          </Box>
        )}
      </Box>
    </Box>

    </div>
  );
};

export default App;
