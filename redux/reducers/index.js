import { combineReducers } from 'redux';
import auth from './auth';
import items from './items';
import webs from './webs';
import mis from './mis';
import profile from './profile';
import errors from './errors';
import loader from './loader';
import message from './message';

export default combineReducers({
    auth,
    items,
    webs,
    mis,
    profile,
    errors,
    loader,
    message
})