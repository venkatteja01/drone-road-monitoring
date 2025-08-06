import React from 'react';
import './App.css';
import SensorData from './components/SensorData';
import MapView from './components/MapView';
import LiveStream from './components/LiveStream';
import HistoryViewer from './components/HistoryViewer';
import { SensorDataProvider } from './components/DataStore';

function App() {
  return (
    <SensorDataProvider>
      <div style={{ padding: 20 }}>
        <h2>🛰️ Drone Road Monitoring</h2>

        {/* Section 1: Live Map View */}
        <div style={{ marginBottom: 20 }}>
          <h3>🗺️ Live Map View</h3>
          <MapView />
        </div>

        {/* Section 2: Live Video Stream */}
        <div style={{ marginBottom: 20 }}>
          <h3>📹 Live Video Stream</h3>
          <LiveStream />
        </div>

        {/* Section 3: Live Sensor Data */}
        <div style={{ marginBottom: 20 }}>
    
          <SensorData />
        </div>

        {/* Section 4: Historical Sensor Timeline */}
        <div style={{ marginBottom: 20 }}>
         
          <HistoryViewer />
        </div>
      </div>
    </SensorDataProvider>
  );
}

export default App;
