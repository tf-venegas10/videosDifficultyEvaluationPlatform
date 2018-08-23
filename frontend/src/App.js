import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <footer class="text-muted page-row" id="site-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-2">
                                <a href="https://www.uni.lu" target="_blank"><img src="../public/unilu.png"
                                                                                  alt="unilu logo"/></a>
                            </div>
                            <div class="col-md-6"></div>
                            <div class="col-md-4 text-right">
                                <a href="https://uniandes.edu.co" target="_blank">
                                    <img src="../public/uniandes.png" alt="uniandes logo"/></a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default App;