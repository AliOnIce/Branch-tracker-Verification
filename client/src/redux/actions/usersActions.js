import {
    FETCH_USERS_FULFILLED,
    FETCH_USERS_PENDING,
    FETCH_USERS_REJECT,
    PUT_USER_PENDING,
    PUT_USER_REJECT
} from "./types";
import axios from "axios";


const fetchUsers = () => {
    return {
        type: FETCH_USERS_PENDING
    };
};

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_FULFILLED,
        payload: users
    };
};

const fetchUsersError = error => {
    return {
        type: FETCH_USERS_REJECT,
        payload: error
    };
};

export const fillUsers = () => {
    return dispatch => {
        dispatch(fetchUsers());
        axios.get("/user/getAll").then(res => {
            dispatch(fetchUsersSuccess(res.data));
        }).catch((error) => {
            if (error.response) {
                let {message} = error.response.data;
                if (message)
                    dispatch(fetchUsersError(message));
            } else {
                dispatch(fetchUsersError("Please report admin!"));
            }
        });
    };
};

export const registerUser = (body) => { //nameSurname, username, password
    return dispatch => {
        console.log(body);
        dispatch(fetchUsers());
        axios.post("/user/register", body).then(() => {
            dispatch(fillUsers());
        }).catch((error) => {
            if (error.response) {
                let {message} = error.response.data;
                if (message)
                    dispatch(fetchUsersError(message));
            } else {
                dispatch(fetchUsersError("Please report admin!"));
            }
        });
    };
};


const putUserPending = (id) => {
  return {
      type: PUT_USER_PENDING,
      payload:id
  }
};


const putUserError = (error) => {
    return {
        type: PUT_USER_REJECT,
        payload:error
    }
};

export const updateUser = (user) => {
    return dispatch => {
        let id = user._id;
        dispatch(putUserPending(id));
        axios.put(`/user/update/${id}`, user).then(() => {
            dispatch(fillUsers());
        }).catch(error => {
            if (error.response) {
                let {message} = error.response.data;
                if (message)
                    dispatch(putUserError(message));
            } else {
                dispatch(putUserError("Please report admin!"));
            }
        });
    };
};

export const updateUserBranches = (id, branches) => {
    return dispatch => {
        dispatch(putUserPending(id));
        axios.put(`/user/update/${id}/branch`, branches).then(() => {
            dispatch(fillUsers());
        }).catch(error => {
            if (error.response) {
                let {message} = error.response.data;
                if (message)
                    dispatch(putUserError(message));
            } else {
                dispatch(putUserError("Please report admin!"));
            }
        });
    };
};

export const deleteUser = (id) => {
    return dispatch => {
        dispatch(fetchUsers());
        axios.delete(`/user/${id}`).then(() => {
            dispatch(fillUsers());
        }).catch(error => {
            if (error.response) {
                let {message} = error.response.data;
                if (message)
                    dispatch(fetchUsersError(message));
            } else {
                dispatch(fetchUsersError("Please report admin!"));
            }
        });
    };
};

export const deleteUserBranch = (userID, branchID) => {
    return dispatch => {
        dispatch(fetchUsers());
        axios.delete(`/user/${userID}/${branchID}`).then(() => {
            dispatch(fillUsers());
        }).catch(error => {
            if (error.response) {
                let {message} = error.response.data;
                if (message)
                    dispatch(fetchUsersError(message));
            } else {
                dispatch(fetchUsersError("Please report admin!"));
            }
        });
    };
};