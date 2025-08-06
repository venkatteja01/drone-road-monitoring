import React, { useEffect, useState } from 'react';
import { Box, Typography, Slider, Button } from '@mui/material';
import { useSensorData } from './DataStore';
import { format } from 'date-fns';

export default function HistoryViewer() {
  const { storedData } = useSensorData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentData, setCurrentData] = useState(null);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (storedData && storedData.length > 0) {
      if (isLive) {
        setCurrentIndex(storedData.length - 1);
        setCurrentData(storedData[storedData.length - 1]);
      } else if (currentIndex < storedData.length) {
        setCurrentData(storedData[currentIndex]);
      }
    }
  }, [storedData, currentIndex, isLive]);

  const handleSliderChange = (event, newValue) => {
    setIsLive(false); // Turn off live mode when user moves the slider
    setCurrentIndex(newValue);
  };

  const handleGoLive = () => {
    setIsLive(true);
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">📜 Historical Sensor Data</Typography>
      {storedData.length === 0 ? (
        <Typography>Waiting for sensor data...</Typography>
      ) : (
        <>
          <Slider
            value={currentIndex}
            min={0}
            max={storedData.length - 1}
            step={1}
            onChange={handleSliderChange}
            aria-labelledby="sensor-data-slider"
            sx={{ mt: 2 }}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>
            Time: {format(new Date(storedData[currentIndex]?.timestamp), 'HH:mm:ss')}
          </Typography>

          {!isLive && (

<Button
  variant="outlined"
  onClick={handleGoLive}
  size="small"
  sx={{
    mb: 2,
    px: 3,
    py: 1,
    fontWeight: 'bold',
    border: '2px solid transparent',
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(90deg, #00e5ff, #ff33cc, #3399ff)', // softer colors
    backgroundSize: '200% auto',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 3px #0ff, 0 0 6px #f0f, 0 0 9px #06f',
    transition: 'all 0.4s ease-in-out',
    '&:hover': {
      WebkitTextFillColor: '#ffffff', // white text
      backgroundImage: 'linear-gradient(90deg, #00e5ff, #ff33cc, #3399ff)',
      backgroundClip: 'border-box',
      WebkitBackgroundClip: 'border-box',
      border: '2px solid #00e5ff',
      boxShadow: '0 0 6px #0ff, 0 0 12px #f0f, 0 0 18px #3399ff',
      textShadow: 'none',
    },
  }}
>
  🔴 Go Live
</Button>


           
          )}

          <Box>
            <Typography>Temperature: {currentData?.temperature}°C</Typography>
            <Typography>Humidity: {currentData?.humidity}%</Typography>
            <Typography>Cracks Detected: {currentData?.cracks}</Typography>
            <Typography>Latitude: {currentData?.lat}</Typography>
            <Typography>Longitude: {currentData?.lng}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
