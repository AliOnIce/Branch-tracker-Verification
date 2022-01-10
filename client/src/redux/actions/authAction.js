import {LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT} from "./types";
import axios from "axios";
import {setAuthorizationToken} from "../../helpers/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import {saveState} from "../../helpers/localStorage";

const loginSuccess = (user, token) => {
    return {
        type: LOGIN_SUCCESS,
        user,
        token
    };
};

const loginError = error => {
    return {
        type: LOGIN_ERROR,
        error
    };
};

export const login = (username, password) => {
    return dispatch => {
        axios.post("/user/login", {username, password})
            .then(res => {
                const {token} = res.data;
                setAuthorizationToken(token);
                saveState({
                    token:token
                });
                let user = jwtDecode(token);
                dispatch(loginSuccess(user, token));
            })
            .catch(err => {
                if (err.response) {
                    let {message} = err.response.data;
                    if (message)
                        dispatch(loginError(message));
                } else {
                    dispatch(loginError("Please report to admin!"));
                }

            });
    }
}

export const logout = () => {
    setAuthorizationToken(false);
    localStorage.removeItem("state");
    return {
        type: LOGOUT
    };
}