import {combineReducers} from 'redux';

import user from './user';
import post from './post';
import auth from './auth';
import alert from './alert';

export default combineReducers({user, post, auth, alert});
