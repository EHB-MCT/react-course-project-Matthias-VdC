import React from "react";

import "./Card.css";

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideNSFW: true,
        }
    }



    decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    checkText() {
        if (this.props.contentText) {
            // if (this.props.contentText.scrollHeight)
            let elements = document.getElementsByClassName("card-body-text");
            for (let element of elements) {
                if (element.scrollHeight > 600) {
                    return (
                        <div className="open-content">
                            <svg className="open-content-svg" width="32px" height="32px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.99951 16C1.99951 8.26801 8.26753 2 15.9995 2C23.7315 2 29.9995 8.26801 29.9995 16C29.9995 23.732 23.7315 30 15.9995 30C8.26753 30 1.99951 23.732 1.99951 16ZM11.7066 15.2929C11.3161 14.9024 10.6829 14.9024 10.2924 15.2929C9.90188 15.6834 9.90188 16.3166 10.2924 16.7071L15.2924 21.7071C15.6829 22.0976 16.3161 22.0976 16.7066 21.7071L21.7066 16.7071C22.0971 16.3166 22.0971 15.6834 21.7066 15.2929C21.3161 14.9024 20.6829 14.9024 20.2924 15.2929L16.9995 18.5858V11C16.9995 10.4477 16.5518 10 15.9995 10C15.4472 10 14.9995 10.4477 14.9995 11V18.5858L11.7066 15.2929Z" /></svg>
                            <span className="open-content-background"></span>
                        </div>
                    );
                } else {
                    return null;
                }
            }
        }
    }

    isImage() {
        if (this.props.data.post_hint === "image") {
            return (
                <div className="media-container"><img src={this.props.data.url} alt="reddit_image"></img></div>
            );
        }
    }

    over18() {
        return (
            <div className="over-18">
                <a onClick={((e) => this.showNSFW(e))} className="show-nsfw" href="*">SHOW NSFW</a>
            </div>
        );
    }

    showNSFW(e) {
        e.preventDefault();
        console.log(e);
        e.target.parentNode.style.display = "none";
    }

    render() {
        return (
            <div className="card-container">
                <div className="card-header">
                    <p>r/{this.props.subreddit}</p>
                    <p>posted by u/{this.props.user}</p>
                </div>
                <div className="card-body">
                    {this.props.data.over_18 ? this.over18() : null}
                    <h3>{this.props.contentTitle}</h3>
                    {this.props.media ?
                        this.props.media.reddit_video ?
                            this.props.media.reddit_video.fallback_url ?
                                <div className="media-container"><video controls>
                                    <source src={`${this.props.media.reddit_video.fallback_url}/audio`}></source>
                                </video></div> : null : null : null}
                    {this.props.contentText ? <div className="card-body-text" dangerouslySetInnerHTML={{ __html: this.decodeHtml(this.props.contentText) }} /> : null}
                    {this.checkText()}
                    {this.isImage()}
                </div>
                <div className="card-footer">
                    <svg className="up-vote" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" /></svg>
                    <p>{this.props.ups}k</p>
                    <svg className="down-vote" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" /></svg>
                </div>
            </div >
        );
    }
}