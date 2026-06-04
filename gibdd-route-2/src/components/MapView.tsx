import L from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { route2Coordinates } from "../data/route2";
import type { RoutePoint } from "../types";
import { getPointTypeLabel } from "../data/pointTypes";

type Props = {
  points: RoutePoint[];
  selectedPoint: RoutePoint | null;
  draftLocation: { lat: number; lng: number } | null;
  onMapClick: (lat: number, lng: number) => void;
  onEditPoint: (point: RoutePoint) => void;
};

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(event) {
      onMapClick(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

function FocusPoint({ point }: { point: RoutePoint | null }) {
  const map = useMap();

  if (point) {
    map.flyTo([point.lat, point.lng], 17);
  }

  return null;
}

export default function MapView({ points, selectedPoint, draftLocation, onMapClick, onEditPoint }: Props) {
  return (
    <div className="map-wrapper">
      <MapContainer center={[55.9962, 93.0177]} zoom={14} className="map">
        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={route2Coordinates} pathOptions={{ weight: 6 }} />

        {points.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lng]} icon={markerIcon}>
            <Popup>
              <div className="popup-content">
                <b>{point.title}</b>
                <span>{getPointTypeLabel(point.type)}</span>
                <span>Сложность: {point.difficulty}/5</span>
                <button onClick={() => onEditPoint(point)}>Редактировать</button>
              </div>
            </Popup>
          </Marker>
        ))}

        {draftLocation && (
          <Marker position={[draftLocation.lat, draftLocation.lng]} icon={markerIcon}>
            <Popup>
              <b>Новая точка</b>
            </Popup>
          </Marker>
        )}

        <ClickHandler onMapClick={onMapClick} />
        <FocusPoint point={selectedPoint} />
      </MapContainer>
    </div>
  );
}