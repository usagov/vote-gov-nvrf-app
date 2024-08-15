import React from "react";
import { Label, TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors, toggleError } from 'Utils/ValidateField';
import { sanitizeDOM } from "Utils/JsonHelper";
import PoliticalPartyInput from 'Components/Fields/PoliticalPartyInput';

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
        <div className="usa-alert usa-alert--info" role="region" aria-live="polite" aria-label="informative alert">
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
                
                <div className="usa-hint" id="political-party_hint" dangerouslySetInnerHTML={{__html: partyGeneralInstructions}}/>

                <PoliticalPartyInput {...props} />
            </div>
            </>
        )}
        </>
    );
}

export default PoliticalParty;