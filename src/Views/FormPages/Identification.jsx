import {Checkbox, Select, Fieldset} from '@trussworks/react-uswds';
import React from "react";
import {checkForErrors, toggleError} from 'Utils/ValidateField';
import {sanitizeDOM} from 'Utils/JsonHelper';
import DriversLicenseNumber from 'Components/Fields/DriversLicenseNumber';
import SSNPartial from 'Components/Fields/SSNPartial';
import SSNFull from 'Components/Fields/SSNFull';
import StateIDNum from 'Components/Fields/StateIDNum';

function Identification(props) {
  const stateData = props.stateData;
  const fields = props.fieldContent;
  const step = props.step;
  const nvrfStateFields = props.stateData.nvrf_fields;

  //Drupal field data
  const idTypeField = fields.find(item => item.uuid === "27d3a15c-f8c0-4035-9b0a-c2c0f674519c");
  const driverLicenseField = fields.find(item => item.uuid === "acd7f272-7a37-43f0-b51a-c78daf31e5fd");
  const stateIDField = fields.find(item => item.uuid === "e2da00fa-0f1b-4e98-9472-c00649266eb4");
  const ssnField = fields.find(item => item.uuid === "1e030197-52e7-426e-923c-b67ef521ae3b");
  const ssnFullField = fields.find(item => item.uuid === "fe8cf91e-f872-4ed7-848c-09c99a7d83c8");
  const noIdField = fields.find(item => item.uuid === "eb0ce8c5-b4f7-4aae-a0b9-84f0434d2edb");
  const idTypeFieldInstructions = sanitizeDOM(idTypeField.instructions);
  const idStateInstructions = sanitizeDOM(stateData.id_inst);
  const noIdFieldInstructions = sanitizeDOM(noIdField.instructions);

  //Field requirements by state data
  const driverIDFieldReq = (nvrfStateFields.find(item => item.uuid === driverLicenseField.uuid));
  const stateIDFieldDReq = (nvrfStateFields.find(item => item.uuid === stateIDField.uuid));
  const ssnFullFieldReq = (nvrfStateFields.find(item => item.uuid === ssnFullField.uuid));
  const ssnFieldReq = (nvrfStateFields.find(item => item.uuid === ssnField.uuid));
  const noIdFieldReq = (nvrfStateFields.find(item => item.uuid === noIdField.uuid));

  return (
    <>
      <h2>{step.step_label}</h2>

      {idStateInstructions && (
        <div id="id_alert" className="usa-alert usa-alert--info" role="region"
             aria-live="polite">
          <div className="usa-alert__body">
            <div className="usa-alert__text"
                 dangerouslySetInnerHTML={{__html: idStateInstructions}}/>
          </div>
        </div>)}

      {(stateData.abbrev === "mo") ? (
        <>
          <Fieldset>
            <Checkbox id="id-none" name="id-none" checked={props.hasNoID}
                      onChange={props.onChangeHasNoIdCheckbox}
                      label={noIdField.label}/>
          </Fieldset>
        </>
      ) : (
        <>
          <h3 className={'margin-top-5'}>{idTypeField.label}<span
            className='required-text'>*</span></h3>
          <div dangerouslySetInnerHTML={{__html: idTypeFieldInstructions}}/>
          <div className="input-parent">
            <Select
              id="id-selection"
              name="id-selection"
              aria-label={idTypeField.label}
              aria-describedby="id-selection_error"
              data-test="dropDown"
              value={props.idType}
              required={true}
              aria-invalid={false}
              onChange={(e) => props.saveIdType(e)}
              onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
              onInvalid={(e) => e.target.setCustomValidity(' ')}
              onInput={(e) => {
                e.target.setCustomValidity('');
                toggleError(e, false)
              }}
            >
              <React.Fragment key=".0">
                <option key="default"
                        value="">{idTypeField.options[0].key}</option>
                {(driverIDFieldReq) && <option key="driver-id-num"
                                               value="driver-id-num">{driverLicenseField.label}</option>}
                {(stateIDFieldDReq) && <option key="state-id-num"
                                               value="state-id-num">{stateIDField.label}</option>}
                {(ssnFullFieldReq) && <option key="ssn-full"
                                              value="ssn-full">{ssnFullField.label}</option>}
                {(ssnFieldReq) &&
                  <option key="ssn" value="ssn">{ssnField.label}</option>}
                {(noIdFieldReq) &&
                  <option key="id-none" value="none">{noIdField.label}</option>}
              </React.Fragment>
            </Select>
            <span id="id-selection_error" role="alert" aria-live="assertive"
                  className={'vote-error-text'} data-test="errorText">
              {props.idType === '' && stateIDField.error_msg}
            </span>
          </div>
        </>
      )}

      <div id="state-id" className="input-parent">
        {((props.idType === 'driver-id-num') || (props.idType === 'state-id-num') || ((stateData.abbrev === "mo") && (props.idType != "none"))) &&
          <>
            {((props.idType === 'driver-id-num') || (stateData.abbrev === "mo")) &&
              <>
                <DriversLicenseNumber {...props} />
              </>
            }
            {(props.idType === 'state-id-num') &&
              <>
                <StateIDNum {...props} />
              </>
            }
          </>}

        {((props.idType === 'ssn') || ((stateData.abbrev === "mo") && (props.idType != "none"))) &&
          <>
            <SSNPartial {...props} />
          </>}

        {props.idType === 'ssn-full' &&
          <>
            <SSNFull {...props} />
          </>}

        {props.idType === 'none' && (
          <div aria-live='polite' className={'margin-top-2'}
               dangerouslySetInnerHTML={{__html: noIdFieldInstructions}}/>
        )}
      </div>
    </>
  );
}

export default Identification;