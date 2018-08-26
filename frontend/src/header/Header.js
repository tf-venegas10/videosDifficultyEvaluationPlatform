import React, {Component} from 'react';
import "./Header.css";

// App component - represents the whole app

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    render() {

        return (
            <header className="page-row">
                <nav
                    className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar bg-dark box-shadow sticky-top">
                    <div className="container">
                        <a href="{% url 'home' %}" className="navbar-brand mr-0 mr-md-5"><strong>ALMA-DAJEE
                            Evaluation</strong></a>

                        {this.props.user.is_authenticated ?
                            <div className="navbar-nav-scroll">
                                <ul className="navbar-nav bd-navbar-nav flex-row">
                                    <li className="nav-item mr-3">
                                        <a className="nav-link" title="">Hi, {this.props.user.first_name}!</a>
                                    </li>
                                    {(this.props.user.numberResourcesEvaluated > 0) ?
                                        <li className="nav-item mr-3">
                                            <a className="nav-link" data-toggle="tooltip"
                                               title={"You have already evaluated " + this.props.user.numberResourcesEvaluated + " resources!"}><span
                                                className="fa fa-trophy"></span> {this.props.user.numberResourcesEvaluated}</a>
                                        </li>
                                        : <div></div>}
                                </ul>
                            </div>
                            : <div></div>}


                        {this.props.user.is_authenticated && this.props.user.is_superuser ?
                            <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="" id="nav-dropdown" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false"><span
                                        className="fa fa-download"></span> Data</a>
                                    <div className="dropdown-menu" aria-labelledby="nav-dropdown">
                                        <a className="dropdown-item" href="{% url 'dataResources' %}" target="_blank"><span
                                            className="fa fa-file mr-2"></span> Resources</a>
                                        <a className="dropdown-item" href="{% url 'dataSurveys' %}" target="_blank"><span
                                            className="fa fa-question-circle mr-2"></span> Surveys</a>
                                        <a className="dropdown-item" href="{% url 'dataEvaluations' %}"
                                           target="_blank"><span className="fa fa-check-square mr-2"></span> Evaluations</a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link p-2" href="{% url 'admin:index' %}" target="_blank"><span
                                        className="fa fa-wrench"></span> Admin</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link p-2" href="{% url 'logout' %}"><span
                                        className="fa fa-sign-out"></span> Logout</a>
                                </li>
                            </ul>
                            : <div></div>}

                        {this.props.user.is_authenticated && !this.props.user.is_superuser ?
                            <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                                <li className="nav-item">
                                    <a className="nav-link p-2" href="{% url 'logout' %}"><span
                                        className="fa fa-sign-out"></span> Logout</a>
                                </li>
                            </ul>
                            : <div></div>}

                    </div>
                </nav>
            </header>

        );

    }

}