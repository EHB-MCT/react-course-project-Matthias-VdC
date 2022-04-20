import React from "react";
import "./Sidenav.css";
import home from "../assets/Home-icon.png";
import popular from "../assets/popular-posts.png";
import all from "../assets/all-posts.png";
import live from "../assets/reddit-live.png";

export default class Sidenav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id="sidenav-cont" className={this.props.navState}>
                <div className="sidenav-section">
                    <img className="sidenav-img" src={home} alt="Home" />
                    <p className="sidenav-text">Home</p>
                </div>
                <div className="sidenav-section">
                    <img className="sidenav-img" src={popular} alt="opular" />
                    <p className="sidenav-text">Popular Posts</p>
                </div>
                <div className="sidenav-section">
                    <img className="sidenav-img" src={all} alt="opular" />
                    <p className="sidenav-text">All Posts</p>
                </div>
                <div className="sidenav-section">
                    <img className="sidenav-img" src={live} alt="opular" />
                    <p className="sidenav-text">Reddit Live</p>
                </div>
            </div>
        );
    }
}