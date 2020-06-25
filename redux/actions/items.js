import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_ERRORS, SET_MESSAGE } from './types';
import { tokenConfig } from './auth';


// GET ITEMS

export const getItems = () => (dispatch, getState) =>{
axios.get('/api/posts/', tokenConfig(getState))
    .then(res=>
        {
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            });
        })
    .catch(err => console.log(err))
}

// ADD ITEM

export const addItem = (payload) => (dispatch, getState) =>{
    
axios.post('/api/posts/', payload, tokenConfig(getState))
    .then(res=>
        {
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            });

            dispatch({
                type: SET_MESSAGE,
                payload: "ITEM ADDED"
            });
        })
    .catch(err => {
        const errors = {
        msg: err.response.data,
        status: err.response.status
    }
    dispatch({
        type: GET_ERRORS,
        payload: errors
    });
}
    )
}

// DELETE ITEM

export const deleteItem = (id) => (dispatch, getState) =>{

axios.delete(`/api/posts/${id}/`, tokenConfig(getState))
    .then(res=>
        {
            dispatch({
                type: SET_MESSAGE,
                payload: "ITEM DELETED"
            });
        })
    .catch(err => console.log(err))
}