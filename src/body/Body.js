import React from "react";
import axios from "axios";
import "./Body.css";
import Card from "./Card.js";
// API endpoint for main page = https://www.reddit.com/.json

function BodyItem(props) {
    return (
        <div className>
            <p>
                {props.subreddit}
            </p>
        </div>
    );
}

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            dataIsLoaded: false,
        }
    }

    createBox() {
        let arr = [];
        for (let i = 0; i < Object.keys(this.state.data).length; i++) {
            arr.push(this.state.data[i].data);
        }

        let count = 0;

        return (
            arr.map(e => {
                console.log(e);
                count++;
                return (
                    <Card key={count} subreddit={e.subreddit} user={e.author} contentText={e.selftext} contentTitle={e.title} />
                );
            })
        );
    }

    componentDidMount() {
        fetch(`https://www.reddit.com/.json`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    this.setState({ data: data.data.children });
                    this.setState({ dataIsLoaded: true });
                }
            });
    }

    render() {
        return (
            <div id="body-container" className={this.props.navState} >
                <div id="body-content-container">
                    {this.state.dataIsLoaded ? this.createBox() : "Loading data..."}
                </div>
            </div>
        );
    }
}