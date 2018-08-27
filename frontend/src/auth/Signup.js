import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";

import "./Auth.css";

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            name: "",
            lastName: "",
            onSubmit: this.props.onSubmit,
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length > 0 && this.state.lastName.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.state.onSubmit(this.state.name, this.state.lastName, this.state.email, this.state.password);
    }

    render() {
        return (
            <div className="container-fluid form-base">
                <div className="row justify-content-around banner-content">
                    <form onSubmit={this.handleSubmit} className="col-6">
                        <div className="row justify-content-around">
                            <h3>Sign Up</h3>
                        </div>
                        <FormGroup controlId="name" bsSize="large">
                            <ControlLabel className="auth-text">First Name</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="lastName" bsSize="large">
                            <ControlLabel className="auth-text">Last Name</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel className="auth-text">Email</ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel className="auth-text">Password</ControlLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}