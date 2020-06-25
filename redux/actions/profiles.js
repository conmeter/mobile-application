import { GET_PROFILE, REMOVE_PROFILE, SET_LOADER } from './types';
import { tokenConfig } from './auth';
import axios from 'axios';

export const getProfile = (user) => (dispatch, getState) =>{


    const payload = {user : user}
    const one = axios.get('/api/profile/', tokenConfig(getState, payload))
    const two = axios.get('/api/me-like/', tokenConfig(getState, payload))
    const three = axios.get('/api/me-count/', tokenConfig(getState, payload))
    const four = axios.get('/api/profile-posts/', tokenConfig(getState, payload))
    dispatch({
        type: SET_LOADER
      });

    axios.all([one, two, three, four])
    .then(axios.spread((...responses) => {
        const payload = {
            user: responses[0].data,
            likes: responses[1].data,
            count: responses[2].data,
            posts: responses[3].data
        }
        dispatch({
            type: GET_PROFILE,
            payload: payload
        });
        dispatch({
            type: SET_LOADER
          });
      })).catch(errors => {
        console.log(error)
        dispatch({
            type: SET_LOADER
          });
      })

}

export const removeProfile = () => (dispatch) =>{
    dispatch({
        type: REMOVE_PROFILE
    })
}