import React, { useState, useEffect } from "react";
import { Label, TextInput, Button } from '@trussworks/react-uswds';
import { fetchData } from "../HelperFunctions/JsonHelper.jsx";
import { restrictType, checkForErrors } from '../HelperFunctions/ValidateField';

function PoliticalParty(props){
    const [content, setContent] = useState()
    useEffect(() => {
        fetchData("registration-form.json", setContent);
    }, []);

    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const stateInstructions = props.stateData.state_field_instructions;

    const partyVisible = stateFieldVisible.party;
    const partyReq = stateFieldRequirements.party

    const [handleErrors, setHandleErrors] = useState({
        party_choice: false
    })

    return (
        <>
        <h2>{content.political_party_heading}</h2>
        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{content.party_text}</p>
                <p>{stateInstructions.party_text}</p>
            </div>
        </div>

        {partyVisible && (
            <div className={(partyReq && handleErrors.party_choice) ? 'error-container' : ''}>
                <Label htmlFor="political-party">
                Choice of party{partyReq && <span className='required-text'>*</span>}
                <TextInput
                    id="political-party"
                    aria-describedby="party-choice-error"
                    name="political party"
                    value={props.fieldData.party_choice}
                    type="text"
                    autoComplete="off"
                    required={partyReq}
                    onChange={props.saveFieldData('party_choice')}
                    onKeyDown={(e) => restrictType(e, 'letters')}
                    onBlur={(e) => setHandleErrors({ ...handleErrors, party_choice: checkForErrors(e, 'check value exists') })}
                />
                {(partyReq && handleErrors.party_choice) &&
                    <span id="party-choice-error" role="alert" className='error-text'>
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