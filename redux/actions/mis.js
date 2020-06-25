import { GET_COUNT, GET_LIKES, INCREMENT_COUNT, GET_TOPS, GET_NOTIFICATIONS, SET_MESSAGE, SET_LOADER } from './types';
import {tokenConfig} from './auth'
import axios from 'axios'

export const getCount = () => (dispatch, getState) =>{
    axios
        .get('/api/me-count/', tokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_COUNT,
                payload: response.data
            });
        })
        .catch(error =>  console.log(error))  
}

export const getLikes = () => (dispatch, getState) =>{
    axios
        .get('/api/me-like/', tokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_LIKES,
                payload: response.data
            });
        })
        .catch(error =>  console.log(error))  
}

export const addCount = () => (dispatch, getState) => {
    dispatch({
        type: INCREMENT_COUNT
    })
}


export const getTops = () => (dispatch, getState) => {
    axios
    .get('/api/tops/', tokenConfig(getState))
    .then(response => {
        dispatch({
            type: GET_TOPS,
            payload: response.data
        })
    })
    .catch(error =>  console.log(error))
}

export const getNotifications = () => (dispatch, getState) => {
    axios
    .get('/api/get-notifications/', tokenConfig(getState))
    .then(response => {
        dispatch({
            type: GET_NOTIFICATIONS,
            payload: response.data
        });
    })
    .catch(error =>  console.log(error))

}

export const addReport = (payload) => (dispatch, getState) => {
    dispatch({
        type: SET_LOADER
      });
    axios
    .post('/api/issue/', payload, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: SET_MESSAGE,
            payload: 'REPORTED'
        });
        dispatch({
            type: SET_LOADER
          });
    })
    .catch(error => console.log(error))
}

export const setLoader = () => (dispatch) =>{
    dispatch({
        type: SET_LOADER
      });
}