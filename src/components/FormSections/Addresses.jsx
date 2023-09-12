import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import StateSelector from '../StateSelector';
import React, { useState } from "react";
import states from "../../data/states.json";
import content from "../../data/registration-form.json";
import { restrictLength, restrictType, checkForErrors } from './ValidateField';
import validationStyles from "../../styles/ValidationStyles.module.css";

function Addresses(props){
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;

    const addressReq = stateFieldRequirements.address;
    const mailAddressReq = stateFieldRequirements.mailing_address;
    const addressVisible = stateFieldVisible.address;
    const mailAddressVisible = stateFieldVisible.mailing_address;

    const [handleErrors, setHandleErrors] = useState({ 
        street: false, 
        city: false,
        zip: false,
        prev_street: false, 
        prev_city: false,
        prev_state: false,
        prev_zip: false,
        mail_street: false, 
        mail_city: false,
        mail_state: false,
        mail_zip: false,
    })

    const checkStateValue=(name)=> {
        if (name === 'prev_state') {
            console.log(props.fieldData.prev_state)
            props.fieldData.prev_state ?  
            setHandleErrors({ ...handleErrors, prev_state: (false) }) 
            :
            setHandleErrors({ ...handleErrors, prev_state: (true) })
        } else if (name === 'mail_state') {
            props.fieldData.mail_state ?  
            setHandleErrors({ ...handleErrors, mail_state: (false) }) 
            :
            setHandleErrors({ ...handleErrors, mail_state: (true) })
     }
    }

    //states list
    const statesList = []
    for (let i = 0; i < states.length; i++) {
        let stateName = states[i].name;
        statesList.push(stateName);
    };

    return (
        <>
        <Button
            type="button"
            onClick={props.handlePrev}>
            Back to personal information
        </Button>
        <h2>{content.address_heading}</h2>
        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{content.home_address_section_text_1}</p>
                {!changeRegistrationVisible &&
                    <p>{content.home_address_section_text_2}</p>
                }
            </div>
        </div>

        {addressVisible && (
            <div>
                <Checkbox id="no-addr" name="no-addr" checked={props.hasNoAddress} onChange={props.hasNoAddressCheckbox} label="I live in a rural area and do not have a street address, or do not have an address." />
                { !props.hasNoAddress && (<div>
                    <h3>{content.home_address_heading}</h3>
                    <p>{content.home_address_field_text_1}</p>

                    <div className={validationStyles[(addressReq && handleErrors.street) && 'error-container']}>
                        <Label htmlFor="street-address">
                            Street Address{addressReq && <span className={validationStyles['required-text']}>*</span>}
                        <TextInput 
                            id="street-address" 
                            aria-describedby="street-address-error"
                            name="street-address" 
                            type="text" 
                            autoComplete="off" 
                            required={addressReq}
                            value={props.fieldData.street_address} 
                            onChange={props.saveFieldData('street_address')} 
                            onBlur={(e) => setHandleErrors({ ...handleErrors, street: checkForErrors(e, 'check value exists') })}
                            />
                        {(addressReq && handleErrors.street) && 
                            <span id="street-address-error" role="alert" className={validationStyles['error-text']}>
                                Street Address must be filled out.
                            </span>
                        }
                        </Label>
                    </div>

                    <Label htmlFor="apt-num">
                        Apartment or Lot #
                    <TextInput 
                        id="apt-num" 
                        name="apt-num" 
                        type="text" 
                        autoComplete="off"
                        value={props.fieldData.apt_num} 
                        onChange={props.saveFieldData('apt_num')} 
                    />
                    </Label>

                    <div className={validationStyles[(addressReq && handleErrors.city) && 'error-container']}>
                        <Label htmlFor="city">
                            City{addressReq && <span className={validationStyles['required-text']}>*</span>}
                        <TextInput 
                            id="city" 
                            aria-describedby="city-error"
                            name="city" 
                            value={props.fieldData.city} 
                            type="text" 
                            autoComplete="off" 
                            required={addressReq}
                            onChange={props.saveFieldData('city')} 
                            onKeyDown={(e) => restrictType(e, 'letters')}
                            onBlur={(e) => setHandleErrors({ ...handleErrors, city: checkForErrors(e, 'check value exists') })}
                            />
                        {(addressReq && handleErrors.city) && 
                            <span id="city-error" role="alert" className={validationStyles['error-text']}>
                                City name must be filled out.
                            </span>
                        }
                        </Label>
                    </div>

                    <Label htmlFor="state">
                        State
                    <StateSelector 
                        statesList={statesList} 
                        state={props.stateData.name} 
                        saveState={props.saveFieldData('state')} 
                        autoComplete="off" 
                        disabled={true} 
                        required={addressReq}
                    />
                    </Label>

                    <div className={validationStyles[(addressReq && handleErrors.zip) && 'error-container']}>
                        <legend htmlFor="zip" class="usa-legend">Zip Code {addressReq && <span className={validationStyles['required-text']}>*</span>}</legend>
                        <span class="usa-hint" id="date-of-birth-hint">For example: 12345</span>
                        <TextInput 
                            id="zip" 
                            aria-describedby="zip-error"
                            name="zip" 
                            type="text" 
                            inputMode="numeric" 
                            autoComplete="off" 
                            required={addressReq} 
                            minLength={5} 
                            maxLength={5}
                            value={props.fieldData.zip_code} 
                            onChange={props.saveFieldData('zip_code')} 
                            onKeyDown={(e) => restrictType(e, 'number')} 
                            onBlur={(e) => setHandleErrors({ ...handleErrors, zip: checkForErrors(e, 'check value length') })}
                        />
                        {(addressReq && handleErrors.zip) && 
                                <span id="zip-error" role="alert" className={validationStyles['error-text']}>
                                    Zip Code must be 5 digits.
                                </span>
                        }
                    </div>

                    { changeRegistrationVisible && (
                        <div>
                            <Checkbox id="prev-res-addr" name="prev-res-addr" checked={props.hasPreviousAddress} onChange={props.onChangePreviousAddressCheckbox} label="I have a previous residential address." />
                            {props.hasPreviousAddress && (
                                <div value={props.previousAddress} onChange={props.onChangePreviousAddress}>
                                    <h3>{content.previous_address_heading}</h3>
                                    <div className={validationStyles[(addressReq && handleErrors.prev_street) && 'error-container']}>
                                        <Label htmlFor="prev-street">
                                            Street Address{addressReq && <span className={validationStyles['required-text']}>*</span>}
                                        <TextInput 
                                            id="prev-street" 
                                            aria-describedby="prev-street-error"
                                            name="prev-street" 
                                            type="text" 
                                            autoComplete="off" 
                                            required={addressReq}
                                            value={props.fieldData.prev_street_address} 
                                            onChange={props.saveFieldData('prev_street_address')} 
                                            onBlur={(e) => setHandleErrors({ ...handleErrors, prev_street: checkForErrors(e, 'check value exists') })}
                                        />
                                        {(addressReq && handleErrors.prev_street) && 
                                            <span id="prev-street-error" role="alert" className={validationStyles['error-text']}>
                                                Previous Street address must be filled out.
                                            </span>
                                        }
                                        </Label>
                                    </div>

                                    <Label htmlFor="prev-apt">
                                        Apartment or Lot #
                                    <TextInput 
                                        id="prev-apt" 
                                        name="prev-apt" 
                                        type="text" 
                                        autoComplete="off"
                                        value={props.fieldData.prev_apt_num} 
                                        onChange={props.saveFieldData('prev_apt_num')} 
                                        />
                                    </Label>

                                    <div className={validationStyles[(addressReq && handleErrors.prev_city) && 'error-container']}>
                                        <Label htmlFor="prev-city">
                                            City{addressReq && <span className={validationStyles['required-text']}>*</span>}
                                        <TextInput 
                                            id="prev-city" 
                                            aria-describedby="prev-city-error"
                                            name="prev-city" 
                                            type="text" 
                                            autoComplete="off" 
                                            required={addressReq}
                                            value={props.fieldData.prev_city} 
                                            onChange={props.saveFieldData('prev_city')} 
                                            onKeyDown={(e) => restrictType(e, 'letters')}
                                            onBlur={(e) => setHandleErrors({ ...handleErrors, prev_city: checkForErrors(e, 'check value exists') })}
                                        />
                                        {(addressReq && handleErrors.prev_city) && 
                                            <span id="prev-city-error" role="alert" className={validationStyles['error-text']}>
                                                Previous City name must be filled out.
                                            </span>
                                        }
                                        </Label>
                                    </div>

                                    <div className={validationStyles[(addressReq && handleErrors.prev_state) && 'error-container']}>
                                        <Label htmlFor="prev-state">
                                            State{addressReq && <span className={validationStyles['required-text']}>*</span>}
                                        <StateSelector 
                                            id="prev-state" 
                                            ariaDescribedby="prev-state-error"
                                            autoComplete="off" 
                                            required={addressReq}
                                            statesList={statesList} 
                                            state={props.fieldData.prev_state} 
                                            saveState={props.saveFieldData('prev_state')} 
                                            onBlur={(e) => checkStateValue('prev_state')}
                                        />
                                        {(addressReq && handleErrors.prev_state) && 
                                            <span id="prev-state-error" role="alert" className={validationStyles['error-text']}>
                                                Previous State selection must be made.
                                            </span>
                                        }
                                        </Label>
                                    </div>

                                    <div className={validationStyles[(addressReq && handleErrors.prev_zip) && 'error-container']}>
                                        <legend htmlFor="prev-zip" class="usa-legend">Zip Code {addressReq && <span className={validationStyles['required-text']}>*</span>}</legend>
                                        <span class="usa-hint" id="date-of-birth-hint">For example: 12345</span>
                                        <TextInput 
                                            id="prev-zip" 
                                            aria-describedby="prev-zip-error"
                                            name="prev-zip" 
                                            value={props.fieldData.prev_zip_code} 
                                            type="text" 
                                            inputMode="numeric" 
                                            autoComplete="off" 
                                            required={addressReq} 
                                            minLength={5} 
                                            maxLength={5}
                                            onChange={props.saveFieldData('prev_zip_code')} 
                                            onKeyDown={(e) => restrictType(e, 'number')} 
                                            onBlur={(e) => setHandleErrors({ ...handleErrors, prev_zip: checkForErrors(e, 'check value length') })}
                                        />
                                        {(addressReq && handleErrors.prev_zip) && 
                                            <span id="prev-zip-error" role="alert" className={validationStyles['error-text']}>
                                                Previous Zip Code must be 5 digits.
                                            </span>
                                        }
                                    </div>
                                </div>
                            )}
                            <Checkbox id="alt-mail-addr" name="alt-mail-addr" checked={props.hasMailAddress} onChange={props.onChangeMailAddressCheckbox} label="I get my mail at a different address from the one above." />
                            {props.hasMailAddress && (
                                <div value={props.mailAddress} onChange={props.onChangeMailAddress}>
                                    <h3>{content.mail_address_heading}</h3>
                                    <p>{content.mailing_address_text}</p>
                                
                                    <div className={validationStyles[(addressReq && handleErrors.mail_street) && 'error-container']}>
                                    <Label htmlFor="mail-street">
                                        Street Address (or route and box number){addressReq && <span className={validationStyles['required-text']}>*</span>}
                                        <TextInput 
                                            id="mail-street" 
                                            aria-describedby="mail-street-error"
                                            name="mail-street" 
                                            type="text" 
                                            autoComplete="off" 
                                            required={addressReq}
                                            value={props.fieldData.mail_street_address} 
                                            onChange={props.saveFieldData('mail_street_address')} 
                                            onBlur={(e) => setHandleErrors({ ...handleErrors, mail_street: checkForErrors(e, 'check value exists') })}
                                        />
                                        {(addressReq && handleErrors.mail_street) && 
                                            <span id="mail-street-error" role="alert" className={validationStyles['error-text']}>
                                                Mailing Street Address must be filled out.
                                            </span>
                                        }
                                    </Label>
                                    </div>

                                    <Label htmlFor="mail-apt">
                                        Apartment or Lot #
                                    <TextInput 
                                        id="mail-apt" 
                                        name="mail-apt" 
                                        type="text" 
                                        autoComplete="off"
                                        value={props.fieldData.mail_apt_num} 
                                        onChange={props.saveFieldData('mail_apt_num')} 
                                    />
                                    </Label>

                                    <div className={validationStyles[(addressReq && handleErrors.mail_city) && 'error-container']}>
                                        <Label htmlFor="mail-city">
                                            City{addressReq && <span className={validationStyles['required-text']}>*</span>}
                                        <TextInput 
                                            id="mail-city" 
                                            aria-describedby="mail-city-error"
                                            name="mail-city" 
                                            type="text" 
                                            autoComplete="off" 
                                            required={addressReq}
                                            value={props.fieldData.mail_city} 
                                            onChange={props.saveFieldData('mail_city')} 
                                            onKeyDown={(e) => restrictType(e, 'letters')}
                                            onBlur={(e) => setHandleErrors({ ...handleErrors, mail_city: checkForErrors(e, 'check value exists') })}
                                        />
                                        {(addressReq && handleErrors.mail_city) && 
                                            <span id="mail-city-error" role="alert" className={validationStyles['error-text']}>
                                                Mailing City name must be filled out.
                                            </span>
                                        }
                                        </Label>
                                    </div>

                                    <div className={validationStyles[(addressReq && handleErrors.mail_state) && 'error-container']}>
                                    <Label htmlFor="mail-state">
                                        State{addressReq && <span className={validationStyles['required-text']}>*</span>}
                                    <StateSelector 
                                        id="mail-state" 
                                        autoComplete="off" 
                                        ariaDescribedBy="mail-state-error"
                                        required={addressReq}
                                        statesList={statesList} 
                                        state={props.fieldData.mail_state} 
                                        saveState={props.saveFieldData('mail_state')} 
                                        onBlur={(e) => checkStateValue('mail_state')}
                                    />
                                    {(addressReq && handleErrors.mail_state) && 
                                        <span id="mail-state-error" role="alert" className={validationStyles['error-text']}>
                                            Mailing State selection must be made.
                                        </span>
                                    }
                                    </Label>
                                    </div>

                                    <div className={validationStyles[(addressReq && handleErrors.mail_zip) && 'error-container']}>
                                        <legend htmlFor="mail-zip" class="usa-legend">Zip Code {addressReq && <span className={validationStyles['required-text']}>*</span>}</legend>
                                        <span class="usa-hint" id="date-of-birth-hint">For example: 12345</span>
                                        <TextInput 
                                            id="mail-zip"
                                            aria-describedby="mail-zip-error" 
                                            name="mail-zip" 
                                            value={props.fieldData.mail_zip_code} 
                                            type="text" 
                                            inputMode="numeric" 
                                            autoComplete="off" 
                                            required={addressReq} 
                                            minLength={5} 
                                            maxLength={5}
                                            onChange={props.saveFieldData('mail_zip_code')} 
                                            onKeyDown={(e) => restrictType(e, 'number')} 
                                            onBlur={(e) => setHandleErrors({ ...handleErrors, mail_zip: checkForErrors(e, 'check value length') })}
                                        />
                                        {(addressReq && handleErrors.mail_zip) && 
                                            <span id="mail-zip-error" role="alert" className={validationStyles['error-text']}>
                                               Mailing Zip Code must be 5 digits.
                                            </span>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>)}
            </div>
        )}
            <Button type="submit">
                Continue to identification
            </Button>
        </>
    );
}

export default Addresses;