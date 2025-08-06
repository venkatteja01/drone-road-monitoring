// src/components/SensorData.jsx
import React from 'react';
import { useSensorData } from './DataStore';

export default function SensorData() {
  const { sensorData } = useSensorData();

  if (!sensorData || Object.keys(sensorData).length === 0) {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>📡 Live Sensor Data</h3>
        <p>Waiting for sensor data...</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>📡 Live Sensor Data</h3>
      <ul>
        <li><strong>Timestamp:</strong> {new Date(sensorData.timestamp).toLocaleString()}</li>
        <li><strong>Temperature:</strong> {sensorData.temperature} °C</li>
        <li><strong>Humidity:</strong> {sensorData.humidity} %</li>
        <li><strong>Cracks Detected:</strong> {sensorData.cracks}</li>
        <li><strong>Latitude:</strong> {sensorData.lat}</li>
        <li><strong>Longitude:</strong> {sensorData.lng}</li>
      </ul>
    </div>
  );
}
