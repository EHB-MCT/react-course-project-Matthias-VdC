import React from "react";


export default class SearchCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideNSFW: true,
            subredditImg: "",
        }
    }

    decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    openCardBody(e) {
        e.preventDefault();
        e.target.parentNode.parentNode.parentNode.style.maxHeight = "none";
        e.target.parentNode.parentNode.style.overflow = "visible";
        e.target.parentNode.style.display = "none";
    }

    checkText() {
        if (this.props.contentText) {
            let elements = document.getElementsByClassName("card-body-text");
            for (let element of elements) {
                if (element.scrollHeight > 600) {
                    return (
                        <div onClick={((e) => this.openCardBody(e))} className="open-content">
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
        e.target.parentNode.style.display = "none";
    }

    isLink() {
        if (this.props.data.post_hint === "link") {
            return (
                <div className="card-body-link-container">
                    <a className="card-body-link-a" href={this.props.data.url} target="_blank" rel="noreferrer">
                        <img className="card-body-link-image" src={this.props.data.thumbnail} alt=""></img>
                    </a>
                    <h3 className="card-title" style={{ "marginLeft": "1em" }}>{this.props.contentTitle}</h3>
                </div>
            );
        }
    }

    componentDidMount() {
        fetch(`https://www.reddit.com/r/${this.props.data.subreddit}/about.json`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    this.setState({
                        subredditImg: `${data.data.icon_img}`
                    });
                }
            });
    }

    render() {
        return (
            <div className="card-container">
                <div className="card-header">
                    <div className="card-subreddit">
                        {this.state.subredditImg !== "" && this.state.subredditImg !== null ? <img className="card-subreddit-icon" src={this.state.subredditImg} alt="" /> : <img className="card-subreddit-icon" src={require("../assets/reddit-icon.png")} alt="" />}
                        <p>r/{this.props.subreddit}</p>
                    </div>
                    <div className="card-userprofile-text"><p>posted by:&nbsp;</p><a href="/">u/{this.props.user}</a></div>
                </div>

                <div className="card-body">

                    {this.isLink()}

                    {this.props.data.over_18 ? this.over18() : null}
                    {this.props.data.post_hint !== "link" ? <h3 className="card-title">{this.props.contentTitle}</h3> : null}
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
                    <div className="up-downvote-container">
                        <svg className="up-vote" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" /></svg>
                        {typeof (this.props.ups) === "number" ? <p>{this.props.ups}</p> : <p>{this.props.ups}k</p>}
                        <svg className="down-vote" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" /></svg>
                    </div>
                    <div className="flex">
                        <div className="comment-icon">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" id="magicoon-Regular" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1 fill:#41416e;</style></defs><title>comment</title><g id="comment-Regular"><path id="comment-Regular-2" data-name="comment-Regular" className="cls-1" d="M17,3.25H7A4.756,4.756,0,0,0,2.25,8V21a.75.75,0,0,0,1.28.53l2.414-2.414a1.246,1.246,0,0,1,.885-.366H17A4.756,4.756,0,0,0,21.75,14V8A4.756,4.756,0,0,0,17,3.25ZM20.25,14A3.254,3.254,0,0,1,17,17.25H6.829a2.73,2.73,0,0,0-1.945.806L3.75,19.189V8A3.254,3.254,0,0,1,7,4.75H17A3.254,3.254,0,0,1,20.25,8Z" /></g></svg>
                            {typeof (this.props.num_comments) === "number" ? <p>{this.props.num_comments}</p> : <p>{this.props.num_comments}k</p>}
                        </div>
                        <div className="share-icon">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 458.624 458.624"><g><g><path d="M339.588,314.529c-14.215,0-27.456,4.133-38.621,11.239l-112.682-78.67c1.809-6.315,2.798-12.976,2.798-19.871c0-6.896-0.989-13.557-2.798-19.871l109.64-76.547c11.764,8.356,26.133,13.286,41.662,13.286c39.79,0,72.047-32.257,72.047-72.047C411.634,32.258,379.378,0,339.588,0c-39.79,0-72.047,32.257-72.047,72.047c0,5.255,0.578,10.373,1.646,15.308l-112.424,78.491c-10.974-6.759-23.892-10.666-37.727-10.666c-39.79,0-72.047,32.257-72.047,72.047s32.256,72.047,72.047,72.047c13.834,0,26.753-3.907,37.727-10.666l113.292,79.097c-1.629,6.017-2.514,12.34-2.514,18.872c0,39.79,32.257,72.047,72.047,72.047c39.79,0,72.047-32.257,72.047-72.047C411.635,346.787,379.378,314.529,339.588,314.529z" /></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                            <p>Share</p>
                        </div>
                        <div className="save-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 330 330"><path d="M265,0H65c-8.284,0-15,6.716-15,15v300c0,5.766,3.305,11.022,8.502,13.52c5.197,2.498,11.365,1.796,15.868-1.807L165,254.21l90.63,72.503c2.712,2.17,6.027,3.287,9.372,3.287c2.208,0,4.43-0.487,6.496-1.48c5.197-2.497,8.502-7.753,8.502-13.52V15C280,6.716,273.284,0,265,0z M250,283.79l-75.63-60.503c-2.739-2.191-6.055-3.287-9.37-3.287s-6.631,1.096-9.37,3.287L80,283.79V30h170V283.79z" /><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                            <p>Save</p>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}