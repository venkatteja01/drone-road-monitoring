import * as XLSX from 'xlsx';
import { format } from 'date-fns';

export function exportToXLSX(data) {
  const sheetData = [[
    'Timestamp', 'Temperature (°C)', 'Humidity (%)', 'Cracks Detected', 'Latitude', 'Longitude'
  ], [
    format(data.timestamp, 'yyyy-MM-dd HH:mm:ss'),
    data.temperature,
    data.humidity,
    data.cracks ? 'Yes' : 'No',
    data.gps.lat,
    data.gps.lng
  ]];

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'SensorData');

  const fileName = `SensorData_${format(data.timestamp, 'yyyyMMdd_HHmmss')}.xlsx`;
  XLSX.writeFile(workbook, `dataExport/${fileName}`);
}
