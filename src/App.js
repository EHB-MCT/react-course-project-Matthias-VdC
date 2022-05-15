import './App.css';
import Nav from "./nav/Nav.js"
import Body from "./body/Body.js"
import React from 'react';
import Sidenav from './nav/Sidenav';
import { Routes, Route } from 'react-router-dom';
import Search from "./search/Search.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navState: "sidenav-close",
      bodyState: "body-close",
    }
    this.sidenavChange = this.sidenavChange.bind(this);
  }

  sidenavChange() {
    if (this.state.navState === "sidenav-close") {
      this.setState({ navState: "sidenav-open" });
      this.setState({ bodyState: "body-open" });
    } else {
      this.setState({ navState: "sidenav-close" });
      this.setState({ bodyState: "body-close" });
    }
  }

  render() {
    return (
      <div>
        <Sidenav navState={this.state.navState}></Sidenav>
        <Nav navState={this.sidenavChange}></Nav>
        <Routes>
          <Route path="/" element={
            <div id='app-container'>
              <Body navState={this.state.bodyState}></Body>
            </div>}></Route>
          <Route path="/search" element={
            <div id='app-container'>
              <Search params={this.state.bodyState}></Search>
            </div>
          }>
          </Route>
        </Routes>
      </div>
    );
  }
}