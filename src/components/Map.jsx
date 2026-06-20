import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { divIcon } from 'leaflet';

const center = [29.2183, 79.512];

const markerIcon = divIcon({
  className: '',
  html: `
    <div style="
      width: 22px;
      height: 22px;
      border-radius: 999px;
      background: #DE7C2D;
      border: 4px solid rgba(255,255,255,0.9);
      box-shadow: 0 10px 25px rgba(222,124,45,0.35);
    "></div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export default function Map() {
  return (
    <div className="glass-card h-[360px] overflow-hidden p-3">
      <MapContainer center={center} scrollWheelZoom={false} zoom={11}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={markerIcon} position={center}>
          <Popup>HimShakti production and dispatch hub in Haldwani, Uttarakhand.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
