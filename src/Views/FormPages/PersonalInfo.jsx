import { Label, TextInput, Select, Checkbox, Grid, Fieldset } from '@trussworks/react-uswds';
import React, { useState } from "react";
import { restrictType, checkForErrors, jumpTo, toggleError } from 'Utils/ValidateField';
import {sanitizeDOM} from "Utils/JsonHelper";
import CurrentFirstName from "Components/Fields/CurrentFirstName";
import CurrentTitle from 'Components/Fields/CurrentTitle';
import CurrentMiddleName from 'Components/Fields/CurrentMiddleName';

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

    const [phoneDescribe, setPhoneDescribe] = useState('phone-number-hint');

    //Field requirements by state data
    const nameFieldState = (nvrfStateFields.find(item => item.uuid === firstNameField.uuid));
    const dobFieldState = (nvrfStateFields.find(item => item.uuid === dobField.uuid));
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
                <Grid row gap>
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

                <Grid row gap>
                    <Grid tablet={{ col: 6 }}>
                    <div className="input-parent">
                        <Label className="text-bold" htmlFor="last-name">
                            {lastNameField.label}{(nameFieldState.required === "1") && <span className='required-text'>*</span>}
                        </Label>
                        <TextInput
                            data-test="lastName"
                            id="last-name"
                            className="radius-md"
                            aria-describedby="last-name_error"
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
                        <span id="last-name_error" role="alert" className={'error-text'} data-test="errorText">
                            {lastNameField.error_msg}
                        </span>
                    </div>
                    </Grid>

                    <Grid tablet={{ col: 6 }}>
                    <Label className="text-bold" htmlFor="suffix">
                        {suffixField.label}
                    </Label>
                    <Select
                    data-test="select"
                    id="suffix" className="radius-md" name="suffix"
                    value={props.fieldData.suffix}
                    onChange={props.saveFieldData('suffix')}
                    autoComplete="off"
                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    >
                    <React.Fragment key=".0">
                        <option value={''}>{stringContent.select}</option>
                        {suffixField.options.map((item, index) => (
                            <option key={index} value={item.value}>{item.key}</option>
                        ))}
                    </React.Fragment>
                    </Select>
                    </Grid>
                </Grid>
            </>
        )}

        <Grid row gap className={'flex-align-end'}>
            {dobFieldState && (
            <Grid tablet={{ col: 5 }}>
                <div className="input-parent">
                <Fieldset className="fieldset" legend={parseInt(dobFieldState.required) ? [<span key={0} className="text-bold">{dobField.label}</span>, <span key={1} className='required-text'>*</span>] : (string.dob)} style={{ marginTop:'30px'}}>
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
                            onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) toggleError(e, checkDateValues(e, 'all')) }}
                            >
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                                <label data-testid="label" className="usa-label" htmlFor="date-of-birth_month">
                                    {stringContent.month}
                                </label>
                                <input
                                    data-test="dobMonth"
                                    id="date-of-birth_month"
                                    className="usa-input radius-md"
                                    aria-describedby="date-of-birth_error"
                                    name="date-of-birth_month"
                                    label={stringContent.month}
                                    unit="month"
                                    required={true}
                                    aria-invalid={false}
                                    type="text"
                                    pattern="0[1-9]|1[0,1,2]"
                                    inputMode="numeric"
                                    maxLength={2}
                                    minLength={2}
                                    value={props.fieldData.date_of_birth_month}
                                    onInput={props.saveFieldData('date_of_birth_month')}
                                    onKeyUp={(e) => jumpTo(e, 'date-of-birth_day')}
                                    onKeyDown={(e) => {restrictType(e, 'number'), e.target.setCustomValidity('')}}
                                    onBlur={(e) => {props.dateFormat(e, 'date_of_birth_month'), toggleError(e, checkDateValues(e, 'month'))}}
                                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                                    />
                            </div>
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--day">
                                <label data-testid="label" className="usa-label" htmlFor="date-of-birth_day">
                                    {stringContent.day}
                                </label>
                                <input
                                    data-test="dobDay"
                                    id="date-of-birth_day"
                                    className="usa-input radius-md"
                                    aria-describedby="date-of-birth_error"
                                    name="date-of-birth_day"
                                    label={stringContent.day}
                                    unit="day"
                                    required={true}
                                    aria-invalid={false}
                                    type="text"
                                    pattern="0[1-9]|[12][0-9]|3[01]"
                                    inputMode="numeric"
                                    minLength={2}
                                    maxLength={2}
                                    value={props.fieldData.date_of_birth_day}
                                    onInput={props.saveFieldData('date_of_birth_day')}
                                    onKeyUp={(e) => jumpTo(e, 'date-of-birth_year')}
                                    onKeyDown={(e) => {restrictType(e, 'number'), e.target.setCustomValidity('')}}
                                    onBlur={(e) => {props.dateFormat(e, 'date_of_birth_day'), toggleError(e, checkDateValues(e, 'day'))}}
                                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                                    />
                            </div>
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--year">
                                <label data-testid="label" className="usa-label" htmlFor="date-of-birth_year">
                                    {stringContent.year}
                                </label>
                                <input
                                    data-test="dobYear"
                                    id="date-of-birth_year"
                                    className="usa-input radius-md"
                                    aria-describedby="date-of-birth_error"
                                    name="date-of-birth_year"
                                    label={stringContent.year}
                                    unit="year"
                                    required={true}
                                    aria-invalid={false}
                                    type="text"
                                    pattern="19\d{2}|200\d{1}"
                                    inputMode="numeric"
                                    minLength={4}
                                    maxLength={4}
                                    value={props.fieldData.date_of_birth_year}
                                    onInput={props.saveFieldData('date_of_birth_year')}
                                    onKeyDown={(e) => {restrictType(e, 'number'), e.target.setCustomValidity('')}}
                                    onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
                                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                                />
                            </div>
                        </div>
                    <span id="date-of-birth_error" role="alert" className='error-text' data-test="errorText">
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
                        <span className="usa-hint" id="phone-number-hint">{phoneNumberField.help_text}</span>
                        <TextInput
                            data-test="phoneNumber"
                            id="phone-number"
                            className="radius-md"
                            aria-describedby={phoneDescribe}
                            name="phone-number"
                            type="tel"
                            autoComplete="off"
                            required={parseInt(telephoneFieldState.required)}
                            maxLength={14}
                            minLength={14}
                            pattern="\(\d\d\d\)\s\d\d\d-\d\d\d\d"
                            value={props.fieldData.phone_number}
                            onChange={props.saveFieldData('phone_number')}
                            onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
                            onInvalid={(e) => {e.target.setCustomValidity(' '), setPhoneDescribe('phone-number_error')}}
                            onInput={(e) => {e.target.setCustomValidity(''), setPhoneDescribe('phone-number-hint')}}
                        />
                        <span id="phone-number_error" rol="alert" className='error-text' data-test="errorText">
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
                <Grid row gap>
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
        <Grid row gap>
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

        <Grid row gap>
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
