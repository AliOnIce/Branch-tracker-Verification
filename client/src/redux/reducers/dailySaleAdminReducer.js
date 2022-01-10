import {
    FETCH_ALL_DAILY_SALE_FULFILLED,
    FETCH_ALL_DAILY_SALE_PENDING,
    FETCH_ALL_DAILY_SALE_REJECT
} from "../actions/types";

const initialState = {
    loading: false,
    error: undefined,
    dailySales: []
}

const dailySaleAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_DAILY_SALE_PENDING: {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        }
        case FETCH_ALL_DAILY_SALE_FULFILLED: {
            return {
                ...state,
                loading: false,
                error: undefined,
                dailySales:action.payload
            }
        }
        case FETCH_ALL_DAILY_SALE_REJECT: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }

    }
};

export default dailySaleAdminReducer;