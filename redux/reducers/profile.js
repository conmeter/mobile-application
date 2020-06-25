import { GET_PROFILE, REMOVE_PROFILE } from '../actions/types'

const initialState = {
    user: null,
    count: 0,
    likes: 0,
    posts: []
}

export default function(state=initialState, action){
    switch(action.type){

        case GET_PROFILE:
            return{
                ...state,
                user: action.payload.user[0],
                count: action.payload.count.count,
                likes: action.payload.likes.sum_h,
                posts: action.payload.posts
            }
        
        case REMOVE_PROFILE:
            return{
                ...state,
                user: null,
                count: 0,
                likes: 0,
                posts: []
            }

        default:
            return state
    }
}