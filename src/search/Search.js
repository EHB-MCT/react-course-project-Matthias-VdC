import React from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../body/Card";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            dataIsLoaded: false,
            search: "",
            reload: false,
        }
        console.log()
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
        this.changeLocation();
    }

    async changeLocation() {
        // https://www.sitepoint.com/get-url-parameters-with-javascript/
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        console.log(urlParams.get('q'));
        await this.setState({ search: urlParams.get('q') });
        await fetch(`https://www.reddit.com/search.json?q=${this.state.search}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    this.setState({ data: data.data.children });
                    this.setState({ dataIsLoaded: true });
                    console.log(data.data.children);
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div id="body-container" className={this.props.params} >
                {/* {this.state.dataIsLoaded ? <this.filters></this.filters> : null} */}
                {this.state.dataIsLoaded ? this.createCard() : <div id="loading-body">
                    <div id="loading-circle-1"></div>
                    <div id="loading-circle-2"></div>
                    <p>loading</p>
                </div>}
            </div>
        );
    }
}