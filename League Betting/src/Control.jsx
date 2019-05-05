import React, { Component } from 'react';
import getWeb3 from './utils/getWeb3.js';
import BettingContract from './contracts/Betting.json'
import './App.css';



class Control extends Component {
  constructor(){
    super();
    this.state={
      web3: '',
      Amount: '',
      InputAmount: '',
      weiConversion : 1000000000000000000
    }

    this.MakeWinRed = this.MakeWinRed.bind(this);
    this.MakeWinBlue = this.MakeWinBlue.bind(this);
  }

  componentDidMount(){
    getWeb3.then(results => {
      results.web3.eth.getAccounts( (error,acc) => {
        this.setState({
          web3: results.web3
        })
      });
      return results.web3
    }).then(results => {
      
      this.getAmount(results)
    }).catch( () => {
      
    })
  }

  MakeWinRed(){
    const contract = require('truffle-contract');
    const Betting = contract(BettingContract);
    Betting.setProvider(this.state.web3.currentProvider);
    var BettingInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Betting.deployed().then((instance) => {
          BettingInstance = instance
        }).then((result) => {
          return BettingInstance.distributePrizes(1, {from: accounts[0]})
        }).catch(() => {
          console.log("Error with distributing prizes")
        })
      })
  }

  MakeWinBlue(){
    const contract = require('truffle-contract');
    const Betting = contract(BettingContract);
    Betting.setProvider(this.state.web3.currentProvider);
    var BettingInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Betting.deployed().then((instance) => {
          BettingInstance = instance
        }).then((result) => {
          return BettingInstance.distributePrizes(2, {from: accounts[0]})
        }).catch(() => {
          console.log("Error with distributing prizes")
        })
      })
  }




  render(){
        return(
          <div>
            <h3>Super Secret Controls</h3>
            
            <button onClick={this.MakeWinRed}> Make Red win</button>
            <button onClick={this.MakeWinBlue}> Make Blue win</button>
          </div>
        )

    }



}

export default Control;
