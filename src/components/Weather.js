import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  } from '../actions';
import { Link } from 'react-router-dom';
import { FormLabel } from 'react-bootstrap';
import { serverDomain } from "../utils/utils";

class Weather extends Component{
    constructor(props){
        super(props);

        this.state = {
            currentTime: '',
            sunrise: '',
            sunset: '',
            temp: '',
            weather: '',
            weatherIcon: '',
            weatherDesc: '',
            hour:0,
            minute:0,
            loading:true,
            showError: false,
            intervalId:null,
            errorMsg:'An error occured. Please Try again!'
        }
        props.location.capital = props.location.capital || localStorage.getItem('currentCapital')
        this.getWeather(props.location.capital);
    }

    getWeatherIcon(time,weather){
        var weatherMap = {
            "Clouds": ["wi-day-cloudy", "wi-night-alt-cloudy"],
            "Clear": ["wi-day-sunny", "wi-night-clear"],
            "Snow": ["wi-day-snow", "wi-night-snow"],
            "Rain": ["wi-day-rain", "wi-night-rain"],
            "Drizzle": ["wi-day-showers", "wi-night-showers"],
            "Thunderstorm": ["wi-day-thunderstorm", "wi-night-thunderstorm"],
            "Neutral": ["wi-day-sunny", "wi-moon-full"]
        }
        var timeOfDayFlag = 0;

        if(parseInt(time.substr(0,2)) < 6 && parseInt(time.substr(0,2)) > 18){
            timeOfDayFlag=1;
        }

        return weatherMap[weather]?  weatherMap[weather][timeOfDayFlag] : weatherMap["Neutral"][timeOfDayFlag];
    }

    getWeather(capital){
        const url = `${ serverDomain }/weather/get/weather?city=${capital}`;
        let token = localStorage.getItem("token");
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(json => {
                if(json.errorCode === 0){
                    var time = json.currentTime? json.currentTime.split(':') :[0,0];
                    this.setState({ 
                        currentTime: json.currentTime,
                        sunrise: json.sunrise,
                        sunset: json.sunset,
                        temp: json.temp,
                        weather: json.weather,
                        weatherIcon: json.weatherIcon,
                        weatherDesc: json.weatherDesc,
                        loading: false,
                        hour: parseInt(time[0]),
                        minute: parseInt(time[1])
                    });
                    this.startTimer();
                }
                else {
                    if(json.errorCode === 99){
                        this.setState({ 
                            showError: true,
                            loading: false,
                            errorMsg:'Session Expired ! You will be redirected to Login page'
                        });
                        window.setTimeout(()=>{
                            this.props.history.push(`/`);
                        },3000);
                    }
                    else{
                        this.setState({ 
                            showError: true,
                            loading: false,
                            errorMsg:'An error occured. Please Try again!'
                        });
                    }
                }                
                console.log('json',this.state);
            });
    }

    startTimer(){
        var intId = window.setInterval(() =>{

            var minute = this.state.minute === 59 ? 0 : this.state.minute + 1;
            var hour = (this.state.hour === 23 && this.state.minute === 59) 
                        ? 0 : this.state.minute === 59 ? this.state.hour + 1 : this.state.hour;
            this.setState({minute: minute, hour: hour});
        },60000);

        this.setState({intervalId:intId});
    }

    componentWillUnmount(){
        window.clearInterval(this.state.intervalId);
        console.log('cleared',this.state.intervalId);
    }

    render(){
        return (
            <div className="weather-wrapper">
                <div className="back-button"><Link to="/home"><img alt="Back" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAZlBMVEUAAAAme70mfb0mfb0mfb0mgL8kgL8mfb0mfb0ofbsje7kmfb0mfbwoebwlfr0mfrwmfb0rgKomfb0mgL8rgL8lfb0mfb4nfL0rgLgmfb0mfLwnfb4nfb4mfbwmfb0mfb0mfb0AAAAQ7UuiAAAAIHRSTlMAG7b0xCgc2+otHdzmE2FXzAbQFAzaXs0Szs9WYrTzwtxdB3sAAAABYktHRACIBR1IAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4wIEBwgryIxidgAAAHZJREFUKM/d09cKgDAMBdA469575v+/UkW0gmn0TfC+HhpC6AW4RdMN0wJVbIGIjqtQz8ctQcgpYsQqxqwmKadZ/g8tylOpY1asSq4biuXwlnS5Whc+eM579o2Lt++pz3T1HlgfSN5LstagAcaVJVorOE7zUcEFnJogLZvZfK4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDItMDRUMDY6MDg6NDMrMDE6MDDKu7tSAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAyLTA0VDA2OjA4OjQzKzAxOjAwu+YD7gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" /></Link></div>
                <div className="weather-container">
                    {
                        this.state.loading &&
                            <img 
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" 
                                alt="Loading..."
                                className="loading-icon"
                                />
                    }
                    {
                        this.state.showError 
                        ||
                        this.state.loading?<div></div>
                        :
                            <div>
                                <div className="weather-column weather-condition">
                                    <div className="cell-weather-icon">
                                        <i 
                                            className={"wi " + this.getWeatherIcon(this.state.currentTime,this.state.weather)}
                                        />
                                    </div>
                                    <div className="cell-weather-desc">{this.state.weatherDesc}</div>
                                </div>
                                <div className="weather-column time-info">
                                    <div className="cell-current-time-hour">
                                        {this.state.hour < 10 ? '0':''}
                                        {this.state.hour}</div>
                                    <div className="cell-current-time-min">
                                        {this.state.minute < 10 ? '0':''}
                                        {this.state.minute}</div>
                                    <div className="cell-city-name">{this.props.location.capital}</div>
                                </div>
                                <div className="weather-column weather-details">
                                    <div className="cell-temp">
                                        <i className="wi wi-thermometer"/>
                                        <span className="sub-cell">{this.state.temp} &#176;C</span>
                                    </div>
                                    <div className="cell-sunrise">
                                        <i className="wi wi-sunrise" />
                                        <span className="sub-cell">{this.state.sunrise}</span>
                                    </div>
                                    <div className="cell-sunset">
                                        <i className="wi wi-sunset" />
                                        <span className="sub-cell">{this.state.sunset}</span>
                                    </div>
                                </div> 
                            </div>
                    }
                </div>
                {
                    this.state.showError && <FormLabel className="label-error label-error-weather">{this.state.errorMsg}</FormLabel>
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return state;
}

export default connect( mapStateToProps,null )(Weather);