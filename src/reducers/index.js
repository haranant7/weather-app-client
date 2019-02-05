import { combineReducers } from 'redux';
import { GET_FAVOURITES, GET_CAPITALS, ADD_FAVOURITE,GENERIC_ERROR } from '../actions';

function favouriteCityList(state = [], action){
    switch (action.type){
        case GET_FAVOURITES:
            return action.favouriteCityList;
        case ADD_FAVOURITE:
            return [...state,action.city];
        default:
            return state;
    }
}

function genericError (state=[],action){
    console.log('errreducer',state,action);
    switch (action.type){
        case GENERIC_ERROR:
            return action.err;
        default:
            return state;
    }

}

function capitalsList(state = [], action){
    switch (action.type){
        case GET_CAPITALS:
            return action.capitalsList;
        default:
            return state;
    }
}

const rootReducer = combineReducers({ favouriteCityList, capitalsList, genericError });

export default rootReducer;