import React, { Component } from "react";
import { MapContainer, GeoJSON, Marker, Popup} from "react-leaflet";
import mapData from "../data/countries.json";
import "leaflet/dist/leaflet.css";
import "../components/MyMap.css";



class MyMap extends Component {
  state = {color: "#ffff00"};

  color = ["blue", "yellow", "orange", "grey", "purple"];

  componentDidMount() {
    console.log(mapData);
  }

  countryStyle = {
    fillColor: "red",
    fillOpacity: 0.5,
    color: "black",
    weight: 1,
  };
  onCountryClick = (event) => {
    event.target.setStyle({
      fillColor: this.state.color,
      fillOpacity: 1
    });
  };

  onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    console.log(countryName);
    layer.bindPopup(countryName);
    layer.options.fillOpacity= Math.random()

    // const colorIndex = Math.floor(Math.random() * this.color.length);
    // layer.options.fillColor = this.color[colorIndex];

    layer.on({
      click: this.onCountryClick,
    });
  };

  colorChange = (event) => {
    this.setState({color:event.target.value})
  }
 
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>MAP</h1>
        <MapContainer style={{ height: "80vh"}} zoom={2} center={[20, 100]}>
          <GeoJSON
            style={this.countryStyle}
            data={mapData.features}
            onEachFeature={this.onEachCountry}
          />
        </MapContainer>
        

        <input type="color" value={this.state.color} onChange={this.colorChange}></input>
      </div>
    );
  }
}

export default MyMap;
