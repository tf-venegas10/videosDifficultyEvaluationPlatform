import React, {Component} from 'react';
import './App.css';
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Evaluation from "./evaluation/Evaluation";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Base64 from "base-64";
import Utf8 from "utf8";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                is_authenticated: false,
                numberResourcesEvaluated: 5,
                idUser: null,
                userName: null,
                navbar: "index",
                evaluations: null
            },
            toEval: []
        }
    }

    onSubmitLogin(email, password) {
        let value = email + ";;;" + password;
        let bytes = Utf8.encode(value);
        let encoded = Base64.encode(bytes);
        fetch("/API/login/" + encoded)
            .then(res => {
                return (res.json());
            })
            .then(user => {
                this.setState((prevState) => {
                        let evaluations = [];
                        fetch("/API/evaluations/" + user.id)
                            .then((res) => {
                                return res.json();
                            })
                            .then((res) => {
                                res.forEach((d)=>{
                                    evaluations.push(d);
                                });
                            })
                            .catch((err) => {
                                console.log(err)
                            });
                        return {
                            user: {
                                idUser: user.id,
                                numberResourcesEvaluated: evaluations.length,
                                userName: user.name,
                                is_authenticated: true,
                                evaluations: evaluations,
                                navbar: 'user',
                            }
                        };
                    }
                );
                fetch("/API/learning_resources")
                    .then((res) => {
                        return (res.json());
                    })
                    .then((res) => {
                        this.setState({toEval: res.ids});
                    });
            })
            .catch((err) => console.log(err));
    }

    onSubmitSignup(name, lastname, email, password) {
        let value = name + ";;;" + lastname + ";;;" + email + ";;;" + password;
        let bytes = Utf8.encode(value);
        let encoded = Base64.encode(bytes);
        fetch("/API/signup/" + encoded)
            .then((res) => {
                return (res.json());
            })
            .then((user) => {
                this.setState(() => {
                        return {
                            user: {
                                idUser: user.id,
                                numberResourcesEvaluated: 0,
                                userName: user.name,
                                is_authenticated: true,
                                evaluations: [],
                                navbar: 'user',
                            },
                        };
                    }
                );
                fetch("/API/learning_resources")
                    .then((res) => {
                        return (res.json());
                    })
                    .then((res) => {
                        this.setState({toEval: res});
                    });
            })
            .catch((err) => console.log(err));
    }

    onLogout() {
        this.setState((prevState) => {
                return {
                    user: {
                        idUser: null,
                        userName: null,
                        is_authenticated: false,
                        navbar: 'index',
                    },
                    toEval: []
                };
            }
        );
    }

    updateEvaluations(ev) {
        this.setState((prevState)=>{
            prevState.user.evaluations.push(ev);
            return prevState;
        });
    }

    render() {
        return (

            <div>
                <Header user={this.state.user} onLogout={this.onLogout.bind(this)}/>
                {this.state.user.is_authenticated ?
                    <Evaluation userId={this.state.user.idUser} toEval={this.state.toEval}
                                evaluations={this.state.user.evaluations}
                                updateEvaluations={this.updateEvaluations.bind(this)}/>
                    :
                    <div className="row">
                        <div className="col-6">
                            <Login onSubmit={this.onSubmitLogin.bind(this)}/>
                        </div>
                        <div className="col-6">
                            <Signup onSubmit={this.onSubmitSignup.bind(this)}/>
                        </div>
                    </div>
                }
                <Footer/>
            </div>


        )
    }
}

export default App;
