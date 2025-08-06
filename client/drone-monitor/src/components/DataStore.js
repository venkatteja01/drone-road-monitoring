import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SensorDataContext = createContext();

export function SensorDataProvider({ children }) {
  const [sensorData, setSensorData] = useState({});
  const [storedData, setStoredData] = useState([]);

  // Gudlavalleru Engineering College approximate starting location
  const [position, setPosition] = useState({ lat: 16.351390, lng: 81.043149 });
  const [direction, setDirection] = useState({ dLat: 0.0001, dLng: 0.0001 });
  const [moveCount, setMoveCount] = useState(0);

  // Generates small random movement direction
  const generateRandomDirection = () => {
    const deltaLat = (Math.random() - 0.5) * 0.0002;
    const deltaLng = (Math.random() - 0.5) * 0.0002;
    return { dLat: deltaLat, dLng: deltaLng };
  };

  // Memoized function to generate new sensor data
  const generateSensorData = useCallback(() => {
    const newLat = position.lat + direction.dLat;
    const newLng = position.lng + direction.dLng;

    setPosition({ lat: newLat, lng: newLng });

    const temperature = (25 + Math.random() * 5).toFixed(2);
    const humidity = (40 + Math.random() * 20).toFixed(2);
    const cracks = Math.floor(Math.random() * 10) + 1;

    return {
      timestamp: new Date().toISOString(),
      temperature,
      humidity,
      cracks,
      lat: newLat,
      lng: newLng,
    };
  }, [position, direction]);

  // Simulate sensor data update
  useEffect(() => {
    const interval = setInterval(() => {
      setMoveCount((prev) => prev + 1);

      // Randomly change direction every >2 min (60 ticks @ 2s interval)
      if (moveCount > 60) {
        setDirection(generateRandomDirection());
        setMoveCount(0);
      }

      const data = generateSensorData();
      setSensorData(data);
      setStoredData((prev) => [...prev, data]);
    }, 2000);

    return () => clearInterval(interval);
  }, [generateSensorData, moveCount]);

  return (
    <SensorDataContext.Provider value={{ sensorData, storedData }}>
      {children}
    </SensorDataContext.Provider>
  );
}

export function useSensorData() {
  return useContext(SensorDataContext);
}
