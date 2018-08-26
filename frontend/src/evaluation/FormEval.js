import React, {Component} from 'react';
import "./FormEval.css";

// App component - represents the whole app

export default class FormEval extends Component {


    render() {

        return (
            <div id="accordion" className="mt-5 mb-5">
                <form action="{% url "evaluation" %}" method="post" novalidate>
                    {% csrf_token %}
                    {% with concepts=resource.concepts.all %}
                    {% for c in concepts %}
                    {% with concept=c.concept %}

                    <div className="card">
                        <div className="card-header" id="heading-{{ forloop.counter }}">
                            <h5 className="mb-0">
                                <button type="button" className="btn btn-link btn-concept-header" data-toggle="collapse" data-target="#collapse-{{ forloop.counter }}" aria-expanded="true" aria-controls="collapse-{{ forloop.counter }}" disabled>
                                    <strong>Concept:</strong> {{ concept.label|title }}
                                </button>

                                {% if concept.wikiPage %}
                                <a className="float-right small" href="{{ concept.wikiPage }}" target="_blank">
                                    <span className="fa fa-external-link"></span> Wikipedia
                                </a>
                                {% endif %}
                            </h5>
                        </div>

                        <div id="collapse-{{ forloop.counter }}" className="collapse {% if forloop.first %}show{% endif %}" aria-labelledby="heading-{{ forloop.counter }}" data-parent="#accordion">
                            <div className="card-body survey-part">

                                {% for q in conceptSurvey.questions.all %}
                                {% with question=q.cast %}
                                {% include question.template with question=question concept=c %}
                                {% endwith %}
                                {% endfor %}

                                <div className="text-center">
                                    <button type="button" className="btn btn-info partial-validation" data-toggle="collapse" data-expand="#collapse-{{ forloop.counter|add:1 }}"  role="button" aria-expanded="false" aria-controls="collapse-{{ forloop.counter|add:1 }}">
                                        <span className="fa fa-angle-down"></span> Evaluate {% if forloop.last %}the resource{% else %}the next concept{% endif %}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {% endwith %}
                    {% endfor %}

                    {% with l=concepts|length|add:1 %}
                    <div className="card">
                        <div className="card-header" id="heading-{{ l }}">
                            <h5 className="mb-0">
                                <button type="button" className="btn btn-link btn-concept-header" data-toggle="collapse" data-target="#collapse-{{ l }}" aria-expanded="true" aria-controls="collapse-{{ l }}" disabled>
                                    <strong>Resource:</strong> {{ resource.title|title }}
                                </button>
                            </h5>
                        </div>

                        <div id="collapse-{{ l }}" className="collapse" aria-labelledby="heading-{{ l }}" data-parent="#accordion">
                            <div className="card-body survey-part">

                                {% for q in resourceSurvey.questions.all %}
                                {% with question=q.cast %}
                                {% include question.template with question=question resource=resource %}
                                {% endwith %}
                                {% endfor %}

                                <div className="text-center">
                                    <button type="button" className="btn btn-info partial-validation submit"><span className="fa fa-check"></span> Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {% endwith %}
                    {% endwith %}
                </form>
            </div>
            </div>

                );

                }

                }