import React, { Component } from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { Card, Icon } from "semantic-ui-react";

//onCloseClick should go to corresponding page link
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: new Array(props.markNumber).fill(false) };
  }
  onToggleOpen(index) {
    let tmp = this.state.isOpen;
    tmp[index] = !tmp[index];
    this.setState({ isOpen: tmp });
  }
  render() {
    const { zoom, restaurantInfo } = this.props;
    return (
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={{
          lat: restaurantInfo[0].lat,
          lng: restaurantInfo[0].lng
        }}
      >
        {restaurantInfo.map((restaurant, index) => {
          return (
            <Marker
              key={index}
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
              onClick={() => this.onToggleOpen(index)}
            >
              {this.state.isOpen[index] && (
                <InfoWindow onCloseClick={() => this.onToggleOpen(index)}>
                  <Card onClick={() => this.props.gotoMenu(restaurant.menu)}>
                    <Card.Content header={restaurant.address} />
                    <Card.Content description={`buy ${restaurant.menu}`} />
                    <Card.Content extra>
                      <Icon name="favorite" />
                      4 Reviews
                    </Card.Content>
                  </Card>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    );
  }
}

const MapwithMarkInfoWindow = compose(withScriptjs, withGoogleMap)(Map);

export default MapwithMarkInfoWindow;
