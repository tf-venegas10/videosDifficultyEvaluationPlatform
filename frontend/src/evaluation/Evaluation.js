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
                url: "./resources/testVideo.mp4",
                lesson: "rumbear",
                pauses: 0
            },
            play:false,
        }
        this.toggleVideo=this.toggleVideo.bind(this);
        this.onPauseCallback = this.onPauseCallback.bind(this);
    }

    toggleVideo(){
        this.setState((prevState)=>({
            play:! prevState.play
        }));
    }

    onPauseCallback(){
        this.setState((prevState)=>({
            resource:{
                title: prevState.resource.title,
                subtitleURL: prevState.resource.subtitleURL,
                url: prevState.resource.url,
                lesson: prevState.resource.lesson,
                pauses: prevState.resource.pauses +1
            }
        }));
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
                    <div className="row">
                        <div className="col-sm-1 col-md-2"></div>
                        <div className="col-sm-9 col-md-6">
                            <ReactPlayer url={this.state.resource.url} playing={this.state.play}
                                         onClick={this.toggleVideo} onPause={this.onPauseCallback}
                            controls={true}/>
                        </div>
                        <div className="col-sm-2 col-md-4"></div>

                    </div>
                    {videoFooter}
                </blockquote>

                <FormEval videoId={1}/>

            </div>

        );

    }

}