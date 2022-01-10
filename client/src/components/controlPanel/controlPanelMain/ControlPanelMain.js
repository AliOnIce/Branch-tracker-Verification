import React, {useState} from 'react';
import PanelHeader from "../../panelHeader/PanelHeader";
import Datepicker from 'react-datepicker';
import DailySalesInDay from "../dailySalesInDay";

const ControlPanelMain = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const datepicker = <Datepicker className="mr-5" selected={selectedDate} onChange={date => setSelectedDate(date)}
                                   dateFormat="dd/MM/yyyy"/>;

    return <>
        <PanelHeader head="Günlük Rapor" child={datepicker}/>
        <DailySalesInDay date={selectedDate}/>

    </>
};

export default ControlPanelMain;