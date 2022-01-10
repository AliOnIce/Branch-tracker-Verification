import React, {useState} from 'react';
import {registerUser} from "../../../redux/actions/usersActions";

const AddUserComponent = (props) => {

    const [formState, setFormState] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const {nameSurname, regionName, username, password} = formState;
        if (nameSurname && regionName && username && password) {
            props.dispatch(registerUser({nameSurname, regionName, username, password}));
        }
    };

    const handleChange = (e) => {
        const target = e.target;
        setFormState((oldState) => {
            return {...oldState, [target.name]: target.value}
        });

    }

    return <>
        <form className="form-inline mb-5" onSubmit={handleSubmit}>
            <div className="form-group m-sm-1">
                <input type="text" name="nameSurname" id="exampleEmail" placeholder="İsim Soyisim"
                       className="form-control"
                       onChange={handleChange} required/>
            </div>
            <div className="form-group m-sm-1">
                <input type="text" name="regionName" id="exampleEmail" placeholder="Bölge Adı"
                       className="form-control"
                       onChange={handleChange} required/>
            </div>
            <div className="form-group m-sm-1">
                <input type="text" name="username" id="exampleEmail" placeholder="Kullanıcı Adı"
                       className="form-control"
                       onChange={handleChange} required/>
            </div>
            <div className="form-group m-sm-1">
                <input type="text" name="password" id="examplePassword" placeholder="Şifre"
                       className="form-control"
                       onChange={handleChange} required/>
            </div>
            <button type="submit" className="btn btn-primary m-sm-1">Ekle</button>
        </form>
    </>
};

export default AddUserComponent;