import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Easily configurable marker data
const markers = [
  { position: [51.505, -0.09], name: 'London', description: 'Capital of England' },
  { position: [48.8566, 2.3522], name: 'Paris', description: 'Capital of France' },
  { position: [40.4168, -3.7038], name: 'Madrid', description: 'Capital of Spain' },
];

export default function OrdersMap() {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // This ensures the map is only rendered after the component has mounted
    setMapReady(true);
  }, []);

  if (!mapReady) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={[51.505, -0.09]} zoom={4} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position as L.LatLngExpression}>
          <Popup>
            <h3 className='font-bold'>{marker.name}</h3>
            <p>{marker.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
