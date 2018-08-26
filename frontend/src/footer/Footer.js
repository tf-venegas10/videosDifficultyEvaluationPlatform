import React, {Component} from 'react';
import "./Footer.css";

export default class Footer extends Component{

    render(){
        return(
            <div>
                <footer className="text-muted page-row" id="site-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                <a href="https://www.uni.lu" target="_blank" rel="noopener noreferrer"><img
                                    src="../resources/unilu.png"
                                    alt="unilu logo"/></a>
                            </div>
                            <div className="col-sm-6"></div>
                            <div className="col-sm-4 text-right">
                                <a href="https://uniandes.edu.co" target="_blank" rel="noopener noreferrer">
                                    <img src="../resources/uniandes.png" alt="uniandes logo"/></a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}