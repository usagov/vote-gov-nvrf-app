import { Label, TextInput, Dropdown, Checkbox, Grid, Fieldset } from '@trussworks/react-uswds';
import React from "react";
import { restrictType, checkForErrors, jumpTo, toggleError } from '../HelperFunctions/ValidateField';
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";

function PersonalInfo(props){
    const headings = props.headings;
    const fields = props.fieldContent;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;
    const nvrfStateFields = props.stateData.nvrf_fields;

    //Drupal field data
    const nameSectionField = fields.find(item => item.uuid === "8dda085c-edf3-4678-b30a-0a457699be46");
    const prevNameSectionField = fields.find(item => item.uuid === "af4e6259-5b07-4955-9d28-254504ec9df8");
    const titleField = fields.find(item => item.uuid === "86a544cd-cfe9-456a-b634-176a37a38d6d");
    const firstNameField = fields.find(item => item.uuid === "b7bdae35-e4be-4827-ae11-75d9c3e33bf0");
    const middleNameField = fields.find(item => item.uuid === "38020ec6-1b53-4227-99e5-feea5f60af07");
    const lastNameField = fields.find(item => item.uuid === "b306238a-a0f6-4bb8-b8ea-b3216ca75e0b");
    const suffixField = fields.find(item => item.uuid === "eeff4fa1-00f2-474b-a791-1a4146dab11a");
    const dobField = fields.find(item => item.uuid === "d31b2a64-36a9-4bc6-a9d1-e68d2be8c211");
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
    const dobFieldState = (nvrfStateFields.find(item => item.uuid === dobField.uuid));
    const telephoneFieldState = (nvrfStateFields.find(item => item.uuid === phoneNumberField.uuid));
    const raceFieldState = (nvrfStateFields.find(item => item.uuid === raceField.uuid));

    const checkDateValues = (type) => {
        let month = props.fieldData.date_of_birth_month;
        let day = props.fieldData.date_of_birth_day;
        let year = props.fieldData.date_of_birth_year;
        let yearStart = year.slice(0, 2);
        let birthdate = year + '-' + month + '-' + day;
        let age = Math.floor((new Date() - new Date(birthdate).getTime()) / 3.15576e+10)

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
            age <= 110,
            age >= 17
          ];

          if (dobValues.includes(false)) {
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
            <Checkbox id="prev-name-change" name="prev-name-change" checked={props.previousName} onChange={props.onChangePreviousName} label={"I have legally changed my name since I last registered in this state."} />
        )}

        <div className="usa-alert usa-alert--info" role="alert">
            <div className="usa-alert__body" dangerouslySetInnerHTML={{__html: nameSectionAlert}}/>
        </div>

        <h3 className={'margin-top-5'}>{nameSectionField.label}</h3>
        <div dangerouslySetInnerHTML= {{__html: nameSectionDesc}}/>

        {nameFieldState && (
            <>
                <Grid row gap>
                    <Grid tablet={{ col: 2 }}>
                    <Label className="text-bold" htmlFor="title-select">
                        {titleField.label}
                    </Label>
                    <Dropdown
                        className="radius-md" id="title-select" name="title-select"
                        value={props.fieldData.title}
                        onChange={props.saveFieldData('title')}
                        autoComplete="off"
                        onInvalid={(e) => e.target.setCustomValidity(' ')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        >
                        <option value={''}>- Select -{' '}</option>
                        {titleField.options.map((item, index) => (
                            <option key={index} value={item.value}>{item.key}</option>
                        ))}
                    </Dropdown>
                    </Grid>

                    <Grid tablet={{ col: 5 }}>
                    <div className="input-parent">
                        <Label className="text-bold" htmlFor="first-name">
                            {firstNameField.label}{(nameFieldState.required === "1") && <span className='required-text'>*</span>}
                        </Label>
                        <TextInput
                            id="first-name"
                            className="radius-md text-semibold"
                            aria-describedby="first-name-error"
                            name="first-name"
                            type="text"
                            autoComplete="off"
                            required={parseInt(nameFieldState.required)}
                            value={props.fieldData.first_name}
                            onChange={props.saveFieldData('first_name')}
                            onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                        <span id="first-name-error" role="alert" className={'error-text'}>
                            {firstNameField.error_msg}
                        </span>
                    </div>
                    </Grid>

                    <Grid tablet={{ col: 5 }}>
                        <Label className="text-bold" htmlFor="middle-name">
                            {middleNameField.label}
                        </Label>
                        <TextInput
                            id="middle-name"
                            className="radius-md"
                            name="middle-name"
                            value={props.fieldData.middle_name}
                            onChange={props.saveFieldData('middle_name')}
                            type="text" autoComplete="off"
                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                            onInput={(e) => e.target.setCustomValidity('')}/>
                    </Grid>
                </Grid>

                <Grid row gap>
                    <Grid tablet={{ col: 6 }}>
                    <div className="input-parent">
                        <Label className="text-bold" htmlFor="last-name">
                            {lastNameField.label}{(nameFieldState.required === "1") && <span className='required-text'>*</span>}
                        </Label>
                        <TextInput
                            id="last-name"
                            className="radius-md"
                            aria-describedby="last-name-error"
                            name="last-name"
                            type="text"
                            autoComplete="off"
                            required={parseInt(nameFieldState.required)}
                            value={props.fieldData.last_name}
                            onChange={props.saveFieldData('last_name')}
                            onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            />
                        <span id="last-name-error" role="alert" className={'error-text'}>
                            {lastNameField.error_msg}
                        </span>
                    </div>
                    </Grid>

                    <Grid tablet={{ col: 6 }}>
                    <Label className="text-bold" htmlFor="suffix-select">
                        {suffixField.label}
                    </Label>
                    <Dropdown
                        id="suffix-select" className="radius-md" name="suffix-select"
                        value={props.fieldData.suffix}
                        onChange={props.saveFieldData('suffix')}
                        autoComplete="off"
                        onInvalid={(e) => e.target.setCustomValidity(' ')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        >
                        <option value={''}>- Select -{' '}</option>
                        {suffixField.options.map((item, index) => (
                            <option key={index} value={item.value}>{item.key}</option>
                        ))}
                    </Dropdown>
                    </Grid>
                </Grid>
            </>
        )}

        <Grid row gap className={'flex-align-end'}>
            {dobFieldState && (
            <Grid tablet={{ col: 5 }}>
                <div className="input-parent">
                <Fieldset className="fieldset" legend={parseInt(dobFieldState.required) ? [<span className="text-bold">{dobField.label}</span>, <span key={1} className='required-text'>*</span>] : "Date of Birth"} style={{ marginTop:'30px'}}>
                        <span className="usa-hint" id="date-of-birth-hint">
                        {dobField.help_text}
                        </span>
                        <div
                            id="date-of-birth"
                            className="usa-memorable-date"
                            name="date-of-birth"
                            autoComplete="off"
                            required={parseInt(dobFieldState.required)}
                            data-testid="dateInputGroup"
                            onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) toggleError(e, checkDateValues('all')) }}
                            >
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                                <label data-testid="label" className="usa-label" htmlFor="date_of_birth_month">
                                    Month
                                </label>
                                <input
                                    id="date_of_birth_month"
                                    className="usa-input radius-md"
                                    aria-describedby="dob-error"
                                    name="date_of_birth_month"
                                    label="Month"
                                    unit="month"
                                    required={true}
                                    type="text"
                                    pattern="0[1-9]|1[0,1,2]"
                                    inputMode="numeric"
                                    maxLength={2}
                                    minLength={2}
                                    value={props.fieldData.date_of_birth_month}
                                    onInput={props.saveFieldData('date_of_birth_month')}
                                    onKeyUp={(e) => jumpTo(e, 'date_of_birth_day')}
                                    onKeyDown={(e) => {restrictType(e, 'number'), e.target.setCustomValidity('')}}
                                    onBlur={(e) => {props.dateFormat(e, 'date_of_birth_month'), toggleError(e, checkDateValues('month'))}}
                                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                                    />
                            </div>
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--day">
                                <label data-testid="label" className="usa-label" htmlFor="date_of_birth_day">
                                    Day
                                </label>
                                <input
                                    id="date_of_birth_day"
                                    className="usa-input radius-md"
                                    aria-describedby="dob-error"
                                    name="date_of_birth_day"
                                    label="Day"
                                    unit="day"
                                    required={true}
                                    type="text"
                                    pattern="0[1-9]|[12][0-9]|3[01]"
                                    inputMode="numeric"
                                    minLength={2}
                                    maxLength={2}
                                    value={props.fieldData.date_of_birth_day}
                                    onInput={props.saveFieldData('date_of_birth_day')}
                                    onKeyUp={(e) => jumpTo(e, 'date_of_birth_year')}
                                    onKeyDown={(e) => {restrictType(e, 'number'), e.target.setCustomValidity('')}}
                                    onBlur={(e) => {props.dateFormat(e, 'date_of_birth_day'), toggleError(e, checkDateValues('day'))}}
                                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                                    />
                            </div>
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--year">
                                <label data-testid="label" className="usa-label" htmlFor="date_of_birth_year">
                                    Year
                                </label>
                                <input
                                    id="date_of_birth_year"
                                    className="usa-input radius-md"
                                    aria-describedby="dob-error"
                                    name="date_of_birth_year"
                                    label="Year"
                                    unit="year"
                                    required={true}
                                    type="text"
                                    pattern="(19|20)\d{2}"
                                    inputMode="numeric"
                                    minLength={4}
                                    maxLength={4}
                                    value={props.fieldData.date_of_birth_year}
                                    onInput={props.saveFieldData('date_of_birth_year')}
                                    onKeyDown={(e) => {restrictType(e, 'number'), e.target.setCustomValidity('')}}
                                    onBlur={(e) => toggleError(e, checkDateValues('year'))}
                                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                                />
                            </div>
                        </div>
                    <span id="dob-error" rol="alert" className='error-text'>
                        {dobField.error_msg}
                    </span>
                </Fieldset>
                </div>
            </Grid>
            )}

            {telephoneFieldState && (
                <Grid tablet={{ col: 5 }}>
                    <div className="input-parent">
                        <Label className="text-bold" htmlFor="phone-number">
                            {phoneNumberField.label}{(telephoneFieldState.required === "1") && <span className='required-text'>*</span>}
                        </Label>
                        <span className="usa-hint" id="date-of-birth-hint">For example: {phoneNumberField.help_text}</span>
                        <TextInput
                            id="phone-number"
                            className="radius-md"
                            aria-describedby="phone-number-error"
                            name="phone-number"
                            type="tel"
                            autoComplete="off"
                            required={parseInt(telephoneFieldState.required)}
                            maxLength={14}
                            minLength={14}
                            value={props.fieldData.phone_number}
                            onChange={props.saveFieldData('phone_number')}
                            onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                        <span id="phone-number-error" rol="alert" className='error-text'>
                            {phoneNumberField.error_msg}
                        </span>
                    </div>
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
                        Voter Contact<span className='required-text'>*</span>
                    </Label>
                    <span className="usa-hint">For example: email@address.com</span>
                    <TextInput
                        id="voter-contact"
                        type="email"
                        required={true}
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
                <Grid row gap>
                    <Grid tablet={{ col: 4 }}>
                        <div className="input-parent">
                            <Label className="text-bold" htmlFor="race-ethic-group-select">
                                {raceField.label}{(raceFieldState.required === "1") && <span className='required-text'>*</span>}
                            </Label>
                            <Dropdown
                            id="race-ethic-group-select" 
                            className="radius-md" 
                            name="race-ethic-group-select"
                            value={props.fieldData.race} 
                            onChange={props.saveFieldData('race')} 
                            autoComplete="off"
                            required={parseInt(raceFieldState.required)}
                            onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                            onInput={(e) => e.target.setCustomValidity('')}>
                                <option value="">- Select -{' '}</option>
                                {raceField.options.map((item, index) => (
                                    <option key={index} value={item.value}>{item.key}</option>
                                ))}
                            </Dropdown>
                            <span id="race-error" role="alert" className='error-text'>
                                {raceField.error_msg}
                            </span>
                        </div>
                    </Grid>
                </Grid>
            )}

        {(props.previousName && changeRegistrationVisible) && (
        <>
        <h3 className='margin-top-8'>{prevNameSectionField.label}</h3>
        <Grid row gap>
            <Grid tablet={{ col: 2 }}>
            <Label className="text-bold" htmlFor="title-select-2">
                {prevTitleField.label}
            </Label>
            <Dropdown
                id="title-select-2" className="radius-md" name="title-select-2"
                value={props.fieldData.prev_title}
                onChange={props.saveFieldData('prev_title')}
                autoComplete="off"
                onInvalid={(e) => e.target.setCustomValidity(' ')}
                onInput={(e) => e.target.setCustomValidity('')}
                >
                <option value={''}>- Select -{' '}</option>
                {prevTitleField.options.map((item, index) => (
                    <option key={index} value={item.value}>{item.key}</option>
                ))}
            </Dropdown>
            </Grid>

            <Grid tablet={{ col: 5 }}>
            <div className="input-parent">
                <Label className="text-bold" htmlFor="first-name-2">
                    {prevFirstNameField.label}{(nameFieldState.required === "1") && <span className='required-text'>*</span>}
                </Label>
                <TextInput
                    id="first-name-2"
                    className="radius-md"
                    aria-describedby="prev-first-name-error"
                    name="first-name-2"
                    type="text"
                    autoComplete="off"
                    required={parseInt(nameFieldState.required)}
                    value={props.fieldData.prev_first_name}
                    onChange={props.saveFieldData('prev_first_name')}
                    onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                    onInput={(e) => e.target.setCustomValidity('')}
                />
                <span id="prev-first-name-error" role="alert" className='error-text'>
                    {prevFirstNameField.error_msg}
                </span>
            </div>
            </Grid>

            <Grid tablet={{ col: 5 }}>
                <Label className="text-bold" htmlFor="middle-name-2">
                    {prevMiddleNameField.label}
                </Label>
                <TextInput
                    id="middle-name-2"
                    className="radius-md"
                    name="middle-name-2"
                    value={props.fieldData.prev_middle_name}
                    onChange={props.saveFieldData('prev_middle_name')}
                    type="text" autoComplete="off"
                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                    onInput={(e) => e.target.setCustomValidity('')}/>
            </Grid>
        </Grid>

        <Grid row gap>
            <Grid tablet={{ col: 6 }}>
            <div className="input-parent">
                <Label className="text-bold" htmlFor="last-name-2">
                    {prevLastNameField.label}{(nameFieldState.required === "1") && <span className='required-text'>*</span>}
                </Label>
                <TextInput
                    id="last-name-2"
                    className="radius-md"
                    aria-describedby="prev-last-name-error"
                    name="last-name-2"
                    type="text"
                    autoComplete="off"
                    required={parseInt(nameFieldState.required)}
                    value={props.fieldData.prev_last_name}
                    onChange={props.saveFieldData('prev_last_name')}
                    onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    />
                    <span id="prev-last-name-error" role="alert" className='error-text'>
                        {prevLastNameField.error_msg}
                    </span>
            </div>
            </Grid>

            <Grid tablet={{ col: 6 }}>
            <Label className="text-bold" htmlFor="suffix-select-2">
                {prevSuffixField.label}
            </Label>
            <Dropdown
                id="suffix-select-2" className="radius-md" name="suffix-select-2"
                value={props.fieldData.prev_suffix} onChange={props.saveFieldData('prev_suffix')}
                autoComplete="off"
                onInvalid={(e) => e.target.setCustomValidity(' ')}
                onInput={(e) => e.target.setCustomValidity('')}
                >
                <option value={''}>- Select -{' '}</option>
                {prevSuffixField.options.map((item, index) => (
                    <option key={index} value={item.value}>{item.key}</option>
                ))}
            </Dropdown>
            </Grid>
        </Grid>
        </>
        )}
        </>
    );
}

export default PersonalInfo;
