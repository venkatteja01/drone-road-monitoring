import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSensorData } from './DataStore';
import { IconButton, Tooltip, Box, Typography } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import NavigationIcon from '@mui/icons-material/Navigation'; // New icon

import droneIconImg from './utils/placeholder.png';
import userIconImg from './utils/pin.png';

const droneIcon = new L.Icon({
  iconUrl: droneIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const userIcon = new L.Icon({
  iconUrl: userIconImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

function FollowDroneControl({ latestPoint, followMode, setFollowMode }) {
  const map = useMap();

  useEffect(() => {
    if (followMode && latestPoint) {
      map.setView([latestPoint.lat, latestPoint.lng]);
    }
  }, [latestPoint, followMode, map]);

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 10,
        left: 10,
        zIndex: 1000,
      }}
    >
      <Tooltip title="Toggle Follow Drone">
        <IconButton
          onClick={() => setFollowMode(prev => !prev)}
          sx={{
            background: followMode ? '#0ff' : '#fff',
            color: followMode ? '#000' : '#000',
            border: '2px solid #0ff'
          }}
        >
          <NavigationIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

function GoToDroneButton({ latestPoint }) {
  const map = useMap();

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 1000,
      }}
    >
      <Tooltip title="Go to Drone">
        <IconButton
          onClick={() => {
            if (latestPoint) {
              map.setView([latestPoint.lat, latestPoint.lng], 16, { animate: false });
            }
          }}
          sx={{
            background: '#fff',
            color: '#000',
            border: '2px solid #0ff'
          }}
        >
          <MyLocationIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

function CrackLegend() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        boxShadow: '0 0 6px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      <Typography variant="subtitle2" fontWeight="bold">Crack Levels:</Typography>
      <Typography variant="body2" color="blue">Blue: 1–3 cracks</Typography>
      <Typography variant="body2" color="orange">Orange: 4–6 cracks</Typography>
      <Typography variant="body2" color="red">Red: 6+ cracks</Typography>
    </Box>
  );
}

export default function MapView() {
  const { storedData } = useSensorData();
  const [clickLocation, setClickLocation] = useState(null);
  const [locationInfo, setLocationInfo] = useState('');
  const [followMode, setFollowMode] = useState(true);

  const latestPoint = storedData[storedData.length - 1];

  const getColor = (cracks) => {
    if (cracks > 6) return 'red';
    if (cracks >= 4) return 'orange';
    return 'blue';
  };

  return (
    <div style={{ height: '400px', position: 'relative', zIndex: 1 }}>
      <MapContainer
        center={[16.4482, 81.0034]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => {
          map.on('click', (e) => {
            setClickLocation(e.latlng);
            setLocationInfo(null);
          });
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Buttons and Legend */}
        <FollowDroneControl latestPoint={latestPoint} followMode={followMode} setFollowMode={setFollowMode} />
        <GoToDroneButton latestPoint={latestPoint} />
        <CrackLegend />

        {/* Drone Path */}
        {storedData.length > 1 && (
          storedData.slice(1).map((point, index) => {
            const prev = storedData[index];
            return (
              <Polyline
                key={index}
                positions={[[prev.lat, prev.lng], [point.lat, point.lng]]}
                color={getColor(point.cracks)}
              />
            );
          })
        )}

        {/* Drone Marker */}
        {latestPoint && (
          <Marker position={[latestPoint.lat, latestPoint.lng]} icon={droneIcon}>
            <Popup>
              <strong>Drone Position</strong><br />
              Lat: {latestPoint.lat.toFixed(6)}<br />
              Lng: {latestPoint.lng.toFixed(6)}<br />
              Cracks: {latestPoint.cracks}
            </Popup>
          </Marker>
        )}

        {/* Click Marker */}
        {clickLocation && (
          <Marker position={clickLocation} icon={userIcon}>
            <Popup>
              <strong>Clicked Point</strong><br />
              Lat: {clickLocation.lat.toFixed(6)}<br />
              Lng: {clickLocation.lng.toFixed(6)}<br />
              {locationInfo || 'Loading...'}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
