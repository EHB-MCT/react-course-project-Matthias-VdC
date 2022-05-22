import React from "react";
import "./Nav.css";
import logo from "../assets/Reddit-Logo.png";
import hamburger from "../assets/hamburgerIcon.png";
import { Link } from "react-router-dom";

const lightModeCss = `
    .nav-cont{
        background-color: black !important;
    }
`;

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navId: "sidenav-close",
            profileClick: false,
            mode: "darkMode",
            isDarkMode: false,
            searchValue: "",
            searchCount1: 0,
            searchCount2: 1,
        }
        this.handleSidenavClick = this.handleSidenavClick.bind(this);
        this.checkDarkMode = this.checkDarkMode.bind(this);
    }

    handleSidenavClick() {
        if (this.state.navId === "sidenav-close") {
            this.setState({ navId: "sidenav-open" });
        } else {
            this.setState({ navId: "sidenav-close" });
        }
    }

    checkDarkMode() {
        if (this.state.mode === "darkMode") {
            return (
                <style>{lightModeCss}</style>
            );
        } else if (this.state.mode === "lightMode") {
            return null;
        }
    }

    updateSearchValue(e) {
        let value = e.target.value;
        this.setState({ searchValue: value })
    }

    render() {
        return (
            <div id="nav-cont">
                {() => {
                    if (this.state.mode === "darkMode") {
                        return (
                            <style>{lightModeCss}</style>
                        );
                    } else if (this.state.mode === "lightMode") {
                        return null;
                    }
                }}
                <div id="nav-logo-button" className="nav-section">
                    <div>
                        <img src={hamburger} id="sidenav-button" onClick={this.props.navState} alt="hamburger" />
                    </div>

                    <Link to={"/"}>
                        <div>
                            <img id="nav-logo" src={logo} alt="mp-logo" />
                        </div>
                    </Link>
                </div>
                <form className="nav-section" id="search-bar-container">
                    <input value={this.state.searchValue} onChange={(async (e) => await this.updateSearchValue(e))} id="search-bar" placeholder="Search Reddit" type="text"></input>
                    {this.state.searchValue !== "" ? <Link onClick={() => window.setTimeout(window.location.reload.bind(window.location), 10)} to={"/search?q=" + this.state.searchValue} ><svg version="1.1" fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-120 -120 750 750"><g><g><path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z" /></g></g></svg></Link> : <Link to={"/"}><svg version="1.1" fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-120 -120 750 750"><g><g><path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z" /></g></g></svg></Link>}
                    {this.state.searchValue !== "" ? <Link onClick={() => window.setTimeout(window.location.reload.bind(window.location), 10)} to={"/search?q=" + this.state.searchValue} ><input type="submit"></input></Link> : <Link to={"/"}><input type="submit"></input></Link>}
                </form>
                <div onClick={() => { if (!this.state.profileClick) { this.setState({ profileClick: true }) } else { this.setState({ profileClick: false }) } }} id="nav-profile" className="nav-section">
                    {this.state.profileClick ? <svg version="1.1" style={{ "transform": "rotate(180deg)", "transition": ".3s all ease" }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16px" height="22px" viewBox="0 0 451.847 450"><g><path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z" /></g></svg> : <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ "transition": ".3s all ease" }} x="0px" y="0px" width="16px" height="22px" viewBox="0 0 451.847 450"><g><path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z" /></g></svg>}
                    <svg id="profile-icon" width="27px" height="22px" preserveAspectRatio="none" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><ellipse cx="256" cy="130" rx="110" ry="130" /><path d="M36,478.191C36,390.825,134.497,320,256,320s220,70.825,220,158.191v0C476,496.863,460.863,512,442.192,512H69.808   C51.137,512,36,496.863,36,478.191L36,478.191z" /></g></svg>
                </div>
                {this.state.profileClick ? <ProfileClick onClick={this.checkDarkMode} mode={this.state.mode} /> : null}
            </div>
        );
    }
}

function ProfileClick(props) {
    return (
        <div id="profile-click">
            <div id="profile-click-global-container">
                <div className="pointer profile-click-container">
                    <p className="profile-click-content-text">My Profile</p>
                </div>
                <div className="flex pointer profile-click-container space-between">
                    <p className="profile-click-content-text">Online Status</p>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="flex pointer profile-click-container space-between">
                    <p className="profile-click-content-text">Dark Mode</p>
                    <label className="switch">
                        <input onClick={props.onClick} className={props.mode} id="toggleTheme" type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}