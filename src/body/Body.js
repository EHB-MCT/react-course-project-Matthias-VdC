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
            page: "popular",
        }

        this.fetchNew = this.fetchNew.bind(this);
        this.filters = this.filters.bind(this);
        this.fetchTrending = this.fetchTrending.bind(this);
        this.fetchControversial = this.fetchControversial.bind(this);
        this.fetchPopular = this.fetchPopular.bind(this);
    }

    filters() {
        return (
            <div className="filter-container">
                <div className="filter-subcontainer">
                    {this.state.page === "popular" ? <p className="selected" onClick={this.fetchPopular}>Popular posts</p> : <p className="profile-pointer" onClick={this.fetchPopular}>Popular posts</p>}
                    {this.state.page === "controversial" ? <p className="selected" onClick={this.fetchControversial}>Controversial</p> : <p className="profile-pointer" onClick={this.fetchControversial}>Controversial</p>}
                    {this.state.page === "trending" ? <p className="selected" onClick={this.fetchTrending}>Trending</p> : <p className="profile-pointer" onClick={this.fetchTrending}>Trending</p>}
                    {this.state.page === "new" ? <p className="selected" onClick={this.fetchNew}>New</p> : <p className="profile-pointer" onClick={this.fetchNew}>New</p>}
                </div>
            </div >
        );
    }

    async fetchPopular() {
        if (this.state.page !== "popular") {
            this.setState({ data: "" });
            this.setState({ dataIsLoaded: true });
            await fetch(`https://www.reddit.com/.json`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        this.setState({ data: data.data.children });
                        this.setState({ dataIsLoaded: true });
                        this.setState({ page: "popular" });
                    }
                })
                .catch(err => console.log(err));
        }
    }

    async fetchControversial() {
        if (this.state.page !== "controversial") {
            this.setState({ data: "" });
            this.setState({ dataIsLoaded: true });
            await fetch(`https://www.reddit.com/controversial.json`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        this.setState({ data: data.data.children });
                        this.setState({ dataIsLoaded: true });
                        this.setState({ page: "controversial" });
                    }
                })
                .catch(err => console.log(err));
        }
    }

    async fetchTrending() {
        if (this.state.page !== "trending") {
            this.setState({ data: "" });
            this.setState({ dataIsLoaded: true });
            await fetch(`https://www.reddit.com/rising.json`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        this.setState({ data: data.data.children });
                        this.setState({ dataIsLoaded: true });
                        this.setState({ page: "trending" });
                    }
                })
                .catch(err => console.log(err));
        }
    }

    async fetchNew() {
        if (this.state.page !== "new") {
            this.setState({ data: "" });
            this.setState({ dataIsLoaded: true });
            await fetch(`https://www.reddit.com/new.json`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        this.setState({ data: data.data.children });
                        this.setState({ dataIsLoaded: true });
                        this.setState({ page: "new" });
                    }
                })
                .catch(err => console.log(err));
        }
    }

    createCard() {
        let arr = [];
        for (let i = 0; i < Object.keys(this.state.data).length; i++) {
            arr.push(this.state.data[i].data);
        }

        let count = 0;

        return (
            arr.map(e => {
                count++;
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
                {this.state.dataIsLoaded ? <this.filters></this.filters> : null}
                {this.state.dataIsLoaded ? this.createCard() : <div id="loading-body">
                    <div id="loading-circle-1"></div>
                    <div id="loading-circle-2"></div>
                    <p>loading</p>
                </div>}
            </div>
        );
    }
}