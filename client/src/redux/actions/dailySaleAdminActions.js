import {FETCH_ALL_DAILY_SALE_FULFILLED, FETCH_ALL_DAILY_SALE_PENDING, FETCH_ALL_DAILY_SALE_REJECT} from "./types";
import axios from "axios";
import moment from "moment";


export const fetchAllDailySalesInDate = (date) => {
    return dispatch => {
        dispatch({type: FETCH_ALL_DAILY_SALE_PENDING});
        axios.get(`/dailySale/all/${moment(date).format("yyyy-MM-DD")}`).then(res => {
            dispatch({type: FETCH_ALL_DAILY_SALE_FULFILLED, payload: res.data});
        }).catch(error => {
            if (error.response) {
                let {message} = error.response.data;
                if (message)
                    dispatch({type: FETCH_ALL_DAILY_SALE_REJECT, payload: message});
            } else {
                dispatch({type: FETCH_ALL_DAILY_SALE_REJECT, payload: "Please report admin!"});
            }
        });

    };
}