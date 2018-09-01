import React, { Component, Fragment } from 'react';
import { shape, string } from 'prop-types';
import '../../css/weather-icons.min.css';
import { API_KEY } from "../../constants";
import SearchBar from '../SearchBar';

export default class SecondView extends Component {
  static propTypes = {
    location: shape({
      state: shape({
        city: string,
      }),
    }),
  };
  static defaultProps = {
    location: {
      state: {
        city: '',
      },
    },
  };

  state = {
    weatherData: {},
    searchDone: false,
    errorMessage: '',
  }

  componentDidMount() {
    const { callWeatherData } = this;
    const { city } = this.props.location.state;
    console.log(city);
    callWeatherData(city);
  }

  callWeatherData = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
    fetch(url)
      .then(handleErrors)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        const weatherObj = {
          weather: data.weather,
          city: data.name,
          country: data.sys && data.sys.country,
          temp: data.main && data.main.temp,
          wind: data.wind,
        };
        this.setState({
          weatherData: weatherObj,
          searchDone: true,
          errorMessage: '',
        });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  }

  render() {
    const {
      state: {
        weatherData,
        errorMessage,
      },
      callWeatherData,
    } = this;
    if (!Object.keys(weatherData).length && !errorMessage) {
      return null;
    }
    return (
      <Fragment>
        <SearchBar callWeatherData={callWeatherData} />
        <br />
        {errorMessage && <h1>{errorMessage}</h1>}
        {!errorMessage && <div>
          <p>
            <strong>Город</strong>: {weatherData.city}
          </p>
          <p>
            <strong>Температура</strong>: {Math.round(weatherData.temp - 273.15)}
          </p>
          <p>
            <strong>Скорость ветра</strong>: {weatherData.wind.speed}
          </p>
          <p>
            <strong>Иконка</strong>: <i className={`wi wi-owm-${weatherData.weather[0].id}`} />
          </p>
        </div>}
      </Fragment>
    );
  }
}
