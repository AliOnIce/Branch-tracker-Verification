import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {Alert, FormGroup} from "reactstrap";
import {login} from "../../redux/actions/authAction";
import {useDispatch, useSelector} from "react-redux";
import styles from './LoginForm.module.css';


const LoginForm = (props) => {
    const {user, token, error, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {register, errors, handleSubmit} = useForm();

    const handleSubmitAction = values => {
        const {username, password} = values;
        if (username && password)
            dispatch(login(username, password));
    }

    useEffect(() => {
        if (token) {
            if (user.usertype > 0) {
                props.history.push("/userPanel");
            } else {
                props.history.push("/controlPanel");
            }
        }
    }, [token, props.history, user.usertype]);

    return <>
        <div className={styles.cont}>

            <form className={styles.form_sign_in} onSubmit={handleSubmit(handleSubmitAction)}>
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Branch Tracker</h1>
                    {error && <Alert color="danger"> {errorMessage} </Alert>}
                </div>
                <FormGroup>
                    <input type="text" name="username" placeholder="Kullanıcı Adı"
                           className={`form-control ${errors.username ? "is-invalid" : ""}`}
                           ref={register({required: true, validate: value => value.length > 3})}/>
                </FormGroup>
                <FormGroup>
                    <input type="password" name="password" placeholder="Şifre"
                           className={`form-control ${errors.password ? "is-invalid" : ""}`}
                           ref={register({required: true, validate: value => value.length > 3})}/>
                </FormGroup>
                <button type="submit" className="btn btn-lg btn-primary btn-block">Giriş Yap</button>
            </form>
        </div>
    </>

};

export default LoginForm;