import React, {Component} from 'react';
import "./FormEval.css";
import Select from 'react-select';
import $ from "jquery";
// App component - represents the whole app

export default class FormEval extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            selectedDifficulty: "none",
            selectedKnowledge: "none",
            concepts: [],
            missingSelection: false
        };

        this.onSend = this.onSend.bind(this);
    }

    onSelect(name) {
        this.setState({selectedDifficulty: name});
    }

    onSelectKnowledge(name) {
        this.setState({selectedKnowledge: name});
    }

    componentDidMount() {
        $(".concept-section").on("keypress", (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        });

        fetch("/API/concepts")
            .then(res => {
                return (res.json());
            })
            .then(concepts => {
                this.setState({concepts: concepts});
            })
            .catch((err) => console.log(err));
        if (this.props.videoId) {
            fetch("/API/concepts/" + this.props.videoId)
                .then(res => {
                    console.log(res);
                    return (res.json());
                })
                .then(concepts => {
                    let selected = [];
                    concepts.forEach((c) => {
                        console.log(c);
                        selected.push({value: c.uri, label: c.label});
                    });
                    this.setState({selected: selected});
                })
                .catch((err) => console.log(err));
        }
    }

    handleChange(selectedOption) {
        this.setState({selected: selectedOption});

    }

    onSend() {
        if (this.state.selectedKnowledge !== "none" && this.state.selectedDifficulty !== "none") {
            let evaluation = {
                topics: this.state.selected,
                difficulty: this.state.selectedDifficulty,
                knowledge: this.state.selectedKnowledge,
            };
            this.props.onSend(evaluation);

            this.setState({
                selected: [],
                selectedDifficulty: "none",
                selectedKnowledge: "none",
                missingSelection: false
            });

        } else {
            this.setState({missingSelection: true});
        }
    }

    onKeyPress(event) {
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    }


    render() {

        let listConcepts = [];

        this.state.concepts.sort((a, b) => {
            if (b.label < a.label) {
                return 1;
            }
            else {
                return -1;
            }
        })
            .forEach((c) => {

                listConcepts.push({value: c.uri, label: c.label});
            });

        let warnning = null;
        if (this.state.missingSelection) {
            warnning = (<div className="alert alert-danger" role="alert">
                <strong>Oh snap!</strong> You need to fully evaluate the resource.
            </div>)
        }


        return (
            <div id="accordion" className="mt-5 mb-5">
                <form>
                    <div className="card">

                        <div data-parent="#accordion">
                            <div className="card-body survey-part row">
                                What was the level of difficulty you felt when seeing the video?
                            </div>
                            <div className="card-body survey-part row">
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="VeryEasy" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedDifficulty === "VeryEasy"}
                                        value="" id="VeryEasy"
                                        onClick={this.onSelect.bind(this, "VeryEasy")}/>Very
                                        Easy</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="Easy" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedDifficulty === "Easy"}
                                        id="Easy"
                                        onClick={this.onSelect.bind(this, "Easy")}/>Easy</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="Intermediate" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedDifficulty === "Intermediate"}
                                        id="Intermediate"
                                        onClick={this.onSelect.bind(this, "Intermediate")}/>Intermediate</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="Difficult" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedDifficulty === "Difficult"}
                                        id="Difficult"
                                        onClick={this.onSelect.bind(this, "Difficult")}/> Difficult</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="VeryDifficult" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedDifficulty === "VeryDifficult"} id="VeryDifficult"
                                        onClick={this.onSelect.bind(this, "VeryDifficult")}/>Very Difficult</label>
                                </div>


                            </div>
                            <div className="card-body survey-part row">
                                How well did you know the topics treated in the video?
                            </div>
                            <div className="card-body survey-part row">
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="veryKnown" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedKnowledge === "veryKnown"}
                                        id="veryKnown"
                                        onClick={this.onSelectKnowledge.bind(this, "veryKnown")}/>Very known</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="Familiar" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedKnowledge === "Familiar"}
                                        id="Familiar"
                                        onClick={this.onSelectKnowledge.bind(this, "Familiar")}/> Familiar</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="Unknown" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedKnowledge === "Unknown"} id="Unknown"
                                        onClick={this.onSelectKnowledge.bind(this, "Unknown")}/>Unknown</label>
                                </div>

                            </div>
                            <div className="card-body survey-part row">
                                What topics did you identify on the video?
                            </div>

                            <div className="concept-section">
                                <Select
                                    value={this.state.selected}
                                    isMulti
                                    name="topics"
                                    allowCreate={true}
                                    options={listConcepts}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </div>
                            {warnning}
                            <div className="text-center">
                                <button type="button" className="btn btn-info partial-validation submit"
                                        onClick={this.onSend}><span
                                    className="fa fa-check"></span> Submit
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        );

    }

}