import { SET_MESSAGE } from '../actions/types';

const initialState ={
    msg: {}
}

export default function (state = initialState, action){
    switch(action.type)
    {
        case SET_MESSAGE:
            return{
                msg: action.payload
            };
            
        default:
            return state;
    }
}