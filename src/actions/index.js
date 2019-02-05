import { serverDomain } from "../utils/utils";

export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const GET_FAVOURITES = 'GET_FAVOURITES';
export const GET_CAPITALS = 'GET_CAPITALS';
export const GENERIC_ERROR = 'GENERIC_ERROR';

export function genericError(err){
    return {
        type: GENERIC_ERROR,
        err: err
    }
}

export function addFavourite(city){
    return {
        type: ADD_FAVOURITE,
        city
    }
}

export function getFavourite(favouriteCityList){
    return {
        type: GET_FAVOURITES,
        favouriteCityList: favouriteCityList
    }
}

function getFavouritesJSON(){
    const url = `${ serverDomain }/weather/get/favourites`;
    let token = localStorage.getItem("token");
    return fetch(url,{
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json());
}

export function getFavourites(){
    return function(dispatch){
        return getFavouritesJSON()
                .then(res => {
                    if(res.errorCode === 0){
                        return dispatch(getFavourite(res.favouriteCityList));
                    }
                    else{
                        return dispatch(genericError(res));
                    }    
                });
    }
}

export function getCapitalsList(capitalsList){
    return {
        type: GET_CAPITALS,
        capitalsList
    }
}

function getCapitalsJSON(){
    const url = `${ serverDomain }/weather/get/capitals`;
    let token = localStorage.getItem("token");
    return fetch(url,{
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json());
}

export function getCapitals(){
    return function(dispatch){
        return getCapitalsJSON()
                .then(res => {
                    if(res.errorCode === 0){
                        return dispatch(getCapitalsList(res.data));
                    }
                    else{
                        return dispatch(genericError(res));
                    }    
             });
    }
}

function addFavouriteCityJSON(city){
    const url = `${ serverDomain }/weather/post/favourite`;
    let token = localStorage.getItem("token");
    return  fetch(url, {
                method: 'POST',
                body:JSON.stringify({ city: city }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => response.json());
}

export function addFavouriteCity(city){
    return function(dispatch){
        return addFavouriteCityJSON(city)
                .then(res => {
                    console.log(res);
                    if(res.errorCode === 0){
                        return dispatch(addFavourite(city));
                    }
                    else{
                        return dispatch(genericError(res));
                    }                         
                });
    }
}