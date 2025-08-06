import React from 'react';
import { Typography, Paper } from '@mui/material';

export default function LiveStream() {
  return (
    <Paper elevation={2} style={{ padding: 16 }}>
      <Typography variant="h6">Live Video Stream</Typography>
      <div style={{ height: 200, background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Simulated Video Feed
      </div>
    </Paper>
  );
}
