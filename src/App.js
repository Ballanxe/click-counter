import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      counter:0,
      belowZero: false
    }
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement(){
    this.setState({
      counter: this.state.counter + 1,
      belowZero: false
    })
  }

  onDecrement(){
    if (this.state.counter === 0){
      this.setState({
        belowZero: true
      })
    }else{
      this.setState({
        counter: this.state.counter - 1
      })
    }

  }


  render(){
    return (
      <div data-test="component-app">
      { this.state.belowZero ? <p data-test="error-below-zero" style={{ color: 'red' }}>The counter must be positive</p> : null }
      <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
      <button 
        data-test="increment-button"
        onClick={this.onIncrement}
        >
        Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={this.onDecrement}>Decrement counter</button>
      </div>
    );
  }


}

export default App;
