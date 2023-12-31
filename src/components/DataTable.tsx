// DataTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LiveSensor, Sensor } from '../interfaces/SensorType';

interface DataTableProps {
    sensorData: Sensor[] | LiveSensor[];
}

const DataTable: React.FC<DataTableProps> = ({ sensorData }) => {

    const camelCaseToNormal = (text:string) => {
        return text.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }
    return (
        <>
            {sensorData && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {sensorData.length > 0 &&
                                    Object.keys(sensorData[0]).map((key) => (
                                        <TableCell key={key} sx={{ fontWeight: 'bold' }}>
                                            {camelCaseToNormal(key)}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sensorData.map((data, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    {Object.values(data).map((value, columnIndex) => (
                                        <TableCell key={columnIndex}>
                                            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default DataTable;
