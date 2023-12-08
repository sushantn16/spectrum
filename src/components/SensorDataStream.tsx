import React, { useState, useEffect } from 'react';
import { SpectrumService } from '../services/SpectrumService.service';
import { LiveSensor } from '../interfaces/SensorType';
import DataTable from './DataTable';
import ActionPopup from './ActionPopup';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import LineChartLive from './LineChartLive';

const SensorDataStream = () => {
  const [sensorData, setSensorData] = useState<LiveSensor[]>([]);
  const [selectedSensor, setSelectedSensor] = useState<LiveSensor | null>(null);
  const [showActionPopup, setShowActionPopup] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    SpectrumService.closeWebSocketConnection();
    startWebSocket();
  };

  const handleData = (data: LiveSensor) => {
    setSensorData((prevData) => [data, ...prevData].slice(0, 10));

    if (data.IsActionRequired) {
      setShowActionPopup(data.IsActionRequired);
      setSelectedSensor(data);
      SpectrumService.closeWebSocketConnection();
    }
  };
  const startWebSocket = () => {
    SpectrumService.getLiveSensorData(handleData);
  };

  useEffect(() => {
    startWebSocket();
    return () => {
      SpectrumService.closeWebSocketConnection();
    };
        // eslint-disable-next-line
  }, []);

  const handleActionButton = async () => {
    try {
      const data = await SpectrumService.actOnSensorData();
      if (data.status === 200) {
        setShowActionPopup(false);
        setSelectedSensor(null);
        startWebSocket();
      }
    } catch (error) {
      console.error('Problem with action', error);
    }
  };

  const handlePopupClose = (reason: string) => {
    if (reason === 'backdropClick') {
      return;
    }
    setShowActionPopup(false);
    setSelectedSensor(null);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Live Sensor Data
      </Typography>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Table" />
        <Tab label="Line Chart" />
      </Tabs>

      <Box role="tabpanel" hidden={value !== 0}>
        {value === 0 && (
          sensorData.length > 0 && (<DataTable sensorData={sensorData} />)
        )}
      </Box>
      <Box role="tabpanel" hidden={value !== 1}>
        {value === 1 && (
          sensorData.length > 0 && (<LineChartLive sensorData={sensorData} />)
        )}
      </Box>
      {selectedSensor !== null && (
        <ActionPopup
          isOpen={showActionPopup}
          onClose={(event: React.SyntheticEvent, reason: string) => {
            handlePopupClose(reason);
          }}
          status={selectedSensor.StatusMessage}
          actionButtonClick={handleActionButton}
        />
      )}
    </Box>
  );
};

export default SensorDataStream;
