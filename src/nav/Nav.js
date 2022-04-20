import React from "react";
import "./Nav.css";
import Sidenav from "./Sidenav";
import logo from "../assets/Reddit-Logo.png";
import hamburger from "../assets/hamburgerIcon.png"

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navId: "sidenav-close",
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
            <div>
                <div id="nav-cont">
                    <div id="nav-logo-button" className="nav-section">
                        <div>
                            <img src={hamburger} id="sidenav-button" onClick={this.props.navState} alt="hamburger" />
                        </div>

                        <div>
                            <img id="nav-logo" src={logo} alt="mp-logo" />
                        </div>
                    </div>
                    <div className="nav-section">
                        <input placeholder="Search" type="text"></input>
                    </div>
                    <div className="nav-section">
                        <a></a>
                        <a></a>
                        <a>Profile</a>
                    </div>
                </div>
            </div>
        );
    }
}