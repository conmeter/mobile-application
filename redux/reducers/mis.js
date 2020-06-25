import { GET_COUNT, GET_LIKES, INCREMENT_COUNT, GET_TOPS, GET_NOTIFICATIONS } from '../actions/types'

const initialState = {
    likes: 0,
    count: 0,
    tops: [],
    notifications: [],
}

export default function(state = initialState, action)
{
    switch(action.type){

        case GET_COUNT:
            return{
                ...state,
                count: action.payload.count
            }
        
        case GET_LIKES:
            return{
                ...state,
                likes: action.payload.s_h
            }

        case INCREMENT_COUNT:
            return{
                ...state,
                count: state.count+1
            }

        case GET_TOPS:
            return{
                ...state,
                tops: action.payload
            }

        case GET_NOTIFICATIONS:
            return{
                ...state,
                notifications: action.payload
            }
        
        default:
            return state
    }
}