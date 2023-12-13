import React, { useState } from "react";
import { Label, TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors } from '../HelperFunctions/ValidateField';
import DOMPurify from 'dompurify';

function PoliticalParty(props){
    const headings = props.headings;
    const content = props.content;
    const state = props.stateData;
    const fields = props.fieldContent;
    const nvrfStateFields = props.stateData.nvrf_fields;
    const partyStateInstructions = DOMPurify.sanitize(state.political_party_inst);

    //Drupal field data
    const partyField = fields.find(item => item.uuid === "fd516f06-11bb-4c39-9080-735ed98100cc");

    //Field requirements by state data
    const partyFieldState = (nvrfStateFields.find(item => item.uuid === partyField.uuid));

    const [handleErrors, setHandleErrors] = useState({
        party_choice: false
    })

    return (
        <>
        <h2>{headings.step_label_4}</h2>
        {partyStateInstructions && (
        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body" dangerouslySetInnerHTML= {{__html: partyStateInstructions}}/>
        </div>)}

        {partyFieldState && (
            <div className={(parseInt(partyFieldState.required) && handleErrors.party_choice) ? 'error-container' : ''}>
                <Label className="text-bold" htmlFor="political-party">
                {partyField.name}{(partyFieldState.required === "1") && <span className='required-text'>*</span>}
                <TextInput
                    id="political-party"
                    className="radius-md"
                    aria-describedby="party-choice-error"
                    name="political party"
                    value={props.fieldData.party_choice}
                    type="text"
                    autoComplete="off"
                    required={parseInt(partyFieldState.required)}
                    onChange={props.saveFieldData('party_choice')}
                    onKeyDown={(e) => restrictType(e, 'letters')}
                    onBlur={(e) => setHandleErrors({ ...handleErrors, party_choice: checkForErrors(e, 'check value exists') })}
                />
                {((partyFieldState.required === "1") && handleErrors.party_choice) &&
                    <span id="party-choice-error" role="alert" className='error-text text-bold'>
                        Choice of party must be filled out.
                    </span>
                }
                </Label>
            </div>
        )}
        </>
    );
}

export default PoliticalParty;