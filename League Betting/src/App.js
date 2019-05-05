import React, { Component } from 'react';
import './App.css';


import getWeb3 from './utils/getWeb3.js';

import RedTeam from './TeamA.jsx';
import BlueTeam from './TeamB.jsx';
import Control from './Control.jsx';


class App extends Component {
  constructor(){
    super();
    this.state = {
      web3 : '',
      address: '',
    };
  }

  componentDidMount() { //Used to load web3
    getWeb3.then(results => {
      results.web3.eth.getAccounts( (error,acc) => {
        this.setState({
          address: acc[0],
          web3: results.web3
        })
      });
    }).catch( () => {
    })
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">League Betting</h1>
        </header>
        <div>
        Your Wallet address is {this.state.address}<br/>
        </div>
        {/*We define a grid*/}

          {/*corresponding to class="row"*/}
          <div class ="container">
          <div class = "row">

            <div class = "col l5 s5"><RedTeam/></div>
            <div class = "col l2 s2"></div>
            <div class = "col l5 s5"><BlueTeam/></div>
          </div>
            <div>
              <Control/>
            </div>
          </div>


      </div>
    );
  }
}

export default App;
