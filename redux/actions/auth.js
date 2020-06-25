import axios from 'axios';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, 
  LOGIN_SUCCESS, REGISTRATION_FAIL, REGISTRATION_SUCCESS, 
  GET_ERRORS, LOGOUT_USER,  SET_LOADER, CHANGE_PROFILE_PIC, SET_MESSAGE, CHANGE_STATE } from './types';


export const loadUser = () => (dispatch, getState) =>{
    dispatch({type: USER_LOADING});

    const token = getState().auth.token;

    const config = {
        header:{
            'Content-Type': 'application/json'
        }
    }

    if(token){
        config.header['Authorization'] = `Token ${token}`;
    }
    dispatch({
      type: SET_LOADER
    });
    axios.get('/auth/user/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
            dispatch({
              type: SET_LOADER
            });
        })
        .catch(error => {
            dispatch({
                type: AUTH_ERROR
            });
            dispatch({
              type: SET_LOADER
            });
        })
} 


export const login = (email, password) => (dispatch) =>{
    // Headers
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      // Request Body
      const body = JSON.stringify({ email, password });

      dispatch({
        type: SET_LOADER
      });
    
      axios
        .post('/auth/login/', body, config)
        .then((res) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          });
          dispatch({
            type: SET_LOADER
          });
        })
        .catch((err) => {
          dispatch({
            type: LOGIN_FAIL,
          });
          dispatch({
            type: SET_LOADER
          });
          const error ={
            msg: err.response.data,
            status: err.response.status
          };
          dispatch({
            type: GET_ERRORS,
            payload: error
          });
        })
    
} 

export const reg = (payload) => (dispatch) =>{
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  dispatch({
    type: SET_LOADER
  });

  console.log(payload)

  axios
  .post('/auth/register/', payload, config)
  .then((res) => {
    console.log(res.data)
    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: SET_LOADER
    });
  })
  .catch((err) => {
    dispatch({
      type: REGISTRATION_FAIL,
    });
    const error ={
      msg: err.response.data,
      status: err.response.status
    };
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
    dispatch({
      type: SET_LOADER
    });
  })

}

export const logout = () => (dispatch, getState) =>{

  dispatch({
    type: SET_LOADER
  });
  axios.post('/auth/logout/', null, tokenConfig(getState))
    .then(
      res =>{
      dispatch({
        type: LOGOUT_USER
      });
      dispatch({
        type: SET_LOADER
      });
    }
    )
    .catch(err=>{console.log(err)
      dispatch({
        type: SET_LOADER
      });
    })
}

export const tokenConfig = (getState, payload) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    params:null,
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  if (payload)
  {
    config.params = payload;
  }
  return config;
};

export const changeProfilePic = (uri) => (dispatch, getState) => {
  dispatch({
    type: SET_LOADER
  });
  
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  axios.patch('/auth/user/', formData, config)
    .then(response => {
      dispatch({
        type: CHANGE_PROFILE_PIC,
        payload: response.data
      });
      dispatch({
        type: SET_LOADER
      });
    })
    .catch(error => {console.log(error);
      dispatch({
        type: SET_LOADER
      });
    })    
} 


export const otpGen = () => (dispatch, getState) => {

  axios.get('/api/otp/', tokenConfig(getState))
  .then(response => {
    dispatch({
      type: SET_MESSAGE,
      payload: response.data['status']
    })
  })
  .catch(err => console.log(err))

}

export const ckOTP = (payload) => (dispatch, getState) => {

  axios.post('/api/otp/', payload, tokenConfig(getState))
  .then(response => {
    if(response.data['status'] === "success")
    {
      dispatch({
        type: SET_MESSAGE,
        payload: "Phone verified"
      })
      dispatch({
        type: CHANGE_STATE
      })
    }
    else{
      dispatch({
        type: SET_MESSAGE,
        payload: "WRONG OTP"
      })
    }
  })
  .catch(error => console.log(error))  

}