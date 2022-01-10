import React, {useState} from 'react';
import {updateUserBranches} from "../../../redux/actions/usersActions";


const AddBranchComponent = (props) => {

    const [branchNo, setBranchNo] = useState(null);
    const [branchName, setBranchName] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (branchNo && branchName) {
            props.dispatch(updateUserBranches(props.user._id, [{branchNo, branchName}]));
        }
    }


    return <>
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <input type="number" className="form-control" name="branchName"
                       placeholder="Şube No"
                       onChange={(event) => setBranchNo(event.target.value)}/>
                <input type="text" className="form-control" name="branchName"
                       placeholder="Şube Adı"
                       onChange={(event) => setBranchName(event.target.value)}/>
                <div className="input-group-append">
                    <button className="btn btn-primary" id="btn-add">Ekle</button>
                </div>
            </div>
        </form>
    </>
};

export default AddBranchComponent;