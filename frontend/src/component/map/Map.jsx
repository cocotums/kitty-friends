import React from "react";
import GoogleMapReact from "google-map-react";
console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
const Map = () => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={{
          location: {
            address: "1600 Amphitheatre Parkway, Mountain View, california.",
            lat: 37.42216,
            lng: -122.08427,
          },
        }}
        defaultZoom={1}
      >
        {/* <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        /> */}
      </GoogleMapReact>
    </div>
  </div>
);

export default Map;
