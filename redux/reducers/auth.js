import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, CHANGE_STATE, 
    REGISTRATION_FAIL, REGISTRATION_SUCCESS, LOGOUT_USER, CHANGE_PROFILE_PIC} from '../actions/types'
import {AsyncStorage} from 'react-native';

const initialState = {
    token: AsyncStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    reg: false,
}


export default function(state = initialState, action){
    switch(action.type){
        
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            }

        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }

        case AUTH_ERROR:
            AsyncStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            }

        case LOGIN_FAIL:
            AsyncStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            }
        
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('token', action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }

        case REGISTRATION_FAIL:
            AsyncStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }
        
        case REGISTRATION_SUCCESS:
            AsyncStorage.setItem('token', action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false,
                reg: true,
            }
        
        case LOGOUT_USER:
            AsyncStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }

        case CHANGE_PROFILE_PIC:
            return{
                ...state,
                user: action.payload
            }
        case CHANGE_STATE:
            return{
                ...state,
                isAuthenticated: true
            }

        default:
            return state
    }
}