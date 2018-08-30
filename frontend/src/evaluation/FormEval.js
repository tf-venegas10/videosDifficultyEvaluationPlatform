import React, {Component} from 'react';
import "./FormEval.css";
import  MultiSelectReact  from 'multi-select-react';
import Select from 'react-select';
// App component - represents the whole app

export default class FormEval extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "none",
            selectedKnowledge:"none",
            concepts:[]
        }
    }

    onSelect(name) {
        this.setState({selected: name});
    }
    onSelectKnowledge(name){
        this.setState({selectedKnowledge: name});
    }
    componentDidMount(){
        fetch("/API/concepts")
            .then(res => {
                return (res.json());
            })
            .then(concepts => {
                this.setState({concepts:concepts});
            })
            .catch((err) => console.log(err));
    }
    optionClicked(optionsList) {
        this.setState({ concepts: optionsList });
    }
    selectedBadgeClicked(optionsList) {
        this.setState({ concepts: optionsList });
    }

    render() {

        let listConcepts=[];

        this.state.concepts.sort((a,b)=>{
            if (b.label<a.label){
                return 1;
            }
            else{
                return -1;
            }
        })
            .forEach((c)=>{

           listConcepts.push(<option key={c.id} value={c.uri}>{c.label}</option>);

        });
        const selectedOptionsStyles = {
            color: "#3c763d",
            backgroundColor: "#dff0d8"
        };
        const optionsListStyles = {
            backgroundColor: "#dff0d8",
            color: "#3c763d"
        };

        return (
            <div id="accordion" className="mt-5 mb-5">
                <form>
                    <div className="card">

                        <div data-parent="#accordion">
                    <div className="card-body survey-part row">
                    What was the level of dificulty you felt when seeing the video?
                     </div>
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


                            </div>
                            <div className="card-body survey-part row">
                                What was your level of knowledge of the topics treated?
                            </div>
                            <div className="card-body survey-part row">
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="Unknown" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedKnowledge === "Unknown"} id="Unknown"
                                        onClick={this.onSelectKnowledge.bind(this, "Unknown")}/>Unknown</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="Familiar" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedKnowledge === "Familiar"}
                                        id="Familiar"
                                        onClick={this.onSelectKnowledge.bind(this, "Familiar")}/> Familiar</label>
                                </div>
                                <div className="form-check form-check-inline col-sm-2">
                                    <label htmlFor="veryKnown" className="form-check-label"><input
                                        className="form-check-input" type="radio"
                                        checked={this.state.selectedKnowledge === "veryKnown"}
                                        id="veryKnown"
                                        onClick={this.onSelectKnowledge.bind(this, "veryKnown")}/>Very known</label>
                                </div>



                            </div>
                            <div className="card-body survey-part row">
                                What topics did you identified on the video?
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <select multiple data-role="tagsinput">
                                        {listConcepts}
                                    </select>

                                </div>
                            </div>
                            <MultiSelectReact
                                options={this.state.concepts}
                                optionClicked={this.optionClicked.bind(this)}
                                selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
                                selectedOptionsStyles={selectedOptionsStyles}
                                optionsListStyles={optionsListStyles} />

                            <Select
                                value={this.state.selected}
                                onChange={this.handleChange}
                                options={this.state.concepts}
                                isMulti={true}
                            />
                            <div className="text-center">
                                <button type="button" className="btn btn-info partial-validation submit"><span
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