import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";

import "./Auth.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            onSubmit: this.props.onSubmit,
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.email.endsWith("@uniandes.edu.co")){
            this.state.onSubmit(this.state.email, this.state.password);
        }
    }

    render() {
        return (
            <div className="container-fluid form-base">
                <div className="row justify-content-around banner-content">
                    <form onSubmit={this.handleSubmit} className="col-6">
                        <div className="row justify-content-around">
                            <h3>Login</h3>
                        </div>
                        <FormGroup controlId="email" bsSize="large" validationState="error">
                            <ControlLabel className="auth-text">Email</ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large" validationState='error'>
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
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}