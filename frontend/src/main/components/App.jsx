import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import actions from '../App.actions';
import './App.css';

export class App extends Component {
  /**
   * Handles input change
   */
  handleInputChange = (event) => {
    const { updateInputNumber } = this.props;
    updateInputNumber(event.target.value);
  }

  render() {
    const {
      submitNumber,
      inputNumber,
      medianPrimes,
    } = this.props;
    console.log(medianPrimes);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Touch Bistro Demo
          </h1>
        </header>
        <p className="App-intro">
          Enter a number to get the median prime number(s) of the
          set of prime numbers less than your number.
        </p>
        <div className="App-inputs">
          <pre>
            {
              JSON.stringify(this.props)
            }
          </pre>
          <Input
            type="number"
            onChange={this.handleInputChange}
            value={inputNumber}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={submitNumber}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  submitNumber: PropTypes.func.isRequired,
  updateInputNumber: PropTypes.func.isRequired,
  inputNumber: PropTypes.number.isRequired,
  medianPrimes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const mapDispatchToProps = dispatch => ({
  submitNumber: () => dispatch(actions.submitSieveNumber.start()),
  updateInputNumber: value => dispatch(actions.inputNumberChange(value)),
});

const mapStateToProps = state => ({
  ...state.appReducer,
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
