import React, { useState } from "react";
import { Label, TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors } from '../HelperFunctions/ValidateField';

function PoliticalParty(props){
    const content = props.content;
    const fields = props.fieldContent;
    const stateInstructions = props.stateData.state_field_instructions;
    const nvrfStateFields = props.stateData.nvrf_fields;


    //Drupal field data
    const partyField = fields.find(item => item.uuid === "fd516f06-11bb-4c39-9080-735ed98100cc");

    //Field requirements by state data
    const partyFieldState = (nvrfStateFields.find(item => item.uuid === partyField.uuid));
    console.log(partyFieldState.required);

    const [handleErrors, setHandleErrors] = useState({
        party_choice: false
    })

    return (
        <>
        <h2>{content.political_party_heading}</h2>
        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{content.party_text}</p>
                <p>{"The state party text will go here."}</p>
            </div>
        </div>

        {partyFieldState && (
            <div className={(partyFieldState.required && handleErrors.party_choice) ? 'error-container' : ''}>
                <Label className="text-bold" htmlFor="political-party">
                {partyField.name}{partyFieldState.required && <span className='required-text'>*</span>}
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
                {(partyFieldState.required && handleErrors.party_choice) &&
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