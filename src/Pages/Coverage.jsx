import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useLoaderData } from 'react-router';


// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Coverage = () => {
  const coverageData = useLoaderData();
  const [search, setSearch] = useState('');
  const mapRef = useRef(null);

  const filteredData = coverageData.filter((location) =>
    location.city.toLowerCase().includes(search.toLowerCase()) ||
    location.district.toLowerCase().includes(search.toLowerCase()) ||
    location.covered_area.some(area => area.toLowerCase().includes(search.toLowerCase()))
  );

  // Move map to the first search result
  useEffect(() => {
    if (filteredData.length > 0 && mapRef.current) {
      const { latitude, longitude } = filteredData[0];
      mapRef.current.flyTo([latitude, longitude], 10); // Zoom level 10
    }
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Nationwide Coverage</h2>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by city, district or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={8}
        scrollWheelZoom={true}
        className="h-[500px] my-9 w-full rounded-xl shadow-lg"
        whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {filteredData.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              <div className="text-sm">
                <strong>{location.city}</strong><br />
                <span>District: {location.district}</span><br />
                <span>Region: {location.region}</span><br />
                <span>Areas: {location.covered_area.join(', ')}</span><br />
                <img
                  src={location.flowchart}
                  alt="Flowchart"
                  className="mt-2 w-32 h-auto"
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Coverage;
