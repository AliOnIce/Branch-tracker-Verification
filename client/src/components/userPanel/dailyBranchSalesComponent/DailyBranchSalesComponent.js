import React, {useEffect} from 'react';
import PanelHeader from "../../panelHeader/PanelHeader";
import 'react-datepicker/dist/react-datepicker.min.css';
import {useDispatch, useSelector} from "react-redux";
import BranchInputsComponent from "./branchInputsComponent/BranchInputsComponent";
import {Alert, Button} from "reactstrap";
import CenteredSpinner from "../../spinner/CenteredSpinner";
import {fillDailySale, putDailySale} from "../../../redux/actions/dailySaleActions";

const DailyBranchSalesComponent = () => {
    const {loading, okMessage, error, dailySale} = useSelector(state => state.dailySale);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fillDailySale(new Date()));
    }, [/*selectedDate*/dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(putDailySale(dailySale));
    };

    return <>
        <PanelHeader head="Günlük Gelir Bildirisi" />
        {error && <Alert color="danger" className="mt-2"> {error} </Alert>}
        {okMessage && <Alert color="success" className="mt-2"> {okMessage} </Alert>}

        {loading ? <CenteredSpinner/> : <>
            <form onSubmit={handleSubmit}>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Şube</th>
                        <th scope="col">Topam Satış</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dailySale && dailySale.salesByBranches && dailySale.salesByBranches.map((branch, index) => {
                        return <BranchInputsComponent index={index} key={index} branch={branch} dispatch={dispatch}/>
                    })}
                    <tr>
                        <td colSpan="5" className="text-center">
                            <Button color="primary" type="submit"> Kaydet</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </>}


    </>
};

export default DailyBranchSalesComponent;