import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import excelFile from './port_geo_location.xlsx'; // Path to your Excel file

const ExcelDataFetcher = () => {
    const [excelData, setExcelData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(excelFile);
                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                setExcelData(jsonData);
            } catch (error) {
                console.error('Error fetching Excel data:', error);
            }
        };

        fetchData();
    }, []);

    return excelData;
};

export default ExcelDataFetcher;
