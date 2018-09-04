import React, {Component} from 'react';
import "./Evaluation.css";
import ReactPlayer from 'react-player';
import FormEval from "./FormEval";


// App component - represents the whole app

export default class Evaluation extends Component {


    constructor(props) {
        super(props);
        this.state = {
            resource: {},
            play: false,
            showEval: false,
        };
        this.toggleVideo = this.toggleVideo.bind(this);
        this.onPauseCallback = this.onPauseCallback.bind(this);
        this.onEndedCallBack = this.onEndedCallBack.bind(this);
        this.onSeekCallback = this.onSeekCallback.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    componentDidUpdate() {
        let count = 0;
        for ( let i in this.state.resource) {
            count++;
        }
        let BreakException = {};
        if (count === 0 && this.props.evaluations) {
            try {
                this.props.toEval.forEach((id) => {
                    let use = true;
                    console.log(id);
                    this.props.evaluations.forEach((ev) => {
                        if (id === ev.videoId) {
                            use = false;
                            console.log("EXISTS: "+id);
                        }
                    });
                    if (use) {

                        fetch("/API/learning_resources/" + id)
                            .then((res) => {
                                return res.json();
                            })
                            .then((res) => {
                                this.setState({
                                    resource: {
                                        videoId: Number(res.id),
                                        title: res.title,
                                        subtitleURL: res.transcript,
                                        url: res.path,
                                        lesson: res.path.split("/")[1],
                                        pauses: 0,
                                        seeks: 0
                                    }
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        throw BreakException;
                    }
                });
            } catch (e) {
                if (e !== BreakException) throw e;
            }
        }
    }

    toggleVideo() {
        this.setState((prevState) => ({
            play: !prevState.play
        }));
    }

    onPauseCallback() {
        this.setState((prevState) => ({
            resource: {
                videoId: prevState.resource.videoId,
                title: prevState.resource.title,
                subtitleURL: prevState.resource.subtitleURL,
                url: prevState.resource.url,
                lesson: prevState.resource.lesson,
                pauses: prevState.resource.pauses + 1,
                seeks: prevState.resource.seeks
            }
        }));
    }

    onEndedCallBack() {
        this.setState({showEval: true})
    }

    onSeekCallback(seconds){
        this.setState((prevState) => ({
            resource: {
                videoId: prevState.resource.videoId,
                title: prevState.resource.title,
                subtitleURL: prevState.resource.subtitleURL,
                url: prevState.resource.url,
                lesson: prevState.resource.lesson,
                pauses: prevState.resource.pauses,
                seeks: prevState.resource.seeks+ 1
            }
        }));
    }

    onSend(evaluation) {
        let ev = evaluation;
        ev.videoId = this.state.resource.videoId;
        ev.numberOfPauses = this.state.resource.pauses;
        console.log(ev);

        fetch('/API/evaluation/' + this.props.userId, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ev),
        }).then((res) => {
            this.props.updateEvaluations(ev);
            this.setState({resource: {}, showEval: false});
        }).catch(
            (err) => {
                console.log(err);
            }
        );

        //TODO: fetch for new video fetch()
    }


    render() {


        let videoFooter = null;
        if (this.state.resource.url) {
            videoFooter = <footer className="blockquote-footer">
                From the course: <a href="" target="_blank"><cite
                title={this.state.resource.lesson}>{this.state.resource.lesson}</cite></a>
            </footer>
        }
        return (
            <div className="container">

                <h3>Resource: <em>{this.state.resource.title}</em></h3>

                <blockquote className="blockquote text-center mt-5 mb-5">
                    {/*<video controls width="640" height="360" className="img-thumbnail">
                        <source src={this.state.resource.url} type="video/mp4"/>
                            <track label="English" kind="subtitles" srclang="en" src={this.state.subtitleURL} default/>
                    </video>*/}
                    <div className="row">
                        <div className="col-sm-1 col-md-2"></div>
                        <div className="col-sm-9 col-md-6">
                            <ReactPlayer url={decodeURI(this.state.resource.url)} playing={this.state.play}
                                         onClick={this.toggleVideo} onPause={this.onPauseCallback}
                                         onEnded={this.onEndedCallBack} onSeek={this.onSeekCallback}
                                         controls={true} config={{
                                file: {
                                    tracks: [
                                        {
                                            kind: 'subtitles',
                                            src: this.state.resource.subtitleURL,
                                            srcLang: 'en',
                                            default: true
                                        },
                                    ]
                                }
                            }}/>
                        </div>
                        <div className="col-sm-2 col-md-4"></div>

                    </div>
                    {videoFooter}
                </blockquote>
                {this.state.showEval ? <FormEval onSend={this.onSend} videoId={this.state.resource.videoId}/> : null}
            </div>

        );

    }

}