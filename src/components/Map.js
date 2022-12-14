import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";

// define constants
const NATURAL_EVENT_WILDFIRE = "wildfires";

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  const marker = eventData.map((data) => console.log(data.categories[0].id));

  const markers = eventData.map((ev, index) => {
    if (ev.categories[0].id === NATURAL_EVENT_WILDFIRE) {
      return (
        <LocationMarker
          key={index}
          lat={ev.geometry[0].coordinates[1]}
          lng={ev.geometry[0].coordinates[0]}
          //   onMouseOut={() => setLocationInfo(null)}
          onClick={() =>
            setLocationInfo({
              id: ev.id,
              title: ev.title,
              date: ev.geometry[0].date,
            })
          }
        />
      );
    }
    return null;
  });

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBj4WJPBgp-ZDRPkCLNi5Afh61n6fVMQpQ" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 42.3265,
    lng: -122.8756,
  },
  zoom: 6,
};

export default Map;
