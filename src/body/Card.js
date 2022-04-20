import React from "react";

import "./Card.css"

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="card-container">
                <div className="card-header">
                    <p>r/{this.props.subreddit}</p>
                    <p>posted by u/{this.props.user}</p>
                </div>
                <div className="card-body">
                    <h2>{this.props.contentTitle}</h2>
                    <p>{this.props.contentText}</p>
                </div>
                <div className="card-footer">

                </div>
            </div>
        );
    }
}