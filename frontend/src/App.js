import React, {Component} from 'react';
import './App.css';
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Evaluation from "./evaluation/Evaluation";

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            user:{
                is_authenticated:true,
                first_name:"Tomas",
                is_superuser:true,
                numberResourcesEvaluated:5

            }
        }
    }
    render() {
        return (
            <div>
                <Header user={this.state.user}/>
                {this.state.user.is_authenticated?
                <Evaluation/>
                :<div>
                    Please log in and help us with this amazing research!
                    </div>
                }
                <Footer/>
            </div>
        )
    }
}

export default App;