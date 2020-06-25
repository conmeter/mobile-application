import { GET_WEBS, ADD_WEB, GET_WEB_DETAILS, REMOVE_WEB_DETAILS, SET_LOADER, GET_ERRORS, SET_MESSAGE } from './types';
import {tokenConfig} from './auth';
import axios from 'axios';


export const getItems = () => (dispatch, getState) =>
{
    axios
    .get('/api/webs/', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_WEBS,
            payload: res.data
        });
    })
    .catch(error =>  console.log(error)) 

}

export const getWebDetails = (webName) => (dispatch, getState) =>
{
    dispatch({
        type: SET_LOADER
      });
    const payload = { web_url : webName}
    axios
    .get('/api/webs-post/', tokenConfig(getState, payload))
    .then(response => {
        dispatch({
            type: GET_WEB_DETAILS,
            payload: response.data
        });
        dispatch({
            type: SET_LOADER
          });

    })
    .catch(error => console.log(error))
}

export const removeWebDetails = () => (dispatch, getState) =>
{
    dispatch({
        type: REMOVE_WEB_DETAILS
    })
}

export const addWeb = (payload) => (dispatch, getState) =>
{

    dispatch({
        type: SET_LOADER
      });

axios.post('/api/add-web/', payload, tokenConfig(getState))
.then(response => {
    dispatch({
        type: ADD_WEB,
        payload: response.data
    });
    dispatch({
        type: SET_LOADER
      });
    dispatch({
        type: SET_MESSAGE,
        payload: 'WEBSITE ADDED'
    })
})
.catch(err => {
    const error ={
        msg: err.response.data,
        status: err.response.status
      };
      console.log(error)
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
      dispatch({
        type: SET_LOADER
      });
})
}