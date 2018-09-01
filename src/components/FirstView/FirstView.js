import React, { Component } from 'react';
import { WEATHER_PAGE } from '../../constants/URLsCollections';
import { func, shape } from 'prop-types';

export default class FirstView extends Component {
  static propTypes = {
    history: shape({
      push: func.isRequired,
    }),
  };

  static defaultProps = {
    history: shape({
      push: () => {},
    }),
  };

  state = {
    name: '',
    city: '',
  };

  onInputChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    const { city } = this.state;
    e.preventDefault();
    this.props.history.push({
      pathname: WEATHER_PAGE,
      state: { city },
    });
  };

  render() {
    const {
      onInputChange,
      onSave,
    } = this;
    return (
      <form onSubmit={onSave}>
        <label>
          Имя:
          <input type='text' placeholder='Введите своё имя' onChange={onInputChange} name='name' required />
        </label>
        <br />
        <br />
        <label>
          Город:
          <input type='text' placeholder='Введите свой город' onChange={onInputChange} name='city' required />
        </label>
        <br />
        <br />
        <button>Сохранить</button>
      </form>
    );
  }
}
