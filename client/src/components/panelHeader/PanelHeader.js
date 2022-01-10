import React from 'react';

const PanelHeader = (props) => {
    return <div
        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{props.head}</h1>
        {props.child && <div className="btn-toolbar mb-2 mb-md-0"> {props.child} </div>}
    </div>

};

export default PanelHeader;