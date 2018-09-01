import React, { Component } from 'react';
import { func } from 'prop-types';
import TextInput from './../TextInput';
import cities from './cities.json';

export default class SearchBar extends Component {
  static propTypes = {
    callWeatherData: func.isRequired,
  };
  static defaultProps = {
    callWeatherData: () => {},
  };

  state = {
    value: '',
    warning: false,
  };

  sendValueToParent = (e) => {
    const { callWeatherData } = this.props;
    const { value } = this.state;
    e.preventDefault();
    if (value.trim() === "" || value.match(/\d+/g) !== null) {
      this.setState({ warning: true });
    } else {
      callWeatherData(value);
      this.setState({ warning: false });
    }
  };

  onInputChange = (value) => {
    this.setState({ value });
  };

  render() {
    const warningMessage = (
      <div>Проверьте правильность ввода города</div>
    );
    const {
      state: {
        value,
        warning,
      },
      sendValueToParent,
      onInputChange,
    } = this;

    return (
      <div>
        {warning && warningMessage}
        <br />
        <form onSubmit={sendValueToParent}>
          <TextInput maxOptions={3} options={cities} value={value} onInputChange={onInputChange} />
          <button>Узнать погоду</button>
        </form>
      </div>
    );
  }
}
