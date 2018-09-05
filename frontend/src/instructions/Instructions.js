import React, {Component} from 'react';
import "./Instructions.css";

/**
 * Component that represents the section of the instructions when logging or signing in.
 */
export default class Instructions extends Component {

    render() {
        return (
            <div className="instructions-content">
                <div className="row justify-content-around center-items">
                    <h1 className="col-6 instructions-title">Thanks for helping us!</h1>
                </div>
                <div className="row justify-content-around">
                    <h4 className="col-8">In this platform you will be confronted to a series of educational videos that are meant to teach
                        you or complement your knowledge. After you have seen any video, a series of questions will pop
                        up to ask about your experience. We ask you to enjoy and try to learn new things!!</h4>
                </div>
                <div className="row justify-content-around proceed-btn">
                    <button className="btn btn-primary" onClick={this.props.goToIndex}>Proceed</button>
                </div>
            </div>
        );
    }
}