import React from 'react';
import { Typography, Paper } from '@mui/material';
import testfootage from './utils/Drone_Scans_Rural_Road_Footage.mp4';

export default function LiveStream() {
  return (
    <Paper elevation={2} style={{ padding: 16 }}>
      <Typography variant="h6">Live Video Stream</Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <video
          src={testfootage}  // Correctly referencing the imported variable
          width="100%"
          height="auto"
          autoPlay
          loop
          muted
          controls
          style={{ borderRadius: 8, maxHeight: 400 }}
        />
      </div>
    </Paper>
  );
}
