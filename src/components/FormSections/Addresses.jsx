import { Label, TextInput, Button, Checkbox, Grid } from '@trussworks/react-uswds';
import StateSelector from '../StateSelector';
import React, { useState } from "react";
import states from "../../data/states.json";
import content from "../../data/registration-form.json";
import { restrictType, checkForErrors } from '../HelperFunctions/ValidateField';
import "../../styles/pages/Form.css";

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
        <h3>{content.address_heading}</h3>

        {addressVisible && (
            <div>
                { changeRegistrationVisible && (
                    <div>
                        <Checkbox id="prev-res-addr" name="prev-res-addr" checked={props.hasPreviousAddress} onChange={props.onChangePreviousAddressCheckbox} label={content.previous_address_checkbox_label} />
                    </div>
                )}
                <Checkbox id="no-addr" name="no-addr" checked={props.hasNoAddress} onChange={props.hasNoAddressCheckbox} label={content.no_address_checkbox_label} />
                {/******** Current Address Block *********/}
                { !props.hasNoAddress && (<div>
                    <div className="usa-alert usa-alert--info">
                        <div className="usa-alert__body">
                            <p>{content.home_address_section_text_1}</p>
                            {!changeRegistrationVisible &&
                                <p>{content.home_address_section_text_2}</p>
                            }
                        </div>
                    </div>
                    <h3>{content.home_address_heading}</h3>

                    <Grid row gap>
                        <Grid tablet={{ col: true }}>
                        <div className={(addressReq && handleErrors.street) ? 'error-container' : ''}>
                            <Label htmlFor="street-address">
                                {content.street_address_label}{addressReq && <span className='required-text'>*</span>}
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
                                <span id="street-address-error" role="alert" className='error-text'>
                                    {content.street_address_error}
                                </span>
                            }
                            </Label>
                        </div>
                        </Grid>
                    </Grid>

                    <Grid row gap>
                        <Grid tablet={{ col: true }}>
                        <Label htmlFor="apt-num">
                            {content.apt_label}
                        <TextInput
                            id="apt-num"
                            name="apt-num"
                            type="text"
                            autoComplete="off"
                            value={props.fieldData.apt_num}
                            onChange={props.saveFieldData('apt_num')}
                        />
                        </Label>
                        </Grid>
                    </Grid>

                    <Grid row gap>
                        <Grid tablet={{ col: true }}>
                        <div className={(addressReq && handleErrors.city) ? 'error-container bottom' : 'bottom'}>
                            <Label htmlFor="city">
                                {content.city_label}{addressReq && <span className='required-text'>*</span>}
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
                                <span id="city-error" role="alert" className='error-text'>
                                    {content.city_error}
                                </span>
                            }
                            </Label>
                        </div>
                        </Grid>

                        <Grid tablet={{ col: true }}>
                        <Label htmlFor="state" className="bottom">
                            {content.state_label}
                        <StateSelector
                            statesList={statesList}
                            state={props.stateData.name}
                            saveState={props.saveFieldData('state')}
                            autoComplete="off"
                            disabled={true}
                            required={addressReq}
                        />
                        </Label>
                        </Grid>

                        <Grid tablet={{ col: true }}>
                        <div className={(addressReq && handleErrors.zip) ? 'error-container' : ''}>
                            <Label htmlFor="zip">{content.zipcode_label} {addressReq && <span className={'required-text'}>*</span>}</Label>
                            <span className="usa-hint" id="zip-hint">{content.zipcode_hint}</span>
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
                                    <span id="zip-error" role="alert" className='error-text'>
                                        {content.zipcode_error}
                                    </span>
                            }
                        </div>
                        </Grid>
                    </Grid>
                    <Checkbox id="alt-mail-addr" name="alt-mail-addr" checked={props.hasMailAddress} onChange={props.onChangeMailAddressCheckbox} label="I get my mail at a different address from the one above." />
                </div>
                )}
                {/******* END BLOCK *********/}

                {/******* MAIL ADDRESS BLOCK ********/}
                {(props.hasMailAddress || props.hasNoAddress) && (
                    <>
                        {props.hasNoAddress && (
                        <div className="usa-alert usa-alert--info">
                            <div className="usa-alert__body">
                                <p>{content.mailing_address_text_2}</p>
                            </div>
                        </div>)}
                        <h3>{content.mail_address_heading}</h3>
                        <p>{content.mailing_address_text}</p>

                        <Grid row gap>
                            <Grid tablet={{ col: true }}>
                            <div className={(addressReq && handleErrors.mail_street) ? 'error-container' : ''}>
                            <Label htmlFor="mail-street">
                                {content.mail_address_label}{addressReq && <span className='required-text'>*</span>}
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
                                    <span id="mail-street-error" role="alert" className='error-text'>
                                        {content.mail_address_error}
                                    </span>
                                }
                            </Label>
                            </div>
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid tablet={{ col: true }}>
                            <Label htmlFor="mail-apt">
                                {content.apt_label}
                            <TextInput
                                id="mail-apt"
                                name="mail-apt"
                                type="text"
                                autoComplete="off"
                                value={props.fieldData.mail_apt_num}
                                onChange={props.saveFieldData('mail_apt_num')}
                            />
                            </Label>
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid tablet={{ col: true }}>
                            <div className={(addressReq && handleErrors.mail_city) ? 'error-container bottom' : 'bottom'}>
                                <Label htmlFor="mail-city">
                                    {content.city_label}{addressReq && <span className='required-text'>*</span>}
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
                                    <span id="mail-city-error" role="alert" className='error-text'>
                                       {content.city_error}
                                    </span>
                                }
                                </Label>
                            </div>
                            </Grid>

                            <Grid tablet={{ col: true }}>
                                <div className={(addressReq && handleErrors.mail_state) ? 'error-container bottom' : 'bottom'}>
                                <Label htmlFor="mail-state">
                                    {content.state_label}{addressReq && <span className='required-text'>*</span>}
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
                                    <span id="mail-state-error" role="alert" className='error-text'>
                                        {content.mail_state_error}
                                    </span>
                                }
                                </Label>
                                </div>
                            </Grid>

                            <Grid tablet={{ col: true }}>
                            <div className={(addressReq && handleErrors.mail_zip) ? 'error-container' : ''}>
                                <Label htmlFor="mail-zip">{content.zipcode_label} {addressReq && <span className={'required-text'}>*</span>}</Label>
                                <span className="usa-hint" id="mail-zip-hint">For example: 12345</span>
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
                                    <span id="mail-zip-error" role="alert" className='error-text'>
                                    {content.zipcode_error}
                                    </span>
                                }
                            </div>
                            </Grid>
                        </Grid>
                    </>
                )}
                {/******* END BLOCK *********/}

                {/******* PREVIOUS ADDRESS BLOCK ********/}
                {props.hasPreviousAddress && (
                    <>
                        <h3>{content.previous_address_heading}</h3>
                        <p>{content.previous_address_text}</p>
                        <Grid row gap>
                            <Grid tablet={{ col: true }}>
                            <div className={(addressReq && handleErrors.prev_street) ? 'error-container' : ''}>
                                <Label htmlFor="prev-street">
                                    {content.street_address_label}{addressReq && <span className='required-text'>*</span>}
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
                                    <span id="prev-street-error" role="alert" className='error-text'>
                                        {content.prev_street_address_error}
                                    </span>
                                }
                                </Label>
                            </div>
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid tablet={{ col: true }}>
                            <Label htmlFor="prev-apt">
                                {content.apt_label}
                            <TextInput
                                id="prev-apt"
                                name="prev-apt"
                                type="text"
                                autoComplete="off"
                                value={props.fieldData.prev_apt_num}
                                onChange={props.saveFieldData('prev_apt_num')}
                                />
                            </Label>
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid tablet={{ col: true }}>
                            <div className={(addressReq && handleErrors.prev_city) ? 'error-container bottom' : 'bottom'}>
                                <Label htmlFor="prev-city">
                                    City{addressReq && <span className='required-text'>*</span>}
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
                                    <span id="prev-city-error" role="alert" className='error-text'>
                                        {content.city_error}
                                    </span>
                                }
                                </Label>
                            </div>
                            </Grid>

                        <Grid tablet={{ col: true }}>
                            <div className={(addressReq && handleErrors.prev_state) ? 'error-container bottom' : 'bottom'}>
                                <Label htmlFor="prev-state">
                                    {content.state_label}{addressReq && <span className='required-text'>*</span>}
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
                                    <span id="prev-state-error" role="alert" className='error-text'>
                                        {content.prev_state_error}
                                    </span>
                                }
                                </Label>
                            </div>
                        </Grid>

                            <Grid tablet={{ col: true }}>
                            <div className={(addressReq && handleErrors.prev_zip) ? 'error-container' : ''}>
                                <Label htmlFor="prev-zip">{content.zipcode_label} {addressReq && <span className={'required-text'}>*</span>}</Label>
                                <span className="usa-hint" id="prev-zip-hint">For example: 12345</span>
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
                                    <span id="prev-zip-error" role="alert" className='error-text'>
                                        {content.zipcode_error}
                                    </span>
                                }
                            </div>
                            </Grid>
                        </Grid>
                    </>
                )}
                {/******* END BLOCK *********/}
            </div>
        )}
        </>
    );
}

export default Addresses;