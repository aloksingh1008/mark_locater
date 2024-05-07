import React from 'react';
import Map from './components/Map.js'
import ExcelDataFetcher from './components/ExcelDataFetcher';
import 'mapbox-gl/dist/mapbox-gl.css';

// import mapboxgl from 'mapbox-gl';

const MyComponent = () => {
    const excelData = ExcelDataFetcher();
    // console.log(excelData)


    const accessToken = 'pk.eyJ1IjoiZXNwYWNlc2VydmljZSIsImEiOiJjbHZ1dHZjdTQwMDhrMm1uMnoxdWRibzQ4In0.NaprcMBbdX07f4eXXdr-lw';

    return (
        <div>
            <h1>Mapbox GL JS React App</h1>
            <Map accessToken={accessToken} ports_location={excelData}/>
        </div>
    );
};

export default MyComponent;
