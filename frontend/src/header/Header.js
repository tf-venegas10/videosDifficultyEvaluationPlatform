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
                                        <a className="nav-link" title="">Hi, {this.props.user.userName}!</a>
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


                        {this.props.user.is_authenticated ?
                            <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                                <li className="nav-item">
                                    <a className="nav-link p-2" onClick={this.props.onLogout}><span
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