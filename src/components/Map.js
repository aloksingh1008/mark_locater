import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import red_marker from "./red_marker.png";

const Map = ({ accessToken, ports_location }) => {
  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 9,
    });

    // Create an array to store marker instances
    const markers = [];

    // Add markers and popups for each location
    ports_location.forEach((loc) => {
      const markerElement = document.createElement("div");
      markerElement.className = "marker";
      markerElement.innerHTML = `<img src="${red_marker}" alt="Custom Logo" style="width: 30px; height: 30px;">`;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${loc.port_name}</h3>`
      );

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([
          loc.geo_location_longitude,
          loc.geo_location_latitude
        ])
        .setPopup(popup)
        .addTo(map);

      // Add marker to markers array
      markers.push(marker);
    });

    // Function to toggle popup visibility based on zoom level
    const togglePopupVisibility = () => {
      const zoomThreshold = 10; // Adjust this threshold as needed
      const currentZoom = map.getZoom();

      markers.forEach((marker) => {
        const popup = marker.getPopup();
        if (currentZoom >= zoomThreshold) {
          popup.addTo(map);
        } else {
          popup.remove();
        }
      });
    };

    // Show/hide popup on zoom
    map.on("zoom", togglePopupVisibility);

    // Cleanup function
    return () => {
      map.off("zoom", togglePopupVisibility);
      map.remove();
    };
  }, [accessToken, ports_location]);

  return (
    <div
      id="map-container"
      style={{
        width: "100%",
        height: "90%",
        position: "absolute",
        top: "10%",
        left: 0,
      }}
    />
  );
};

export default Map;
