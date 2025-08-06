const express = require('express');
const cors = require('cors');
const { exportToXLSX } = require('./exportHandler');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json()); // allows large JSON payloads

// Export API route
app.post('/api/export', (req, res) => {
  try {
    const filePath = exportToXLSX(req.body);
    console.log('✅ Exported to:', filePath);
    res.status(200).json({ message: 'Exported successfully', file: filePath });
  } catch (err) {
    console.error('❌ Export error:', err);
    res.status(500).json({ message: 'Export failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
