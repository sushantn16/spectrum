import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Tab, Tabs } from '@mui/material';
import { SpectrumService } from '../services/SpectrumService.service';
import { Sensor } from '../interfaces/SensorType';
import ActionPopup from './ActionPopup';
import DataTable from './DataTable';
import LineChart from './LineChart';

const SensorData: React.FC = () => {
    const [sensorData, setSensorData] = useState<Sensor[]>([]);
    const [showActionPopup, setShowActionPopup] = useState<boolean>(false);
    const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const fetchData = async () => {
        try {
            const data = await SpectrumService.getStatus();
                        setSensorData((prevData) => [data, ...prevData].slice(0, 10));
            if (data.isActionRequired) {
                setShowActionPopup(data.isActionRequired);
                setSelectedSensor(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    },[])

    const handleActionButton = async () => {
        try {
            const data = await SpectrumService.actOnSensorData();
            if (data.status === 200) {
                setShowActionPopup(false);
                fetchData();
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
        <>
            <Box>
                <Typography variant='h4' sx={{ textAlign: 'center', mb: 4 }} >Sensor Data</Typography>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Table" />
                    <Tab label="Line Chart" />
                </Tabs>
                <Box justifyContent={'center'} display={'flex'} sx={{ mt: 3 }}>
                    <Button variant='contained' onClick={fetchData}>Update Data</Button>
                </Box>
                <Box role="tabpanel" hidden={value !== 0}>
                    {value === 0 && (
                        sensorData.length > 0 && (<DataTable sensorData={sensorData} />)
                    )}
                </Box>
                <Box role="tabpanel" hidden={value !== 1}>
                    {value === 1 && (
                        sensorData.length > 0 && (<LineChart sensorData={sensorData} />)
                    )}
                </Box>


                <ActionPopup
                    isOpen={showActionPopup}
                    onClose={(event: React.SyntheticEvent, reason: string) => { handlePopupClose(reason) }}
                    actionButtonClick={handleActionButton}
                    status={selectedSensor?.statusMessage || ''}
                />
            </Box>
        </>
    );
};

export default SensorData;