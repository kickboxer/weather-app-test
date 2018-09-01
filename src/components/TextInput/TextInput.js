import React, { Component, Fragment } from 'react';
import { func, shape, string, number, arrayOf } from 'prop-types';

export default class TextInput extends Component {
  static propTypes = {
    onInputChange: func,
    options: arrayOf(shape({
      value: number,
      label: string,
    })),
    value: string,
    maxOptions: number,
  };
  static defaultProps = {
    onInputChange: () => {},
    options: shape({
      value: 0,
      label: '',
    }),
    value: '',
    maxOptions: 5,
  };

  onInputChange = (e) => {
    this.props.onInputChange(e.target.value);
  };

  onTipClick = (e) => {
    this.props.onInputChange(e.target.innerText);
  };

  render() {
    const {
      props: {
        options,
        value,
        maxOptions,
      },
      onTipClick,
      onInputChange,
    } = this;

    return (
      <Fragment>
        <input type='text' value={value} onChange={onInputChange} />
        {(value && options.length) && <ul>
          {options
            .filter((option) => {
              return option.label.toLowerCase().includes(value.toLowerCase()) && option.label.toLowerCase() !== value.toLowerCase();
            })
            .map(option => <li key={option.label} onClick={onTipClick}>{option.label}</li>)
            .slice(0, maxOptions)
          }
        </ul>}
      </Fragment>
    );
  }
}
