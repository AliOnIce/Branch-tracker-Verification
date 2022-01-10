import {
    FETCH_DAILY_SALE_FULFILLED,
    FETCH_DAILY_SALE_PENDING,
    FETCH_DAILY_SALE_REJECT,
    PUT_DAILY_SALE_FULFILLED,
    PUT_DAILY_SALE_REJECT
} from "./types";
import axios from "axios";
import moment from "moment";


const dailySaleLoading = () => {
    return {
        type: FETCH_DAILY_SALE_PENDING
    };
};

const fetchDailySaleSuccess = dailySale => {
    return {
        type: FETCH_DAILY_SALE_FULFILLED,
        payload: dailySale
    };
};

const fetchDailySaleError = error => {
    return {
        type: FETCH_DAILY_SALE_REJECT,
        payload: error
    };
};

export const fillDailySale = (date) => {
    return dispatch => {
        dispatch(dailySaleLoading());
        axios.get(`/dailySale/${moment(date).format("yyyy-MM-DD")}`).then(res => {
            dispatch(fetchDailySaleSuccess(res.data));
        }).catch(error => {
            if (error.response) {
                let {message} = error.response.data;
                if (message)
                    dispatch(fetchDailySaleError(message));
            } else {
                dispatch(fetchDailySaleError("Please report admin!"));
            }
        });
    };
};

const putDailySaleSuccess = message => {
    return {
        type: PUT_DAILY_SALE_FULFILLED,
        payload: message
    }
}

const putDailySaleError = error => {
    return {
        type: PUT_DAILY_SALE_REJECT,
        payload: error
    }
}

export const putDailySale = (dailySale) => {
    return dispatch => {
        dispatch(dailySaleLoading());
        axios.put('/dailySale', dailySale).then(() => {
            dispatch(putDailySaleSuccess("Başarı ile kayıt edildi"));
        }).catch(error => {
            if (error.response) {
                let {message} = error.response.data;
                if (message)
                    dispatch(putDailySaleError(message));
            } else {
                dispatch(putDailySaleError("Bir sorun oluştu daha sonra tekrar deneyiniz."));
            }
        });
    };
};
