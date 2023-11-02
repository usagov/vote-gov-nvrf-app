import { Label, TextInput, Button, Dropdown,Checkbox, Grid, Fieldset } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/registration-form.json";
import { focusNext, restrictType, restrictLength, checkForErrors } from '../HelperFunctions/ValidateField';
import "../../styles/pages/Form.css";

function PersonalInfo(props){
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const stateInstructions = props.stateData.state_field_instructions;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;

    const nameVisible = stateFieldVisible.name;
    const nameReq = stateFieldRequirements.name;
    const dobVisible = stateFieldVisible.DOB;
    const dobReq = stateFieldRequirements.DOB;
    const telephoneVisible = stateFieldVisible.telephone;
    const telephoneReq = stateFieldRequirements.telephone;
    const raceVisible = stateFieldVisible.race;
    const raceReq = stateFieldRequirements.race;

     //Previous name fields controls
     const [hasPreviousName, setHasPreviousName] = useState(false);
     const onChangePreviousNameCheckbox = (e) => {
         setHasPreviousName(e.target.checked);
     }

     const [previousName, setPreviousName] = useState("");
     const onChangePreviousName = (e) => {
         setPreviousName(e.target.value);
     }

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
        <Button
            type="button"
            onClick={props.handlePrev}>
            Back to registration options
        </Button>
        <h2>{content.personal_info_heading}</h2>
            <p>{content.personal_info_text}</p>

        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{content.personal_info_alert_text}</p>
            </div>
        </div>

        {nameVisible && (
            <>
                <Grid row gap>
                    <Grid tablet={{ col: true }}>
                    <Label htmlFor="title-select">
                        Title
                    <Dropdown id="title-select" name="title-select" value={props.fieldData.title} onChange={props.saveFieldData('title')} autoComplete="off">
                        <option>- Select -{' '}</option>
                        <option value="Mr">Mr.</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms.</option>
                        <option value="Mrs">Mrs.</option>
                    </Dropdown>
                    </Label>
                    </Grid>

                    <Grid tablet={{ col: true }}>
                    <div className={(nameReq && handleErrors.first_name) ? 'error-container' : ''}>
                        <Label htmlFor="first-name">
                            First Name{nameReq && <span className='required-text'>*</span>}
                        <TextInput
                            id="first-name"
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

                    <Grid tablet={{ col: true }}>
                        <Label htmlFor="middle-name">
                            Middle Name(s)
                        <TextInput
                            id="middle-name"
                            name="middle-name"
                            value={props.fieldData.middle_name}
                            onChange={props.saveFieldData('middle_name')}
                            type="text" autoComplete="off"/>
                        </Label>
                    </Grid>
                </Grid>

                <Grid row gap>
                    <Grid tablet={{ col: true }}>
                    <div className={(nameReq && handleErrors.last_name) ? 'error-container' : ''}>
                        <Label htmlFor="last-name">
                            Last Name{nameReq && <span className='required-text'>*</span>}
                        <TextInput
                            id="last-name"
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

                    <Grid tablet={{ col: true }}>
                    <Label htmlFor="suffix-select">
                        Suffix
                    <Dropdown id="suffix-select" name="suffix-select" value={props.fieldData.suffix} onChange={props.saveFieldData('suffix')} autoComplete="off" required={nameReq}>
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

        {changeRegistrationVisible && (
            <Checkbox id="legal-name-change" name="legal-name-change" checked={hasPreviousName} onChange={onChangePreviousNameCheckbox} label="I have legally changed my name since the last time I registered to vote." />
        )}

        {hasPreviousName && (

            <div value={previousName} onChange={onChangePreviousName}>
                <h3>Previous Name</h3>
            <Grid row gap>
                <Grid tablet={{ col: true }}>
                <Label htmlFor="title-select-2">
                    Title
                <Dropdown id="title-select-2" name="title-select-2" value={props.fieldData.prev_title} onChange={props.saveFieldData('prev_title')} autoComplete="off">
                    <option>- Select -{' '}</option>
                    <option value="Mr">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms">Ms.</option>
                    <option value="Mrs">Mrs.</option>
                </Dropdown>
                </Label>
                </Grid>

                <Grid tablet={{ col: true }}>
                <div className={(nameReq && handleErrors.prev_first_name) ? 'error-container' : ''}>
                    <Label htmlFor="first-name-2">
                        First Name{nameReq && <span className='required-text'>*</span>}
                    <TextInput
                        id="first-name-2"
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

                <Grid tablet={{ col: true }}>
                    <Label htmlFor="middle-name-2">
                        Middle Name
                    <TextInput
                        id="middle-name-2"
                        name="middle-name-2"
                        value={props.fieldData.prev_middle_name}
                        onChange={props.saveFieldData('prev_middle_name')}
                        type="text" autoComplete="off"/>
                    </Label>
                </Grid>
            </Grid>

            <Grid row gap>
                <Grid tablet={{ col: true }}>
                <div className={(nameReq && handleErrors.prev_last_name) ? 'error-container' : ''}>
                    <Label htmlFor="last-name-2">
                        Last Name{nameReq && <span className='required-text'>*</span>}
                    <TextInput
                        id="last-name-2"
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

                <Grid tablet={{ col: true }}>
                <Label htmlFor="suffix-select-2">
                    Suffix
                <Dropdown id="suffix-select-2" name="suffix-select-2" value={props.fieldData.prev_suffix} onChange={props.saveFieldData('prev_suffix')} autoComplete="off" required={nameReq}>
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
            </div>
        )}

            <Grid row gap>

        {dobVisible && (
        <Grid tablet={{ col: true }}>
            <div className={(dobReq && handleErrors.dob) ? 'error-container' : ''}>
            <Fieldset className="fieldset" legend={dobReq ? ["Date of Birth", <span key={1} className='required-text'>*</span>] : "Date of Birth"} style={{ marginTop:'30px'}}>
                    <span className="usa-hint" id="date-of-birth-hint">
                    For example: January 19 2000
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
                        <div className="usa-form-group usa-form-group--month usa-form-group--select">
                        <label className="usa-label" htmlFor="date_of_birth_month">
                            Month
                        <select
                            className="usa-select"
                            id="date_of_birth_month"
                            name="date_of_birth_month"
                            aria-describedby="dob-error"
                            required={true}
                            value={props.fieldData.date_of_birth_month}
                            onInput={props.saveFieldData('date_of_birth_month')}
                            onChange={(e) => {focusNext(e, "date_of_birth_day", "month")}}
                        >
                            <option value="">- Select -</option>
                            <option value="01">01 - January</option>
                            <option value="02">02 - February</option>
                            <option value="03">03 - March</option>
                            <option value="04">04 - April</option>
                            <option value="05">05 - May</option>
                            <option value="06">06 - June</option>
                            <option value="07">07 - July</option>
                            <option value="08">08 - August</option>
                            <option value="09">09 - September</option>
                            <option value="10">10 - October</option>
                            <option value="11">11 - November</option>
                            <option value="12">12 - December</option>
                        </select>
                        </label>
                        </div>
                        <div data-testid="formGroup" className="usa-form-group usa-form-group--day">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Day
                            <input
                                id="date_of_birth_day"
                                className="usa-input"
                                aria-describedby="dob-error"
                                name="date_of_birth_day"
                                label="Day"
                                unit="day"
                                required={true}
                                type="number"
                                inputMode="numeric"
                                min={1}
                                max={31}
                                minLength={2}
                                maxLength={2}
                                value={props.fieldData.date_of_birth_day}
                                onInput={props.saveFieldData('date_of_birth_day')}
                                onChange={(e) => {focusNext(e, "date_of_birth_year"), restrictLength(e, e.target.value, e.target.maxLength) }}
                            />
                            </label>
                        </div>
                        <div data-testid="formGroup" className="usa-form-group usa-form-group--year">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Year
                            <input
                                id="date_of_birth_year"
                                className="usa-input"
                                aria-describedby="dob-error"
                                name="date_of_birth_year"
                                label="Year"
                                unit="year"
                                required={true}
                                type="text"
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
                <span id="dob-error" rol="alert" className='error-text'>
                    Date of Birth must follow the format of January 19 2000.
                </span>
            }
            </Fieldset>
            </div>
        </Grid>
        )}



        {telephoneVisible && (
            <Grid tablet={{ col: true }} className="input-example">
                <div className={(telephoneReq && handleErrors.phone_number) ? 'error-container bottom' : 'bottom'}>
                    <Label htmlFor="phone-number">Phone Number{telephoneReq && <span className='required-text'>*</span>}</Label>
                    <span className="usa-hint" id="date-of-birth-hint">For example: (123) 456-7890</span>
                    <TextInput
                        id="phone-number"
                        aria-describedby="phone-number-error"
                        name="phone-number"
                        type="text"
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
            </Grid>
        )}

            </Grid>

        {raceVisible && (
            <div>
                <p>{content.race_text} {stateInstructions.race_text}</p>
                <Label htmlFor="race-ethic-group-select">Race</Label>
                <Dropdown id="race-ethic-group-select" name="race-ethic-group-select" value={props.fieldData.race} onChange={props.saveFieldData('race')} autoComplete="off" required={raceReq}>
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
            <Button type="submit">
                Continue to address & location
            </Button>
        </>
    );
}

export default PersonalInfo;
