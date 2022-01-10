import { combineReducers } from 'redux';

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import dailySaleReducer from "./dailySaleReducer";
import {LOGOUT} from "../actions/types";
import dailySaleAdminReducer from "./dailySaleAdminReducer";

const rootReducer = (state, action) => {
    if (action.type === LOGOUT){
        state = undefined;
    }

    return combineReducers({
        auth: authReducer,
        users: usersReducer,
        dailySale:dailySaleReducer,
        dailySaleAdmin:dailySaleAdminReducer
    })(state ,action);
};

export default rootReducer;