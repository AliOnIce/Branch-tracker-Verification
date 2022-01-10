import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllDailySalesInDate} from "../../redux/actions/dailySaleAdminActions";
import {Alert} from "reactstrap";
import CenteredSpinner from "../spinner/CenteredSpinner";
import {fillUsers} from "../../redux/actions/usersActions";

const DailySalesInDay = (props) => {
    const dispatch = useDispatch();
    const dailySaleState = useSelector(state => state.dailySaleAdmin);
    const usersState = useSelector(state => state.users);
    const [missingUsers, setMissingUsers] = useState([]);

    useEffect(() => {
        dispatch(fillUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllDailySalesInDate(props.date));
    }, [props.date]);

    useEffect(() => {
        if (dailySaleState.dailySales.length > 0 && usersState.users.length > 0) {
            let dsIDs = dailySaleState.dailySales.map(ds => {
                return ds.userID
            });

            setMissingUsers(
                usersState.users.filter(u => dsIDs.indexOf(u._id) === -1)
            );
        } else {
            setMissingUsers([]);
        }
    }, [dailySaleState.dailySales, usersState.users])

    const [total, setTotal] = useState(0)
    useEffect(() => {
        let tot = 0;

        dailySaleState.dailySales.forEach((dailySale) => {
            dailySale.salesByBranches.forEach(branchSale => {
                tot += branchSale.totalSale;
            })
        });

        setTotal(tot);
    }, [dailySaleState.dailySales])

    return <>
        {dailySaleState.error && <Alert color="danger" className="mt-2"> {dailySaleState.error} </Alert>}
        {usersState.error && <Alert color="danger" className="mt-2"> {usersState.error} </Alert>}
        {dailySaleState.loading || usersState.loading ? <CenteredSpinner/> : <>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Bölge</th>
                    <th scope="col">Şube No</th>
                    <th scope="col">Şube Adı</th>
                    <th scope="col">Toplam</th>
                </tr>
                </thead>
                <tbody>
                {dailySaleState.dailySales.map((dailySale) => {
                    return dailySale.salesByBranches.map(branchSale => {
                        return <tr key={branchSale._id}>
                            <td className="text-center">{dailySale.regionName}</td>
                            <td className="text-center">{branchSale.branchNo}</td>
                            <td className="text-center">{branchSale.branchName}</td>
                            <td className="text-center">{branchSale.totalSale}</td>
                        </tr>
                    })
                })}
                {missingUsers.map((mu) => {
                    return mu.branches.map(br => {
                        return <tr key={br._id} className="bg-dark text-white">
                            <td className="text-center"> {mu.regionName} </td>
                            <td className="text-center"> {br.branchNo} </td>
                            <td className="text-center"> {br.branchName} </td>
                            <td className="text-center"> 0</td>
                        </tr>
                    })
                })}
                <tr className="bg-primary text-white">
                    <td colSpan="3" className="text-center">Toplam</td>
                    <td className="text-center">{total} TL</td>
                </tr>
                </tbody>
            </table>
        </>}
    </>
};

export default DailySalesInDay;