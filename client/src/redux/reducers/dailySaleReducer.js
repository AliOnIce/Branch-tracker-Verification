import {
    CHANGE_DAILY_SALE_BRANCH_DATA,
    FETCH_DAILY_SALE_FULFILLED,
    FETCH_DAILY_SALE_PENDING,
    FETCH_DAILY_SALE_REJECT, PUT_DAILY_SALE_FULFILLED, PUT_DAILY_SALE_REJECT
} from "../actions/types";

const dailySaleReducer = (state= {}, action) => {
    switch (action.type){
        case FETCH_DAILY_SALE_PENDING:{
            return {
                ...state,
                loading: true,
                okMessage: undefined,
                error: undefined
            }
        }
        case FETCH_DAILY_SALE_FULFILLED: {
            return {
                ...state,
                loading: false,
                error: undefined,
                dailySale: action.payload
            }
        }
        case FETCH_DAILY_SALE_REJECT: {
            return {
                ...state,
                loading: false,
                okMessage: undefined,
                error: action.payload,
                dailySale:{}
            }
        }
        case CHANGE_DAILY_SALE_BRANCH_DATA: {
            let dailySale = state.dailySale;
            let current = dailySale.salesByBranches[action.payload.index];
            current = {...current, [action.payload.propName]:action.payload.value};
            dailySale.salesByBranches[action.payload.index] = current;

            return {
                ...state,
                loading: false,
                error: undefined,
                okMessage: undefined,
                dailySale: dailySale
            }
        }
        case PUT_DAILY_SALE_FULFILLED: {
            return {
                ...state,
                loading: false,
                okMessage: action.payload,
                error: undefined,
            }
        }
        case PUT_DAILY_SALE_REJECT: {
            return {
                ...state,
                loading: false,
                okMessage: undefined,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    };
};

export default dailySaleReducer;