import { Box, Typography } from "@mui/material";

const Improvements = () => {
    return (
        <Box>
            <Typography component='div'>
                <Typography variant='h6' sx={{ textAlign: 'center', mb: 4 }}>Potential Improvements</Typography>
                <ul>
                    <Typography variant='h6'>RESTful Naming Conventions:</Typography>
                    <li>Change endpoint paths to use camelCase instead of PascalCase. Example: /spectrumStatus instead of /SpectrumStatus.</li>
                </ul>
                <ul>
                    <Typography variant='h6'>Resource Naming:</Typography>
                    <li>Use clearer and more descriptive resource names. Example: Rename SpectrumStatus to RocketStatus or VehicleStatus.</li>
                </ul>
                <ul>
                    <Typography variant='h6'>HTTP Methods:</Typography>
                    <li>Ensure appropriate HTTP methods are used. Example: Use GET for retrieving data and POST for actions.</li>
                </ul>
                <ul>
                    <Typography variant='h6'>Token Security:</Typography>
                    <li>If tokens are used, ensure they are securely generated, stored, and transmitted. Example: Use JWTs (JSON Web Tokens) with proper signing and encryption.</li>
                </ul>
            </Typography>
            <Typography component='div'>
            <Typography variant='h6' sx={{ textAlign: 'center', mb: 4 }}>Deviations From Common Standards</Typography>
                <ul>
                    <Typography variant='h6'>WebSocket Endpoint Naming:</Typography>

                    <li>Rename WebSocket endpoint to follow standard path naming conventions. Example: /ws/spectrum instead of /SpectrumWS.</li>
                </ul>
                <ul>
                    <Typography variant='h6'>WebSocket Usage:</Typography>

                    <li>Clearly document WebSocket support and connection establishment in API documentation.</li>
                </ul>
            </Typography>
            <Typography component='div'>
            <Typography variant='h6' sx={{ textAlign: 'center', mb: 4 }}>Performance Enhancements</Typography>
                    <ul>
                        <Typography variant='h6'>Caching Headers:</Typography>
                        <li>Implement caching headers for static data to reduce server load. Example: Use Cache-Control headers for caching.</li>
                    </ul>
                    <ul>
                        <Typography variant='h6'>Compression:</Typography>

                        <li>Enable response compression (e.g., Gzip or Brotli) to reduce data transfer size. Example: Implement server-side compression for JSON payloads.</li>
                    </ul>
            </Typography>
        </Box>
    );
};

export default Improvements;




