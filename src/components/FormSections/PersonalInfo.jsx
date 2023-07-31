import { Form, Label, TextInput, Button, Dropdown,Checkbox, DateInputGroup, DateInput, Fieldset} from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/registration-form.json";
import { dayValidate, monthValidate, yearValidate, focusNext } from './ValidateField';

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

    const [dateValid, setDateValid] = useState({ day: false, month: false, year: false });
    const [phoneValid, setPhoneValid] = useState(false)

     //Previous name fields controls
     const [hasPreviousName, setHasPreviousName] = useState(false);
     const onChangePreviousNameCheckbox = (e) => {
         setHasPreviousName(e.target.checked);
     }

     const [previousName, setPreviousName] = useState("");
     const onChangePreviousName = (e) => {
         setPreviousName(e.target.value);
     }

    return (
        <>
        <Button
            type="button"
            onClick={props.handlePrev}>
            Back to registration options
        </Button>
        <h2>{content.personal_info_heading}</h2>
        {!changeRegistrationVisible &&
            <p>{content.personal_info_text}</p>
        }
        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{content.personal_info_alert_text}</p>
            </div>
        </div>

        {nameVisible && (
            <div>
                <Label htmlFor="title-select">Title</Label>
                <Dropdown id="title-select" name="title-select" value={props.fieldData.title} onChange={props.saveFieldData('title')} autoComplete="off">
                    <option>- Select -{' '}</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                </Dropdown>

                <Label htmlFor="first-name">First Name</Label>
                <TextInput id="first-name" name="first-name" value={props.fieldData.first_name} onChange={props.saveFieldData('first_name')} type="text" autoComplete="off" required={nameReq}/>

                <Label htmlFor="middle-name">Middle Name(s)</Label>
                <TextInput id="middle-name" name="middle-name" value={props.fieldData.middle_name} onChange={props.saveFieldData('middle_name')} type="text" autoComplete="off"/>

                <Label htmlFor="last-name">Last Name</Label>
                <TextInput id="last-name" name="last-name" value={props.fieldData.last_name} onChange={props.saveFieldData('last_name')} type="text" autoComplete="off" required={nameReq}/>

                <Label htmlFor="suffix-select">Suffix</Label>
                <Dropdown id="suffix-select" name="suffix-select" value={props.fieldData.suffix} onChange={props.saveFieldData('suffix')} autoComplete="off" required={nameReq}>
                    <option>- Select -{' '}</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                </Dropdown>
            </div>
        )}

        {changeRegistrationVisible && (
            <Checkbox id="legal-name-change" name="legal-name-change" checked={hasPreviousName} onChange={onChangePreviousNameCheckbox} label="I have legally changed my name since the last time I registered to vote." />
        )}

        {hasPreviousName && (
            <div value={previousName} onChange={onChangePreviousName}>
                <h3>Previous Name</h3>
                <Label htmlFor="title-select-2">Title</Label>
                <Dropdown id="title-select-2" name="title-select-2" value={props.fieldData.prev_title} onChange={props.saveFieldData('prev_title')} autoComplete="off">
                    <option>- Select -{' '}</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                </Dropdown>

                <Label htmlFor="first-name-2">First Name</Label>
                <TextInput id="first-name-2" name="first-name-2" value={props.fieldData.prev_first_name} onChange={props.saveFieldData('prev_first_name')} type="text" autoComplete="off" required={nameReq}/>

                <Label htmlFor="middle-name-2">Middle Name</Label>
                <TextInput id="middle-name-2" name="middle-name-2" value={props.fieldData.prev_middle_name} onChange={props.saveFieldData('prev_middle_name')} type="text" autoComplete="off" required={nameReq}/>

                <Label htmlFor="last-name-2">Last Name</Label>
                <TextInput id="last-name-2" name="last-name-2" value={props.fieldData.prev_last_name} onChange={props.saveFieldData('prev_last_name')} type="text" autoComplete="off" required={nameReq}/>

                <Label htmlFor="suffix-select-2">Suffix</Label>
                <Dropdown id="suffix-select-2" name="suffix-select-2" value={props.fieldData.prev_suffix} onChange={props.saveFieldData('prev_suffix')} autoComplete="off" required={nameReq}>
                    <option>- Select -{' '}</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                </Dropdown>
            </div>
        )}

        {dobVisible && (
            <div>
                <Fieldset legend="Date of Birth" style={{ marginTop:'30px'}}>
                    <span className="usa-hint" id="date-of-birth-hint">
                    For example: 04 28 1986
                    </span>
                    <div id="date-of-birth"className="usa-memorable-date" name="date-of-birth" autoComplete="off" required={dobReq} data-testid="dateInputGroup">
                        <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Month
                            </label>
                            <input 
                                id="date_of_birth_month"
                                className="usa-input"
                                name="date_of_birth_month"
                                label="Month"
                                unit="month"
                                required={true}
                                type="text" inputMode="numeric" pattern="[0-9]{2}"
                                value={props.fieldData.date_of_birth_month} 
                                onChange={props.saveFieldData('date_of_birth_month')}
                                onKeyUp={(e) => 
                                    setDateValid({...dateValid, month: dayValidate(e.target.value)},
                                    focusNext(e.target.id, e.target.value, e.target.maxLength, "date_of_birth_day")
                                )}
                                minLength={2}
                                maxLength={2}
                            />
                        </div>
                        <div data-testid="formGroup" className="usa-form-group usa-form-group--day">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Day
                            </label>
                            <input 
                                id="date_of_birth_day"
                                className="usa-input"
                                name="date_of_birth_day"
                                label="Day"
                                unit="day"
                                required={true}
                                type="text" inputMode="numeric" pattern="[0-9]{2}"
                                value={props.fieldData.date_of_birth_day} 
                                onChange={props.saveFieldData('date_of_birth_day')}
                                onKeyUp={(e) => 
                                    setDateValid({...dateValid, day: monthValidate(e.target.value)},
                                    focusNext(e.target.id, e.target.value, e.target.maxLength, "date_of_birth_year")
                                )}
                                minLength={2}
                                maxLength={2}
                            />
                        </div>
                        <div data-testid="formGroup" className="usa-form-group usa-form-group--year">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Year
                            </label>
                            <input 
                                id="date_of_birth_year"
                                className="usa-input"
                                name="date_of_birth_year"
                                label="Year"
                                unit="year"
                                required={true}
                                type="text" inputMode="numeric" pattern="[1-9][0-9]{3}"
                                value={props.fieldData.date_of_birth_year} 
                                onChange={props.saveFieldData('date_of_birth_year')}
                                onKeyUp={(e) => setDateValid({...dateValid, year: yearValidate(e.target.value)})}
                                minLength={4}
                                maxLength={4}
                            />
                        </div>
                    </div>
                    <p>{!dateValid.day && "*day value is invlaid"}</p>
                    <p>{!dateValid.month && "*month value is invlaid"}</p>
                    <p>{!dateValid.year && "*year value is invlaid"}</p>
                </Fieldset>
            </div>
        )}

        {telephoneVisible && (
            <div>
                <Label htmlFor="phone-number">Phone Number (123)456-7890</Label>
                <TextInput 
                    id="phone-number" 
                    name="phone-number" 
                    value={props.fieldData.phone_number} 
                    onChange={props.saveFieldData('phone_number')} 
                    onKeyUp={(e) => setPhoneValid(e.target.value.length == 12)}
                    type="text" autoComplete="off" 
                    required={telephoneReq}
                    maxLength={14}
                    minLength={14}
                />
                <p>{!phoneValid && "*phone number requires 10 digits"}</p>
            </div>
        )}

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
            <Button
                type="button"
                onClick={props.handleNext}>
                Continue to address & location
            </Button> 
        </>
    );
}

export default PersonalInfo;
