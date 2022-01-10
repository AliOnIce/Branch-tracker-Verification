import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Alert, Button} from "reactstrap";
import CenteredSpinner from "../../spinner/CenteredSpinner";
import {fillUsers, deleteUserBranch, deleteUser} from "../../../redux/actions/usersActions";
import AddUserComponent from "./AddUserComponent";
import AddBranchComponent from "./AddBranchComponent";
import PanelHeader from "../../panelHeader/PanelHeader";

const UsersComponent = () => {
    const {loading, error, users} = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fillUsers());

    }, [dispatch]);

    const deleteBranchAction = (userId, branchId) => {
        dispatch(deleteUserBranch(userId, branchId));
    };

    const deleteUserAction = (id) => {
        dispatch(deleteUser(id));
    }

    return <>
        {error && <Alert color="danger" className="mt-2"> {error} </Alert>}
        <PanelHeader head="Kullanıcılar" />

        {loading ? <CenteredSpinner/> : <>
            <AddUserComponent dispatch={dispatch}/>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">İsim Soyisim</th>
                    <th scope="col">Bölge</th>
                    <th scope="col">Kullanıcı Adı</th>
                    <th scope="col">Şifre</th>
                    <th scope="col">Şubeler</th>
                    <th scope="col"/>
                </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    return <tr key={user._id}>
                        <td className="align-middle">{user.nameSurname}</td>
                        <td className="align-middle">{user.regionName}</td>
                        <td className="align-middle">{user.username}</td>
                        <td className="align-middle">{user.password}</td>
                        <td>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Adı</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan="3"><AddBranchComponent user={user} dispatch={dispatch}/></td>
                                </tr>
                                {user.branches.map(branch => {
                                    return <tr key={branch._id}>
                                        <td>{branch.branchNo}</td>
                                        <td>{branch.branchName}</td>
                                        <td width="20%" className="text-center"><Button color="danger"
                                                    onClick={()=>deleteBranchAction(user._id, branch._id)}>Sil</Button></td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </td>
                        <td className="align-middle text-center">
                            <Button color="danger" onClick={()=> deleteUserAction(user._id)}>Sil</Button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>


        </>
        }
    </>
};

export default UsersComponent;