import { useState, useEffect } from 'react';
import { Button } from '@trussworks/react-uswds';
import ByMailReg from "./RegTypes/ByMailReg";
import OnlineReg from "./RegTypes/OnlineReg";
import NotNeededReg from "./RegTypes/NotNeededReg";

function Eligibility(props) {
    const regType = props.stateData.reg_type;

    return (
        <>
        <Button type="button" onClick={props.handlePrev}>
        Back to State Registration Options
        </Button>
        {regType === 'online' &&
            <OnlineReg
            state={props.state}
            stateData={props.stateData}
            handleNext={props.handleNext}
            handleCheckbox={props.handleCheckbox}
            checkBoxValues={props.checkBoxValues}
            checkboxes={props.checkboxes}
            />}
        {regType === 'in-person' &&
            <ByMailReg
            state={props.state}
            stateData={props.stateData}
            handleNext={props.handleNext}
            handleCheckbox={props.handleCheckbox}
            checkBoxValues={props.checkBoxValues}
            checkboxes={props.checkboxes}
        />}
        {regType === 'not-needed' &&
            <NotNeededReg
            state={props.state}
            stateData={props.stateData}
            handleNext={props.handleNext}/>}
        </>
    );
}

export default Eligibility;