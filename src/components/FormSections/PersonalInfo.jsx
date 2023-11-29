import { Label, TextInput, Dropdown, Checkbox, Grid, Fieldset } from '@trussworks/react-uswds';
import React, { useState } from "react";
import { restrictType, checkForErrors, jumpTo } from '../HelperFunctions/ValidateField';

function PersonalInfo(props){
    const content = props.content;
    const fields = props.fieldContent;
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;

    //Drupal field data
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

    //Field requirements by state data
    const nameVisible = stateFieldVisible.name;
    const nameReq = stateFieldRequirements.name;
    const dobVisible = stateFieldVisible.DOB;
    const dobReq = stateFieldRequirements.DOB;
    const telephoneVisible = stateFieldVisible.telephone;
    const telephoneReq = stateFieldRequirements.telephone;
    const raceVisible = stateFieldVisible.race;
    const raceReq = stateFieldRequirements.race;

    //Error handling
    const [handleErrors, setHandleErrors] = useState({
        first_name: false,
        last_name: false,
        prev_first_name: false,
        prev_last_name: false,
        dob: false,
        phone_number: false
    })

    const checkDateValues=()=> {
        let dobValues = [
            props.fieldData.date_of_birth_month.length === 2,
            props.fieldData.date_of_birth_day.length === 2,
            props.fieldData.date_of_birth_year.length === 4
        ]
        if (dobValues.includes(false)) {
            setHandleErrors({ ...handleErrors, dob: (true) })
        } else {
            setHandleErrors({ ...handleErrors, dob: (false) })
        }
     }

    return (
        <>
        <h2>{content.personal_info_heading}</h2>

        {changeRegistrationVisible && (
            <Checkbox id="prev-name-change" name="prev-name-change" checked={props.previousName} onChange={props.onChangePreviousName} label={content.personal_info_checkbox} />
        )}

        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{content.personal_info_help_text}</p>
            </div>
        </div>
            <h2>What is your legal name?</h2>
            <p>Using the name on your driver’s license or other nondriver ID is recommended.</p>
        {nameVisible && (
            <>
                <Grid row gap>
                    <Grid col={2}>
                    <Label className="text-bold" htmlFor="title-select">
                        {titleField.label}
                    <Dropdown className="radius-md" id="title-select" name="title-select" value={props.fieldData.title} onChange={props.saveFieldData('title')} autoComplete="off">
                        <option>- Select -{' '}</option>
                        <option value="Mr">Mr.</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms.</option>
                        <option value="Mrs">Mrs.</option>
                    </Dropdown>
                    </Label>
                    </Grid>

                    <Grid col={5}>
                    <div className={(nameReq && handleErrors.first_name) ? 'error-container' : ''}>
                        <Label className="text-bold" htmlFor="first-name">
                            {firstNameField.label}{nameReq && <span className='required-text'>*</span>}
                        <TextInput
                            id="first-name"
                            className="radius-md text-semibold"
                            aria-describedby="first-name-error"
                            name="first-name"
                            type="text"
                            autoComplete="off"
                            required={nameReq}
                            value={props.fieldData.first_name}
                            onChange={props.saveFieldData('first_name')}
                            onBlur={(e) => setHandleErrors({ ...handleErrors, first_name: checkForErrors(e, 'check value exists') })}
                            />
                        {(nameReq && handleErrors.first_name) &&
                            <span id="first-name-error" role="alert" className='error-text'>
                                First name must be filled out.
                            </span>
                        }
                        </Label>
                    </div>
                    </Grid>

                    <Grid col={5}>
                        <Label className="text-bold" htmlFor="middle-name">
                            {middleNameField.label}
                        <TextInput
                            id="middle-name"
                            className="radius-md"
                            name="middle-name"
                            value={props.fieldData.middle_name}
                            onChange={props.saveFieldData('middle_name')}
                            type="text" autoComplete="off"/>
                        </Label>
                    </Grid>
                </Grid>

                <Grid row gap>
                    <Grid col={6}>
                    <div className={(nameReq && handleErrors.last_name) ? 'error-container' : ''}>
                        <Label className="text-bold" htmlFor="last-name">
                            {lastNameField.label}{nameReq && <span className='required-text'>*</span>}
                        <TextInput
                            id="last-name"
                            className="radius-md"
                            aria-describedby="last-name-error"
                            name="last-name"
                            type="text"
                            autoComplete="off"
                            required={nameReq}
                            value={props.fieldData.last_name}
                            onChange={props.saveFieldData('last_name')}
                            onBlur={(e) => setHandleErrors({ ...handleErrors, last_name: checkForErrors(e, 'check value exists') })}
                            />
                        {(nameReq && handleErrors.last_name) &&
                            <span id="last-name-error" role="alert" className='error-text'>
                                Last name must be filled out.
                            </span>
                        }
                        </Label>
                    </div>
                    </Grid>

                    <Grid col={6}>
                    <Label className="text-bold" htmlFor="suffix-select">
                        {suffixField.label}
                    <Dropdown id="suffix-select" className="radius-md" name="suffix-select" value={props.fieldData.suffix} onChange={props.saveFieldData('suffix')} autoComplete="off" required={nameReq}>
                        <option>- Select -{' '}</option>
                        <option value="Jr.">Jr.</option>
                        <option value="Sr.">Sr.</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                    </Dropdown>
                    </Label>
                    </Grid>
                </Grid>
            </>
        )}

        <Grid row gap>
            {dobVisible && (
            <Grid col={5}>
                <div className={(dobReq && handleErrors.dob) ? 'error-container' : ''}>
                <Fieldset className="fieldset" legend={dobReq ? [<span className="text-bold">{dobField.label}</span>, <span key={1} className='required-text'>*</span>] : "Date of Birth"} style={{ marginTop:'30px'}}>
                        <span className="usa-hint" id="date-of-birth-hint">
                        {dobField.help_text}
                        </span>
                        <div
                            id="date-of-birth"
                            className="usa-memorable-date"
                            name="date-of-birth"
                            autoComplete="off"
                            required={dobReq}
                            data-testid="dateInputGroup"
                            onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) checkDateValues(); }}
                        >
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                                <label data-testid="label" className="usa-label" htmlFor="date_of_birth_month">
                                    Month
                                <input
                                    id="date_of_birth_month"
                                    className="usa-input radius-md"
                                    aria-describedby="dob-error"
                                    name="date_of_birth_month"
                                    label="Month"
                                    unit="month"
                                    required={true}
                                    type="text"
                                    pattern="0[1-9]|1[1,2]"
                                    inputMode="numeric"
                                    maxLength={2}
                                    minLength={2}
                                    value={props.fieldData.date_of_birth_month}
                                    onInput={props.saveFieldData('date_of_birth_month')}
                                    onKeyUp={(e) => jumpTo(e, 'date_of_birth_day')}
                                    onKeyDown={(e) => restrictType(e, 'number')}
                                    onBlur={(e) => props.dateFormat(e, 'date_of_birth_month')}
                                />
                            </label>
                            </div>
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--day">
                                <label data-testid="label" className="usa-label" htmlFor="date_of_birth_day">
                                    Day
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
                                    onKeyDown={(e) => restrictType(e, 'number')}
                                    onBlur={(e) => props.dateFormat(e, 'date_of_birth_day')}
                                />
                                </label>
                            </div>
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--year">
                                <label data-testid="label" className="usa-label" htmlFor="date_of_birth_year">
                                    Year
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
                                    onKeyDown={(e) => restrictType(e, 'number')}
                                />
                                </label>
                            </div>
                        </div>
                {(dobReq && handleErrors.dob) &&
                    <span id="dob-error" rol="alert" className='error-text text-bold'>
                        Date of Birth must follow the format of 01 19 2000.
                    </span>
                }
                </Fieldset>
                </div>
            </Grid>
            )}

            {telephoneVisible && (
                <Grid col={5} className="input-example">
                <div className="bottom">
                    <div className={(telephoneReq && handleErrors.phone_number) ? 'error-container' : ''}>
                        <Label className="text-bold" htmlFor="phone-number">{phoneNumberField.label}{telephoneReq && <span className='required-text'>*</span>}</Label>
                        <span className="usa-hint" id="date-of-birth-hint">For example: {phoneNumberField.help_text}</span>
                        <TextInput
                            id="phone-number"
                            className="radius-md"
                            aria-describedby="phone-number-error"
                            name="phone-number"
                            type="tel"
                            autoComplete="off"
                            required={telephoneReq}
                            maxLength={14}
                            minLength={14}
                            value={props.fieldData.phone_number}
                            onChange={props.saveFieldData('phone_number')}
                            onBlur={(e) => setHandleErrors({ ...handleErrors, phone_number: checkForErrors(e, 'check value length') })}
                        />
                        {(telephoneReq && handleErrors.phone_number) &&
                            <span id="phone-number-error" rol="alert" className='error-text'>
                                Phone number must be 10 digits.
                            </span>
                        }
                    </div>
                </div>
                </Grid>

            )}
            </Grid>

            <Grid row gap>
            {raceVisible && (
                <div>
                    <Label className="text-bold" htmlFor="race-ethic-group-select">{raceField.label}</Label>
                    <Dropdown id="race-ethic-group-select" className="radius-md" name="race-ethic-group-select" value={props.fieldData.race} onChange={props.saveFieldData('race')} autoComplete="off" required={raceReq}>
                        <option>- Select -{' '}</option>
                        <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                        <option value="Asian or Pacific Islander">Asian or Pacific Islander</option>
                        <option value="Black, not of Hispanic Origin">Black, not of Hispanic Origin</option>
                        <option value="Hispanic">Hispanic</option>
                        <option value="Multi‑racial">Multi‑racial</option>
                        <option value="White, not of Hispanic Origin">White, not of Hispanic Origin</option>
                        <option value="Other">Other</option>
                    </Dropdown>
                </div>
            )}
        </Grid>

        {(props.previousName && changeRegistrationVisible) && (
        <>
            <h3>Previous Name</h3>
        <Grid row gap>
            <Grid col={2}>
            <Label className="text-bold" htmlFor="title-select-2">
                {prevTitleField.label}
            <Dropdown id="title-select-2" className="radius-md" name="title-select-2" value={props.fieldData.prev_title} onChange={props.saveFieldData('prev_title')} autoComplete="off">
                <option>- Select -{' '}</option>
                <option value="Mr">Mr.</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms.</option>
                <option value="Mrs">Mrs.</option>
            </Dropdown>
            </Label>
            </Grid>

            <Grid col={5}>
            <div className={(nameReq && handleErrors.prev_first_name) ? 'error-container' : ''}>
                <Label className="text-bold" htmlFor="first-name-2">
                    {prevFirstNameField.label}{nameReq && <span className='required-text'>*</span>}
                <TextInput
                    id="first-name-2"
                    className="radius-md"
                    aria-describedby="prev-first-name-error"
                    name="first-name-2"
                    type="text"
                    autoComplete="off"
                    required={nameReq}
                    value={props.fieldData.prev_first_name}
                    onChange={props.saveFieldData('prev_first_name')}
                    onBlur={(e) => setHandleErrors({ ...handleErrors, prev_first_name: checkForErrors(e, 'check value exists') })}
                />
                {(nameReq && handleErrors.prev_first_name) &&
                    <span id="prev-first-name-error" role="alert" className='error-text'>
                        First name must be filled out.
                    </span>
                }
                </Label>
            </div>
            </Grid>

            <Grid col={5}>
                <Label className="text-bold" htmlFor="middle-name-2">
                    {prevMiddleNameField.label}
                <TextInput
                    id="middle-name-2"
                    className="radius-md"
                    name="middle-name-2"
                    value={props.fieldData.prev_middle_name}
                    onChange={props.saveFieldData('prev_middle_name')}
                    type="text" autoComplete="off"/>
                </Label>
            </Grid>
        </Grid>

        <Grid row gap>
            <Grid col={6}>
            <div className={(nameReq && handleErrors.prev_last_name) ? 'error-container' : ''}>
                <Label className="text-bold" htmlFor="last-name-2">
                    {prevLastNameField.label}{nameReq && <span className='required-text'>*</span>}
                <TextInput
                    id="last-name-2"
                    className="radius-md"
                    aria-describedby="prev-last-name-error"
                    name="last-name-2"
                    type="text"
                    autoComplete="off"
                    required={nameReq}
                    value={props.fieldData.prev_last_name}
                    onChange={props.saveFieldData('prev_last_name')}
                    onBlur={(e) => setHandleErrors({ ...handleErrors, prev_last_name: checkForErrors(e, 'check value exists') })}
                    />
                {(nameReq && handleErrors.prev_last_name) &&
                    <span id="prev-last-name-error" role="alert" className='error-text'>
                        Last name must be filled out.
                    </span>
                }
                </Label>
            </div>
            </Grid>

            <Grid col={6}>
            <Label className="text-bold" htmlFor="suffix-select-2">
                {prevSuffixField.label}
            <Dropdown id="suffix-select-2" className="radius-md" name="suffix-select-2" value={props.fieldData.prev_suffix} onChange={props.saveFieldData('prev_suffix')} autoComplete="off" required={nameReq}>
                <option>- Select -{' '}</option>
                <option value="Jr.">Jr.</option>
                <option value="Sr.">Sr.</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
            </Dropdown>
            </Label>
            </Grid>
        </Grid>
        </>
        )}
        </>
    );
}

export default PersonalInfo;
