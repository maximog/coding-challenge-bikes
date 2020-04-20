import React from 'react';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
  position: 'inherit',
  width: '450px',
  height: '200px',
};

const containerStyles = {
  position: 'relative',
  width: '60%',
  height: '50%',
  margin: '4px',
};

const MapContainer = props => {

  return (
        <Map
          google={props.google}
          zoom={15}
          style={mapStyles}
          containerStyle={containerStyles}
          initialCenter={{ lat: props.info[1], lng: props.info[0]}}
          center={{lat: props.info[1], lng: props.info[0]}}
        >
          <Marker position={{ lat: props.info[1], lng: props.info[0] }} />
        </Map>
        
  )
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);