import React, { Component } from 'react';
import './bootstrap.min.css'
import './App.css';


import axios from 'axios'

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
        this.backToGame = this.backToGame.bind(this);
    }
    componentDidMount() {
        axios.post("/gettime")
            .then((res) => {
                console.log(res)
                this.setState({
                    data: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    backToGame() {
        window.location.href='http://localhost:5000';
    }

    render() {
    return (
      <div className="container">
        <table className="table">
            <tbody>
            <tr><th>{"ID"}</th><th>{"TIME"}</th></tr>
            {this.state.data.map((e, i) => {
                return(
                    <tr key={i}><td>{e['_id']}</td><td>{e['time']}</td></tr>
                )
            })}
            </tbody>
        </table>
          <button className="btn btn-danger" onClick={this.backToGame}>Back to game</button>
      </div>
    );
  }
}

export default App;
