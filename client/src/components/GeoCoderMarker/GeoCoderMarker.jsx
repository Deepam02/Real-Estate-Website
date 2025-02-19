import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]);

  useEffect(() => {
    if (!map) return;

    ELG.geocode()
      .text(address)
      .run((error, response) => {
        if (!error && response?.results?.length > 0) {
          const { lat, lng } = response.results[0].latlng;
          setPosition([lat, lng]);

          map.flyTo([lat, lng], 12);
        }
      });
  }, [address, map]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>Location: {address}</Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
