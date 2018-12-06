import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MyMap from "./MyMap";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const provider = new OpenStreetMapProvider();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      adressQuery: "",
      resultOpen: false
    };
  }

  handleInput = event => {
    const request = event.target.value;
    provider.search({ query: request + ", France" }).then(results => {
      this.setState({
        result: results,
        resultOpen: true,
        adressQuery: request
      });
    });
  };

  chooseAdress = adress =>
    this.setState({ adressQuery: adress, resultOpen: false });

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            onChange={event => this.handleInput(event)}
            placeholder="search"
            value={this.state.adressQuery}
          />
        </form>
        {this.state.resultOpen && (
          <div className="result">
            {this.state.result.map((adress, index) => (
              <p key={index} onClick={() => this.chooseAdress(adress.label)}>
                {adress.label}
              </p>
            ))}
          </div>
        )}
        <MyMap />
      </div>
    );
  }
}

export default App;
