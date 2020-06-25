import { GET_WEBS, ADD_WEB, GET_WEB_DETAILS, REMOVE_WEB_DETAILS } from '../actions/types';

const initialState = {
    items : [],
    webs: {},
    posts: [],
    totals: []
}

export default function(state = initialState, action){
    switch(action.type){

        case GET_WEBS:
            return{
                ...state,
                items: action.payload
            }

        case GET_WEB_DETAILS:
            return{
                ...state,
                webs: action.payload.web[0],
                posts: action.payload.posts,
                totals: action.payload.rating
            }
        
        case REMOVE_WEB_DETAILS:
            return{
                ...state,
                webs:{},
                posts:[],
                totals:[]
            }

        case ADD_WEB:
            return{
                ...state,
                items: state.items.push(action.payload)
            }
        

        default:
            return state
    }
}