import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

const LocationPicker = ({ onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const map = useMapEvents({
    click: (e) => {
      setMarkerPosition(e.latlng);
      onLocationChange(e.latlng);
    },
  });

  return (
    markerPosition && (
      <Marker position={markerPosition}>
        <Popup>
          Latitude: {markerPosition.lat.toFixed(6)}, Longitude: {markerPosition.lng.toFixed(6)}
        </Popup>
      </Marker>
    )
  );
};

export default LocationPicker;