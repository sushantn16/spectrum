import React from 'react';
import { LiveSensor } from '../interfaces/SensorType';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Stack, Typography } from '@mui/material';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineChartProps {
    sensorData: LiveSensor[];
}

const LineChartLive: React.FC<LineChartProps> = ({ sensorData }) => {
    const label = sensorData.map(() => '')
    const VelocityChart = {
        labels: label,
        datasets: [
            {
                label: 'Velocity',
                data: sensorData.map((data) => (data.Velocity)),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            }
        ],
    };
    const AltitudeChart = {
        labels: label,
        datasets: [
            {
                label: 'Altitude',
                data: sensorData.map((data) => data.Altitude),
                borderColor: 'rgba(192, 75, 192, 1)',
                fill: false,
            },
        ],
    };
    const TemperatureChart = {
        labels: label,
        datasets: [
            {
                label: 'Temperature',
                data: sensorData.map((data) => data.Temperature),
                borderColor: 'rgba(192, 192, 75, 1)',
                fill: false,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Data Points',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Stack direction="row" spacing={2}>
                <div style={{ height: '300px', width: '300px' }}>
                    <Line options={options} data={VelocityChart} />
                </div>
                <div style={{ height: '300px', width: '300px' }}>
                    <Line options={options} data={AltitudeChart} />
                </div>
                <div style={{ height: '300px', width: '300px' }}>
                    <Line options={options} data={TemperatureChart} />
                </div>
                <Stack direction="column" spacing={2}>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Status:</span> {sensorData[0].StatusMessage}
                    </Typography>
                    <Typography>{sensorData[0].IsAscending ? "Ascending" : "Descending"}</Typography>
                </Stack>
            </Stack>
        </div>
    );
};

export default LineChartLive;
