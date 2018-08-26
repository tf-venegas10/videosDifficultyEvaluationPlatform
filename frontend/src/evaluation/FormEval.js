import React, {Component} from 'react';
import "./FormEval.css";

// App component - represents the whole app

export default class FormEval extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "none"
        }
    }

    onSelect(name) {
        this.setState({selected: name});
    }

    render() {

        return (
            <div id="accordion" className="mt-5 mb-5">
                <form>
                    <div className="card">

                        <div data-parent="#accordion">
                            <div className="card-body survey-part row">
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="VeryDifficult" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selected === "VeryDifficult"} id="VeryDifficult"
                                        onClick={this.onSelect.bind(this, "VeryDifficult")}/>Very Difficult</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="Difficult" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selected === "Difficult"}
                                        id="Difficult"
                                        onClick={this.onSelect.bind(this, "Difficult")}/> Difficult</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="Intermediate" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selected === "Intermediate"}
                                        id="Intermediate"
                                        onClick={this.onSelect.bind(this, "Intermediate")}/>Intermediate</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="Easy" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selected === "Easy"}
                                        id="Easy"
                                        onClick={this.onSelect.bind(this, "Easy")}/>Easy</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="VeryEasy" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selected === "VeryEasy"}
                                        value="" id="VeryEasy"
                                        onClick={this.onSelect.bind(this, "VeryEasy")}/>Very
                                        Easy</label>
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn btn-info partial-validation submit"><span
                                        className="fa fa-check"></span> Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        );

    }

}