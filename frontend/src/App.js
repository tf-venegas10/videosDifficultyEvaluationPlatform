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
    constructor(props){
        super(props);
        this.state={
            user:{
                is_authenticated:false,
                is_superuser:false,
                numberResourcesEvaluated:5,
                idUser: null,
                userName: null,
                userMail: null,
                navbar: "index",
            }
        }
    }

    onSubmitLogin(email, password) {
        let value = email + ";;;" + password;
        let bytes = Utf8.encode(value);
        let encoded = Base64.encode(bytes);
        console.log("login attempt");
        fetch("/API/login/" + encoded)
            .then(res => {
                return (res.json());
            })
            .then(user => {
                this.setState((prevState) => {
                        return {
                            user: {
                                idUser: user.id,
                                userName: user.name,
                                userMail: user.email,
                                is_authenticated: true,
                                navbar: 'user',
                            }
                        };
                    }
                );
            })
            .catch((err) => console.log(err));
    }

    onSubmitSignup(name, lastname, email, password) {
        let value = name + ";;;" + lastname + ";;;"+ email + ";;;" + password;
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
                                userName: user.name,
                                userMail: user.email,
                                is_authenticated: true,
                                navbar: 'user',
                            }
                        };
                    }
                );
            })
            .catch((err) => console.log(err));
    }

    onLogout(){
        this.setState((prevState) => {
                return {
                    user: {
                        idUser: null,
                        userName: null,
                        userMail: null,
                        is_authenticated: false,
                        navbar: 'index',
                    }
                };
            }
        );
    }

    render() {
        return (

            <div>
                <Header user={this.state.user} onLogout={this.onLogout.bind(this)}/>
                {this.state.user.is_authenticated?
                <Evaluation/>
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
