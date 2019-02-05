import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { FormLabel } from 'react-bootstrap';
import { getFavourites, getCapitals, addFavouriteCity, addFavourite, GENERIC_ERROR } from '../actions';

class Search extends Component {
    constructor(props) {
        super(props);
        console.log('props',this.props);

        this.state = {
          value: '',
          suggestions: [],
          capitalsList:[],
          showSave: false,
          showError: false,
          errorMessage:'An error occured. Please Try again!'
        };    

        if(props.capitalsList.length < 1){
            this.props.getFavourites()
            .then(favouriteList => {
                if(favouriteList.type === GENERIC_ERROR){
                    this.handleError(favouriteList);
                }
                else{
                    console.log('favouriteList',favouriteList);
                    this.props.getCapitals()
                        .then(capitalList => {
                            if(capitalList.type === GENERIC_ERROR){
                                this.handleError(capitalList);
                            }
                            else{
                                console.log('capitalList',capitalList);
                                this.fetchAndAddDefaultCapital(capitalList.capitalsList);
                            }                            
                    });
                }
            })

        }
    }

    handleError(res){
        if(res.err.errorCode === 99){
            this.setState({showError: true,
                            errorMessage:'Session Expired ! You will be redirected to Login page'
            });
            window.setTimeout(()=>{
                this.props.history.push(`/`);
            },3000);
        }
        else{
            this.setState({showError: true,
                            errorMessage:'An error occured. Please Try again!'
            });
        }
    }

    fetchAndAddDefaultCapital(capitalList){
        const url = `http://ip-api.com/json/`;
        return fetch(url,{
            method: "GET"
        }).then(response => response.json())
            .then(json => {
                if(json){
                    this.setState({loading: false,defaultCapital:capitalList[json.countryCode]});
                    this.props.addFavourite(capitalList[json.countryCode]);
                }
                else{
                    this.setState({showError: true,
                            errorMessage:'An error occured. Please Try again!'
                    });
                }                
            });
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
          value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: [],
          showSave: false
        });
    };

    submit(){
        var found = false;
        for(var key in this.props.capitalsList){
            if(this.props.capitalsList[key]===this.state.value){
                found = true;
            }
        }
        if(!found){
            this.setState({showError: true,
                            errorMessage:'Please select a valid input'
                            });
        }
        else{
            this.props.addFavouriteCity(this.state.value)
                .then((res) => {
                    if(res.type === GENERIC_ERROR){
                        if(res.err.errorCode === 99){
                            this.setState({showError: true,
                                            errorMessage:'Session Expired ! You will be redirected to Login page'
                            });
                            window.setTimeout(()=>{
                                this.props.history.push(`/`);
                            },3000);
                        }
                        else{
                            this.setState({showError: true,
                                            errorMessage:'An error occured. Please Try again!'
                            });
                        }
                    }
                    else {
                        this.props.history.push(`/home`);
                    }
                });
        }
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
          placeholder: "Type Capital name",
          value,
          onChange: this.onChange
        };

        return (
            <div className="home-wrapper">
                <div className="back-button"><Link to="/home"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAZlBMVEUAAAAme70mfb0mfb0mfb0mgL8kgL8mfb0mfb0ofbsje7kmfb0mfbwoebwlfr0mfrwmfb0rgKomfb0mgL8rgL8lfb0mfb4nfL0rgLgmfb0mfLwnfb4nfb4mfbwmfb0mfb0mfb0AAAAQ7UuiAAAAIHRSTlMAG7b0xCgc2+otHdzmE2FXzAbQFAzaXs0Szs9WYrTzwtxdB3sAAAABYktHRACIBR1IAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4wIEBwgryIxidgAAAHZJREFUKM/d09cKgDAMBdA469575v+/UkW0gmn0TfC+HhpC6AW4RdMN0wJVbIGIjqtQz8ctQcgpYsQqxqwmKadZ/g8tylOpY1asSq4biuXwlnS5Whc+eM579o2Lt++pz3T1HlgfSN5LstagAcaVJVorOE7zUcEFnJogLZvZfK4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDItMDRUMDY6MDg6NDMrMDE6MDDKu7tSAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAyLTA0VDA2OjA4OjQzKzAxOjAwu+YD7gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" /></Link></div>
                <div className="search-container">
                    {
                            this.state.showError ? 
                                <FormLabel className="label-error">{this.state.errorMessage}</FormLabel>
                            :
                            <div></div>
                    }
                    <Autosuggest 
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps} />
                </div>
                {
                    //this.state.showSave ? 
                        <FormLabel className="btn-favourite-save" onClick={()=>this.submit()}>Save</FormLabel>
                    //:
                    //<div></div>
                }
                
            </div>
        );
    }

    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    renderSuggestion(suggestion, { query }) {
        const suggestionText = suggestion;
        const matches = AutosuggestHighlightMatch(suggestionText, query);
        const parts = AutosuggestHighlightParse(suggestionText, matches);
        return (
            <span className={'suggestion-content ' + suggestion}>
                <span className="name">
                    {
                        parts.map((part, index) => {
                        const className = part.highlight ? 'highlight' : null;

                            return (
                                <span className={className} key={index}>{part.text}</span>
                            );
                        })
                    }
                </span>
            </span>
        );
    }

    getSuggestions(value) {

        const escapedValue = this.escapeRegexCharacters(value.trim());
          
        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('\\b' + escapedValue, 'i');
        
        if(this.state.capitalsList.length < 1){
            var cityList = [];
            for(var key in this.props.capitalsList){
                cityList.push(this.props.capitalsList[key]);
            }
            this.setState({capitalsList:cityList});
        }
        var favlist = this.props.favouriteCityList;
          
        var suggestionsList = this.state.capitalsList.filter(capital => {
                                    if(favlist.indexOf(capital)<0){
                                        return regex.test(capital);
                                    }
                                    else {
                                        return false;
                                    }
                                });
        return suggestionsList.slice(0,8);
    }

    getSuggestionValue(suggestion) {
        return suggestion;
    }

    onSuggestionSelected(){
        debugger;
        this.setState({showSave: true});
    }
 
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps,{ getFavourites, getCapitals, addFavouriteCity, addFavourite })(Search);
