import React from 'react';
import {Spinner} from "reactstrap";

const CenteredSpinner = () => {
    return <>
        <div className="d-flex justify-content-center">
            <Spinner style={{width:"6rem", height:"6rem"}} color="primary"/>
        </div>
    </>
};

export default CenteredSpinner;