import React from "react";
import { Label, TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors, toggleError } from '../HelperFunctions/ValidateField';
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";

function PoliticalParty(props){
    const headings = props.headings;
    const state = props.stateData;
    const fields = props.fieldContent;
    const nvrfStateFields = props.stateData.nvrf_fields;
    const partyStateInstructions = sanitizeDOM(state.political_party_inst);

    //Drupal field data
    const partyField = fields.find(item => item.uuid === "fd516f06-11bb-4c39-9080-735ed98100cc");
    const partyGeneralInstructions = sanitizeDOM(partyField.instructions)

    //Field requirements by state data
    const partyFieldState = (nvrfStateFields.find(item => item.uuid === partyField.uuid));

    return (
        <>
        <h2>{headings.step_label_4}</h2>

        {(partyStateInstructions || partyGeneralInstructions) && (
        <div className="usa-alert usa-alert--info" role="region" aria-live="polite">
            <div className="usa-alert__body">
                <div className="usa-alert__text" dangerouslySetInnerHTML={{__html: partyStateInstructions}}/>
            </div>
        </div>)}

        {partyFieldState && (
            <>
            <div className="input-parent">
                <Label className="text-bold" htmlFor="political-party">
                    {partyField.name}{(partyFieldState.required === "1") && <span className='required-text'>*</span>}
                </Label>
                <span className="usa-hint" id="political-party_hint">{partyGeneralInstructions}</span>
                <TextInput
                    data-test="politicalParty"
                    id="political-party"
                    className="radius-md"
                    aria-describedby="political-party_error"
                    name="political-party"
                    value={props.fieldData.party_choice}
                    type="text"
                    autoComplete="off"
                    required={parseInt(partyFieldState.required)}
                    onChange={props.saveFieldData('party_choice')}
                    onKeyDown={(e) => restrictType(e, 'letters')}
                    onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                    onInput={(e) => e.target.setCustomValidity('')} 
                    />
                <span id="political-party_error" role="alert" className='error-text' data-test="errorText">
                    {partyField.error_msg}
                </span>
            </div>
            </>
        )}
        </>
    );
}

export default PoliticalParty;