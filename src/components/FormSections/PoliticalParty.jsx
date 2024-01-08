import React, { useState } from "react";
import { Label, TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors } from '../HelperFunctions/ValidateField';
import DOMPurify from 'dompurify';
import FieldContainer from "../FieldContainer";

function PoliticalParty(props){
    const headings = props.headings;
    const state = props.stateData;
    const fields = props.fieldContent;
    const nvrfStateFields = props.stateData.nvrf_fields;
    const partyStateInstructions = DOMPurify.sanitize(state.political_party_inst);

    //Drupal field data
    const partyField = fields.find(item => item.uuid === "fd516f06-11bb-4c39-9080-735ed98100cc");
    const partyGeneralInstructions = DOMPurify.sanitize(partyField.instructions)

    //Field requirements by state data
    const partyFieldState = (nvrfStateFields.find(item => item.uuid === partyField.uuid));

    const [handleErrors, setHandleErrors] = useState({
        party_choice: false
    })

    const politicalPartyField =
        <TextInput
            id="political-party"
            className="radius-md"
            aria-describedby="party-choice-error"
            name="political party"
            value={props.fieldData.party_choice}
            type="text"
            autoComplete="off"
            required={partyFieldState.required}
            onChange={props.saveFieldData('party_choice')}
            onKeyDown={(e) => restrictType(e, 'letters')}
            onBlur={(e) => setHandleErrors({ ...handleErrors, party_choice: checkForErrors(e, 'check value exists') })}
        />        

    return (
        <>
        <h2>{headings.step_label_4}</h2>
        {(partyStateInstructions || partyGeneralInstructions) && (
        <div className="usa-alert usa-alert--info" role="alert">
            <div className="usa-alert__body" dangerouslySetInnerHTML= {{__html: partyGeneralInstructions}}/>
            <div className="usa-alert__body" dangerouslySetInnerHTML= {{__html: partyStateInstructions}}/>
        </div>)}

        {partyFieldState && (
                <FieldContainer 
                    inputField={politicalPartyField}
                    label={partyField.name}
                    fieldRequired={partyFieldState.required}
                    classes={'margin-top-6'}
                    htmlFor={"political-party"}
                    showError={((partyFieldState.required === "1") && handleErrors.party_choice)}
                    errorId={"party-choice-error"}
                    errorMsg={partyField.error_msg}
                />
        )}
        </>
    );
}

export default PoliticalParty;