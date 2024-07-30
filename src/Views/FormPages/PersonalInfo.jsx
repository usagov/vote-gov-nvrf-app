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
import CurrentPhoneNumber from 'Components/Fields/CurrentPhoneNumber';

function PersonalInfo(props){
    const headings = props.headings;
    const fields = props.fieldContent;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;
    const nvrfStateFields = props.stateData.nvrf_fields;
    const stringContent = props.stringContent

    //Drupal field data
    const nameSectionField = fields.find(item => item.uuid === "8dda085c-edf3-4678-b30a-0a457699be46");
    const prevNameSectionField = fields.find(item => item.uuid === "af4e6259-5b07-4955-9d28-254504ec9df8");
    const titleField = fields.find(item => item.uuid === "86a544cd-cfe9-456a-b634-176a37a38d6d");
    const firstNameField = fields.find(item => item.uuid === "b7bdae35-e4be-4827-ae11-75d9c3e33bf0");
    const middleNameField = fields.find(item => item.uuid === "38020ec6-1b53-4227-99e5-feea5f60af07");
    const lastNameField = fields.find(item => item.uuid === "b306238a-a0f6-4bb8-b8ea-b3216ca75e0b");
    const suffixField = fields.find(item => item.uuid === "eeff4fa1-00f2-474b-a791-1a4146dab11a");
    const phoneNumberField = fields.find(item => item.uuid === "2d61b54a-e568-410f-825a-0ca82dfd3f63");
    const raceField = fields.find(item => item.uuid === "2bfff6c6-6782-4b14-ac45-642efd278f6a");
    const prevTitleField = fields.find(item => item.uuid === "34d2669a-d30b-4001-b897-280fe71b3cb0");
    const prevFirstNameField = fields.find(item => item.uuid === "f282e541-7ca8-4c22-8d87-d4cff56e22e5");
    const prevMiddleNameField = fields.find(item => item.uuid === "a4919026-91ac-4e05-a75f-e2df479abd76");
    const prevLastNameField = fields.find(item => item.uuid === "42de34cc-ebf3-4d8e-8873-2571063b62c0");
    const prevSuffixField = fields.find(item => item.uuid === "09cb2989-d302-4a01-bb3a-33173adcffb2");

    const nameSectionDesc = sanitizeDOM(nameSectionField.section_description);
    const nameSectionAlert = sanitizeDOM(nameSectionField.section_alert);

    //Field requirements by state data
    const nameFieldState = (nvrfStateFields.find(item => item.uuid === firstNameField.uuid));
    const telephoneFieldState = (nvrfStateFields.find(item => item.uuid === phoneNumberField.uuid));
    const raceFieldState = (nvrfStateFields.find(item => item.uuid === raceField.uuid));

    const checkDateValues = (e, type) => {
        let month = props.fieldData.date_of_birth_month;
        let day = props.fieldData.date_of_birth_day;
        let year = props.fieldData.date_of_birth_year;
        let yearStart = year.slice(0, 2);

        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentDay = currentDate.getDate();
        let currentYear = currentDate.getFullYear();
        let age = currentYear - year - (currentMonth <= month && currentDay < day);
        
        if (type === "all") {
          let dobValues = [
            month.length === 2,
            day.length === 2,
            year.length === 4,

            month <= 12,
            month >= 1,
            day <= 31,
            day >= 1,
            yearStart <= 20,
            yearStart >= 19,
            age <= 120,
            age >= 16
          ];

          if (dobValues.includes(false)) {
            e.target.setCustomValidity(' ');
            return true
          } else {
            return false
          }

        } else if (type === "month") {
          if (month > 12 || month < 1) {
            return true
          } else {
            return false
          }
        } else if (type === "day") {
          if (day > 31 || day < 1) {
            return true
          } else {
            return false
          }
        } else if (type === "year") {
          if (age > 110 || age < 17) {
            return true
          } else {
            return false
          }
        }
      };


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
                <CurrentDateOfBirth {...props} checkDateValues={checkDateValues} dateFormat={props.dateFormat} />
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
                            <Label className="text-bold" htmlFor="race-ethnicity">
                                {raceField.label}{(raceFieldState.required === "1") && <span className='required-text'>*</span>}
                            </Label>
                            <Select
                            id="race-ethnicity"
                            className="radius-md"
                            name="race-ethnicity"
                            aria-describedby="race-ethnicity_error"
                            value={props.fieldData.race}
                            onChange={props.saveFieldData('race')}
                            autoComplete="off"
                            required={parseInt(raceFieldState.required)}
                            onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                            onInput={(e) => e.target.setCustomValidity('')}>
                            <React.Fragment key=".0">
                                <option value="">{stringContent.select}</option>
                                {raceField.options.map((item, index) => (
                                    <option key={index} value={item.value}>{item.key}</option>
                                ))}
                            </React.Fragment>
                            </Select>
                            <span id="race-ethnicity_error" role="alert" className='error-text' data-test="errorText">
                                {raceField.error_msg}
                            </span>
                        </div>
                    </Grid>
                </Grid>
            )}

        {(props.previousName && changeRegistrationVisible) && (
        <>
        <h3 className='margin-top-8'>{prevNameSectionField.label}</h3>
        <Grid row gap className={'flex-align-end'}>
            <Grid tablet={{ col: 2 }}>
            <Label className="text-bold" htmlFor="title-prev">
                {prevTitleField.label}
            </Label>
            <Select
                id="title-prev" className="radius-md" name="title-prev"
                aria-describedby=""
                data-test="select"
                value={props.fieldData.prev_title}
                onChange={props.saveFieldData('prev_title')}
                autoComplete="off"
                onInvalid={(e) => e.target.setCustomValidity(' ')}
                onInput={(e) => e.target.setCustomValidity('')}
                >
            <React.Fragment key=".0">
                <option value={''}>{stringContent.select}</option>
                {prevTitleField.options.map((item, index) => (
                    <option key={index} value={item.value}>{item.key}</option>
                ))}
            </React.Fragment>
            </Select>
            </Grid>

            <Grid tablet={{ col: 5 }}>
            <div className="input-parent">
                <Label className="text-bold" htmlFor="first-name-prev">
                    {prevFirstNameField.label}{(nameFieldState.required === "1") && <span className='required-text'>*</span>}
                </Label>
                <TextInput
                    data-test="prevFirstName"
                    id="first-name-prev"
                    className="radius-md"
                    aria-describedby="first-name-prev_error"
                    name="first-name-prev"
                    type="text"
                    autoComplete="off"
                    required={parseInt(nameFieldState.required)}
                    value={props.fieldData.prev_first_name}
                    onChange={props.saveFieldData('prev_first_name')}
                    onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                    onInput={(e) => e.target.setCustomValidity('')}
                />
                <span id="first-name-prev_error" role="alert" className='error-text' data-test="errorText">
                    {prevFirstNameField.error_msg}
                </span>
            </div>
            </Grid>

            <Grid tablet={{ col: 5 }}>
                <Label className="text-bold" htmlFor="middle-name-prev">
                    {prevMiddleNameField.label}
                </Label>
                <TextInput
                    data-test="prevMiddleName"
                    id="middle-name-prev"
                    className="radius-md"
                    name="middle-name-prev"
                    aria-describedby=""
                    value={props.fieldData.prev_middle_name}
                    onChange={props.saveFieldData('prev_middle_name')}
                    type="text" autoComplete="off"
                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                    onInput={(e) => e.target.setCustomValidity('')}/>
            </Grid>
        </Grid>

        <Grid row gap className={'flex-align-end'}>
            <Grid tablet={{ col: 6 }}>
            <div className="input-parent">
                <Label className="text-bold" htmlFor="last-name-prev">
                    {prevLastNameField.label}{(nameFieldState.required === "1") && <span className='required-text'>*</span>}
                </Label>
                <TextInput
                    data-test="prevLastName"
                    id="last-name-prev"
                    className="radius-md"
                    aria-describedby="last-name-prev_error"
                    name="last-name-prev"
                    type="text"
                    autoComplete="off"
                    required={parseInt(nameFieldState.required)}
                    value={props.fieldData.prev_last_name}
                    onChange={props.saveFieldData('prev_last_name')}
                    onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    />
                    <span id="last-name-prev_error" role="alert" className='error-text' data-test="errorText">
                        {prevLastNameField.error_msg}
                    </span>
            </div>
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
