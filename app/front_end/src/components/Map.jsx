import React from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";

  const MapWrapper = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
        defaultCenter={{ lat: 43.651070, lng: -79.347015 }}
        defaultZoom={12}
        defaultOptions={{
            scrollwheel: false,
            styles: [
            {
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{ color: "#444444" }]
            },
            {
                featureType: "landscape",
                elementType: "all",
                stylers: [{ color: "#f2f2f2" }]
            },
            {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "road",
                elementType: "all",
                stylers: [{ saturation: -100 }, { lightness: 45 }]
            },
            {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{ visibility: "simplified" }]
            },
            {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "water",
                elementType: "all",
                stylers: [{ color: "#5e72e4" }, { visibility: "on" }]
            }
            ]
        }}
        >
                        {props.events.map((event, index) => (
                        <Marker position={{ lat: event.details.location[1], lng: event.details.location[0]}} />
                    ))}

        </GoogleMap>
    ))
    );

class Map extends React.Component {

    state = {
        loading: true,
        google_maps_key: ""
      };

    componentWillMount() {
        fetch(process.env.REACT_APP_BACKEND_URL + 'api/token/maps', { 
          headers: new Headers({
            'X-Access-Tokens': localStorage.getItem('token')
          }) })
        .then(res => res.json())
        .then((data) => {
          this.setState({ google_maps_key: data["token"] })
          this.setState({ loading: false })
        })
        .catch(console.log)

  
          
    }

  render() {
        if (this.state.loading || this.props.events_loading) {
            return 'Loading...'
        } else {
        return (
            <MapWrapper
            id="mapwrapperid"
            events={this.props.events}
            googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + this.state.google_maps_key}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{ height: `470px` }}
                className="map-canvas"
                id="map-canvas"
              />
            }
            mapElement={
              <div style={{ height: `100%`, borderRadius: "inherit" }} />
            }
          />);
        }
  }
}

export default Map;
