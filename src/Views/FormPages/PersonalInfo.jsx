import { Label, TextInput, Select, Checkbox, Grid, Fieldset } from '@trussworks/react-uswds';
import React from "react";
import { restrictType, checkForErrors, jumpTo, toggleError } from 'Utils/ValidateField';
import {sanitizeDOM} from "Utils/JsonHelper";
import CurrentFirstName from "Components/Fields/CurrentFirstName";
import CurrentSuffix from 'Components/Fields/CurrentSuffix';
import CurrentLastName from "Components/Fields/CurrentLastName";
import CurrentTitle from 'Components/Fields/CurrentTitle';
import CurrentMiddleName from 'Components/Fields/CurrentMiddleName';
import CurrentDateOfBirth from 'Components/Fields/CurrentDateOfBirth';
import PreviousMiddleName from 'Components/Fields/PreviousMiddleName';
import PreviousFirstName from 'Components/Fields/PreviousFirstName';
import PreviousTitle from 'Components/Fields/PreviousTitle';
import PreviousLastName from 'Components/Fields/PreviousLastName';
import CurrentPhoneNumber from 'Components/Fields/CurrentPhoneNumber';
import RaceEthnicity from 'Components/Fields/RaceEthnicity';

function PersonalInfo(props){
    const headings = props.headings;
    const fields = props.fieldContent;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;
    const nvrfStateFields = props.stateData.nvrf_fields;
    const stringContent = props.stringContent

    //Drupal field data
    const nameSectionField = fields.find(item => item.uuid === "8dda085c-edf3-4678-b30a-0a457699be46");
    const prevNameSectionField = fields.find(item => item.uuid === "af4e6259-5b07-4955-9d28-254504ec9df8");
    const firstNameField = fields.find(item => item.uuid === "b7bdae35-e4be-4827-ae11-75d9c3e33bf0");
    const phoneNumberField = fields.find(item => item.uuid === "2d61b54a-e568-410f-825a-0ca82dfd3f63");
    const raceField = fields.find(item => item.uuid === "2bfff6c6-6782-4b14-ac45-642efd278f6a");
    const prevSuffixField = fields.find(item => item.uuid === "09cb2989-d302-4a01-bb3a-33173adcffb2");

    const nameSectionDesc = sanitizeDOM(nameSectionField.section_description);
    const nameSectionAlert = sanitizeDOM(nameSectionField.section_alert);

    //Field requirements by state data
    const nameFieldState = (nvrfStateFields.find(item => item.uuid === firstNameField.uuid));
    const telephoneFieldState = (nvrfStateFields.find(item => item.uuid === phoneNumberField.uuid));
    const raceFieldState = (nvrfStateFields.find(item => item.uuid === raceField.uuid));

    return (
        <>
        <h2>{headings.step_label_1}</h2>

        {changeRegistrationVisible && (
            <Checkbox id="prev-name-change" aria-describedby="prev-name-change_alert" name="prev-name-change" data-test="checkBox" checked={props.previousName} onChange={props.onChangePreviousName} label={stringContent.nameChange} />
        )}

        <div id="prev-name-change_alert" className="usa-alert usa-alert--info" role="region" aria-live="polite">
            <div className="usa-alert__body">
                <div className="usa-alert__text" dangerouslySetInnerHTML={{__html: nameSectionAlert}}/>
            </div>
        </div>

        <h3 className={'margin-top-5'}>{nameSectionField.label}</h3>
        <div dangerouslySetInnerHTML= {{__html: nameSectionDesc}}/>

        {nameFieldState && (
            <>
                <Grid row gap className={'flex-align-end'}>
                    <Grid tablet={{ col: 2 }}>
                    <CurrentTitle {...props} />
                    </Grid>

                <Grid tablet={{ col: 5 }}>
                    <CurrentFirstName {...props} />
                </Grid>

                    <Grid tablet={{ col: 5 }}>
                    <CurrentMiddleName {...props} />
                    </Grid>
                </Grid>

                <Grid row gap className={'flex-align-end'}>
                    <Grid tablet={{ col: 6 }}>
                        <CurrentLastName {...props} />
                    </Grid>

                    <Grid tablet={{ col: 6 }}>
                    <CurrentSuffix {...props} />
                    </Grid>
                </Grid>
            </>
        )}

        <Grid row gap className={'flex-align-end'}>
            <Grid tablet={{ col: 5 }}>
                <CurrentDateOfBirth {...props} dateFormat={props.dateFormat} />
            </Grid>

            {telephoneFieldState && (
                <Grid tablet={{ col: 5 }}>
                    <CurrentPhoneNumber {...props} />
                </Grid>
            )}
        </Grid>
            {/* Email Address check. */}
            <Grid row className={'email-address-input'} style={{
                overflow: "hidden",
                position: "absolute",
                top: "0",
                left: "0",
                height: "0",
                width: "0",
                zIndex: "-1"
            }}>
                <div className="input-parent">
                    <Label className="text-bold" htmlFor="voter-contact" aria-hidden="true">
                    {stringContent.emailLabel}<span className='required-text'>*</span>
                    </Label>
                    <span className="usa-hint">{stringContent.emailLabel}</span>
                    <TextInput
                        data-test="email"
                        id="voter-contact"
                        type="email"
                        required={true}
                        aria-invalid={false}
                        className="radius-md"
                        autoComplete="off"
                        tabIndex="-1"
                        aria-hidden="true"
                        value={props.fieldData.email_address}
                        onChange={props.saveFieldData('email_address')}
                        onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
                        onInvalid={(e) => e.target.setCustomValidity(' ')}
                        onInput={(e) => e.target.setCustomValidity('')}
                    />
                </div>
            </Grid>

            {raceFieldState && (
                <Grid row gap className={'flex-align-end'}>
                    <Grid tablet={{ col: 4 }}>
                        <div className="input-parent">
                            <RaceEthnicity {...props} />
                        </div>
                    </Grid>
                </Grid>
            )}

        {(props.previousName && changeRegistrationVisible) && (
        <>
        <h3 className='margin-top-8'>{prevNameSectionField.label}</h3>
        <Grid row gap className={'flex-align-end'}>
            <Grid tablet={{ col: 2 }}>
                <PreviousTitle {...props} />
            </Grid>

            <Grid tablet={{ col: 5 }}>
                <PreviousFirstName {...props} />
            </Grid>

            <Grid tablet={{ col: 5 }}>
                <PreviousMiddleName {...props} />
            </Grid>
        </Grid>

        <Grid row gap className={'flex-align-end'}>
            <Grid tablet={{ col: 6 }}>
                <PreviousLastName {...props} />
            </Grid>

            <Grid tablet={{ col: 6 }}>
            <Label className="text-bold" htmlFor="suffix-prev">
                {prevSuffixField.label}
            </Label>
            <Select
                id="suffix-prev" className="radius-md" name="suffix-prev"
                aria-describedby=""
                data-test="select"
                value={props.fieldData.prev_suffix} onChange={props.saveFieldData('prev_suffix')}
                autoComplete="off"
                onInvalid={(e) => e.target.setCustomValidity(' ')}
                onInput={(e) => e.target.setCustomValidity('')}
                >
            <React.Fragment key=".0">
                <option value={''}>{stringContent.select}</option>
                {prevSuffixField.options.map((item, index) => (
                    <option key={index} value={item.value}>{item.key}</option>
                ))}
            </React.Fragment>
            </Select>
            </Grid>
        </Grid>
        </>
        )}
        </>
    );
}

export default PersonalInfo;
