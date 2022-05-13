import React from "react";
import "./Nav.css";
import logo from "../assets/Reddit-Logo.png";
import hamburger from "../assets/hamburgerIcon.png"

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navId: "sidenav-close",
            profileClick: false,
        }
        this.handleSidenavClick = this.handleSidenavClick.bind(this);
    }

    handleSidenavClick() {
        if (this.state.navId === "sidenav-close") {
            this.setState({ navId: "sidenav-open" });
        } else {
            this.setState({ navId: "sidenav-close" });
        }
    }

    render() {
        return (
            <div id="nav-cont">
                <div id="nav-logo-button" className="nav-section">
                    <div>
                        <img src={hamburger} id="sidenav-button" onClick={this.props.navState} alt="hamburger" />
                    </div>

                    <div>
                        <img id="nav-logo" src={logo} alt="mp-logo" />
                    </div>
                </div>
                <div className="nav-section" id="search-bar-container">
                    <input id="search-bar" placeholder="Search Reddit" type="text"></input>
                </div>
                <div onClick={() => { if (!this.state.profileClick) { this.setState({ profileClick: true }) } else { this.setState({ profileClick: false }) } }} id="nav-profile" className="nav-section">
                    <svg id="profile-icon" width="27px" height="22px" preserveAspectRatio="none" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><ellipse cx="256" cy="130" rx="110" ry="130" /><path d="M36,478.191C36,390.825,134.497,320,256,320s220,70.825,220,158.191v0C476,496.863,460.863,512,442.192,512H69.808   C51.137,512,36,496.863,36,478.191L36,478.191z" /></g></svg>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16px" height="22px" viewBox="0 0 451.847 320"><g><path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z" /></g></svg>
                </div>
                {this.state.profileClick ? <ProfileClick></ProfileClick> : null}
            </div>
        );
    }
}

function ProfileClick() {
    return (
        <div id="profile-click">
            <p>Log In</p>
            <div className="flex">
                <p>Dark Mode</p>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
}