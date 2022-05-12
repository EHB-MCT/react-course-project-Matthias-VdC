import React from "react";
import axios from "axios";
import "./Body.css";
import Card from "./Card.js";
// API endpoint for main page = https://www.reddit.com/.json


export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            dataIsLoaded: false,
        }
    }

    filters() {
        return (
            <div className="filter-container">
                <div className="filter-subcontainer">
                    <p>Popular posts</p>
                    <p>Hot</p>
                    <p>Top</p>
                    <p>All</p>
                    <p>Trending</p>
                    <p>Today</p>
                </div>
            </div>
        );
    }

    createCard() {
        let arr = [];
        for (let i = 0; i < Object.keys(this.state.data).length; i++) {
            arr.push(this.state.data[i].data);
        }

        let count = 0;

        return (
            arr.map(e => {
                console.log(e);
                count++;
                e.media ? console.log("yes") : console.log("no");
                let ups = e.ups;
                let comm_num = e.num_comments;
                if (comm_num > 1000) {
                    comm_num = comm_num / 1000;
                    comm_num = comm_num.toFixed(1);
                }
                if (ups > 1000) {
                    ups = ups / 1000;
                    ups = ups.toFixed(1);
                }

                console.log(e.post_hint);

                return (
                    <div key={count} id="body-content-container">
                        <Card ups={ups} num_comments={comm_num} data={e} subreddit={e.subreddit} user={e.author} contentText={e.selftext_html} contentTitle={e.title} media={e.media} />
                    </div>
                );
            })
        );
    }

    componentDidMount() {
        if (!this.state.dataIsLoaded) {
            fetch(`https://www.reddit.com/.json`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        this.setState({ data: data.data.children });
                        this.setState({ dataIsLoaded: true });
                    }
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div id="body-container" className={this.props.navState} >
                <this.filters></this.filters>
                {this.state.dataIsLoaded ? this.createCard() : <div id="loading-body">
                    <div id="loading-circle-1"></div>
                    <div id="loading-circle-2"></div>
                    <p>loading</p>
                </div>}
            </div>
        );
    }
}