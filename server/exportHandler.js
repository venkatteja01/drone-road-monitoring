// server/exportHandler.js
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { format } = require('date-fns');

const exportToXLSX = (data) => {
  const exportDir = path.join(__dirname, 'dataExport');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const date = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
  const filePath = path.join(exportDir, `SensorData_${date}.xlsx`);

  const worksheet = XLSX.utils.json_to_sheet([{
    timestamp: format(new Date(data.timestamp), 'yyyy-MM-dd HH:mm:ss'),
    temperature: data.temperature,
    humidity: data.humidity,
    cracks: data.cracks,
    lat: data.gps.lat,
    lng: data.gps.lng,
  }]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'SensorData');
  XLSX.writeFile(workbook, filePath);

  return filePath;
};

module.exports = { exportToXLSX };
