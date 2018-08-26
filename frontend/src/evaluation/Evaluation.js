import React, {Component} from 'react';
import "./Evaluation.css";
import ReactPlayer from 'react-player';
import FormEval from "./FormEval";


// App component - represents the whole app

export default class Evaluation extends Component {


    constructor(props) {
        super(props);
        this.state = {
            resource: {
                title: "REACTing",
                subtitleURL: "nuay",
                url: "https://www.youtube.com/watch?v=2zn4dAuZ2RU",
                lesson: "rumbear"
            }
        }
    }


    render() {
        let track = null;
        if (this.state.resource.subtitleURL) {
            track = <track label="English" kind="subtitles" srclang="en" src={this.state.subtitleURL} default/>;
        }

        let videoFooter = null;
        if (this.state.resource.url) {
            videoFooter = <footer className="blockquote-footer">
                From the course: <a href={this.state.resource.url} target="_blank"><cite
                title={this.state.resource.lesson}>{this.state.resource.lesson}</cite></a>
            </footer>
        }
        return (
            <div className="container">

                <h3>Resource: <em>{this.state.resource.title}</em></h3>

                <blockquote className="blockquote text-center mt-5 mb-5">
                    {/*<video controls width="640" height="360" className="img-thumbnail">
                        <source src={this.state.resource.url} type="video/mp4"/>
                            {track}
                    </video>*/}
                    <ReactPlayer url={this.state.resource.url} playing />
                    {videoFooter}
                </blockquote>

                <FormEval/>

            </div>

    );

    }

    }