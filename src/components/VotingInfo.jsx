import { useState, useEffect } from 'react';
import { Button } from '@trussworks/react-uswds';
import ByMail from "./RegTypes/ByMail";
import Online from "./RegTypes/Online";
import NotNeeded from "./RegTypes/NotNeeded";

function VotingInfo(props) {
    const regType = props.stateData.reg_type;

    return (
        <>
        <Button type="button" onClick={props.handlePrev}>
            Back to Choose your State
        </Button>
        {regType === 'online' &&
            <Online
            state={props.state}
            stateData={props.stateData}
            handleNext={props.handleNext}
            handleCheckbox={props.handleCheckbox}
            checkBoxValues={props.checkBoxValues}
            checkboxes={props.checkboxes}
            />}
        {regType === 'in-person' &&
            <ByMail
            state={props.state}
            stateData={props.stateData}
            handleNext={props.handleNext}
            handleCheckbox={props.handleCheckbox}
            checkBoxValues={props.checkBoxValues}
            checkboxes={props.checkboxes}
        />}
        {regType === 'not-needed' &&
            <NotNeeded
            state={props.state}
            stateData={props.stateData}
            handleNext={props.handleNext}/>}
        </>
    );
}

export default VotingInfo;