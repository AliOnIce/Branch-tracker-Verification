import React from 'react';
import {CHANGE_DAILY_SALE_BRANCH_DATA} from "../../../../redux/actions/types";

const BranchInputsComponent = (props) => {

    const {branchName, totalSale} = props.branch;

    const handleChange = (e) => {
        props.dispatch(
            {
                type: CHANGE_DAILY_SALE_BRANCH_DATA,
                payload: {index: props.index, propName: e.target.name, value: +e.target.value}
            }
        )
    }

    return <>
        <tr>
            <td className="align-middle">{branchName}</td>
            <td className="align-middle">
                <input type="number" className="form-control" name="totalSale"
                       min={0}
                       placeholder="Toplam Satış"
                       defaultValue={totalSale}
                       step=".001"
                       onChange={handleChange} required/>
            </td>
        </tr>
    </>
};

export default BranchInputsComponent;