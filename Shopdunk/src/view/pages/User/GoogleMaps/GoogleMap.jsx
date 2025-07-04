import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 👇 Fix lỗi icon mặc định không hiện
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const center = [10.7718442,106.7010483];

export default function OpenStreetMapExample() {
  return (
    <MapContainer
    center={center}
    zoom={18}
    scrollWheelZoom={true}
    style={{ height: '400px', width: '100%' }}
    className="z-0 rounded-xl shadow-md"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={center}>
      <Popup>
        🎓 HL Store <br />
        65 Huỳnh Thúc Kháng, Quận 1, TP.HCM
      </Popup>
    </Marker>
  </MapContainer>

  );
}
