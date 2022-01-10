import {
    FETCH_USERS_FULFILLED,
    FETCH_USERS_PENDING,
    FETCH_USERS_REJECT,
    PUT_USER_FULFILLED,
    PUT_USER_PENDING,
    PUT_USER_REJECT
} from "../actions/types";

const initialState = {
    users: [],
    loading: false,
    error: undefined,
    updateLoading: "",
    updateError: {},
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_PENDING: {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        }
        case FETCH_USERS_FULFILLED: {
            return {
                ...state,
                loading: false,
                error: undefined,
                updateLoading: "",
                updateError: {},
                users: action.payload
            }
        }
        case FETCH_USERS_REJECT: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case PUT_USER_PENDING: {
            return {
                ...state,
                updateLoading: action.payload,
                updateError: {}
            }
        }
        case PUT_USER_FULFILLED: {
            /*let putUser = action.payload;
            let users = state.users;
            let index = state.users.findIndex(user => user._id === putUser._id)
            if (index !== -1)
                users = state.users[index] = putUser;*/

            return {
                ...state,
                updateLoading: "",
                updateError: {},
                users: action.payload
            }
        }
        case PUT_USER_REJECT: {
            return {
                ...state,
                updateLoading: "",
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
};

export default usersReducer;