import { Label, TextInput, Checkbox, Grid } from '@trussworks/react-uswds';
import StateSelector from '../StateSelector';
import React, { useState } from "react";
import { restrictType, checkForErrors } from '../HelperFunctions/ValidateField';
import FieldContainer from '../FieldContainer';

function Addresses(props){
    const headings = props.headings;
    const fields = props.fieldContent;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;
    const nvrfStateFields = props.stateData.nvrf_fields;

    //Drupal field data
    const homeAddressSectionField = fields.find(item => item.uuid === "63552bb6-6afb-46e1-8148-860242917a22");
    const streetAddressField = fields.find(item => item.uuid === "6dcb9e8c-b40a-4cda-ba5c-06b98c3375f4");
    const aptField = fields.find(item => item.uuid === "deba9b54-68ad-4ef1-8fb5-ee34e4ab8a49");
    const cityField = fields.find(item => item.uuid === "7e39a528-7518-40cb-b7b6-b635864dc117");
    const stateField = fields.find(item => item.uuid === "fe3a2a1d-34bd-472b-a843-3fa0635c4f40");
    const zipcodeField = fields.find(item => item.uuid === "cdb06542-0cbd-4aa3-897f-83377b8d65e5");

    const prevAddressSectionField = fields.find(item => item.uuid === "023fda0f-e8bd-4654-ab5c-46f44a0b7bd6");
    const prevAddressField = fields.find(item => item.uuid === "c3011c62-d174-420c-817a-bffbcd45687a");
    const prevStreetAddressField = fields.find(item => item.uuid === "c037a3ea-86b7-4661-ad28-c7228f1e682b");
    const prevAptField = fields.find(item => item.uuid === "c8e2ff17-fb1f-4971-a664-ffbb557b305a");
    const prevCityField = fields.find(item => item.uuid === "44bf0a5c-adba-4b47-bc99-cc46cede5e80");
    const prevStateField = fields.find(item => item.uuid === "5a8a4b6d-c0f1-42f2-b991-8ea49a32e997");
    const prevZipcodeField = fields.find(item => item.uuid === "49a90983-1925-438f-8271-88f39bf19bf1");

    const mailAddressSectionField = fields.find(item => item.uuid === "1a856408-6fb2-4b09-b05a-8d8ee9eb9bb5");
    const noAddressField = fields.find(item => item.uuid === "35c2b98d-477c-45f3-9f93-f720406080f1");
    const differentMailAddressField = fields.find(item => item.uuid === "e7340274-ee3f-4d73-a967-c9d7c249be7b");
    const mailStreetAddressField = fields.find(item => item.uuid === "db9b1f7a-565b-4aad-8d7c-56a553c18326");
    //const mailAptField = fields.find(item => item.uuid === ""); Uses aptField for now
    const mailCityField = fields.find(item => item.uuid === "9a5baee7-357b-4e59-b4f2-fe2525c0fd6c");
    const mailStateField = fields.find(item => item.uuid === "b0f80289-6084-4723-8278-110fda210f0d");
    const mailZipcodeField = fields.find(item => item.uuid === "c4f9c0cb-2a25-4f1d-a93a-b06a19656cfe");

    //Field requirements by state data
    const addressFieldsState = (nvrfStateFields.find(item => item.uuid === streetAddressField.uuid));

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

    const addressFields = {
        street: 
            <TextInput
                id="street-address"
                className="radius-md"
                aria-describedby="street-address-error"
                name="street-address"
                type="text"
                autoComplete="off"
                required={(parseInt(addressFieldsState.required))}
                value={props.fieldData.street_address}
                onChange={props.saveFieldData('street_address')}
                onBlur={(e) => setHandleErrors({ ...handleErrors, street: checkForErrors(e, 'check value exists') })}
            />,
        aptNum: 
            <TextInput
                id="apt-num"
                className="radius-md"
                // aria-describedby=""
                name="apt-num"
                type="text"
                autoComplete="off"
                value={props.fieldData.apt_num}
                onChange={props.saveFieldData('apt_num')}
            />,
        city:
            <TextInput
                id="city"
                className="radius-md"
                aria-describedby="city-error"
                name="city"
                value={props.fieldData.city}
                type="text"
                autoComplete="off"
                required={(parseInt(addressFieldsState.required))}
                onChange={props.saveFieldData('city')}
                onKeyDown={(e) => restrictType(e, 'letters')}
                onBlur={(e) => setHandleErrors({ ...handleErrors, city: checkForErrors(e, 'check value exists') })}
            />,
        state:
            <StateSelector
                classes="radius-md"
                id="state"
                // aria-describedby=""
                statesList={props.statesList}
                state={props.stateData.name}
                saveState={props.saveFieldData('state')}
                autoComplete="off"
                disabled={true}
                required={(parseInt(addressFieldsState.required))}
            />,
        zip: 
            <TextInput
                id="zip"
                className="radius-md"
                aria-describedby="zip-error"
                name="zip"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                required={(parseInt(addressFieldsState.required))}
                minLength={5}
                maxLength={5}
                value={props.fieldData.zip_code}
                onChange={props.saveFieldData('zip_code')}
                onKeyDown={(e) => restrictType(e, 'number')}
                onBlur={(e) => setHandleErrors({ ...handleErrors, zip: checkForErrors(e, 'check value length') })}
            />
    }

    const mailFields = {
        street:
            <TextInput
                id="mail-street"
                className="radius-md"
                aria-describedby="mail-street-error"
                name="mail-street"
                type="text"
                autoComplete="off"
                required={(parseInt(addressFieldsState.required))}
                value={props.fieldData.mail_street_address}
                onChange={props.saveFieldData('mail_street_address')}
                onBlur={(e) => setHandleErrors({ ...handleErrors, mail_street: checkForErrors(e, 'check value exists') })}
            />,
        city:
            <TextInput
                id="mail-city"
                className="radius-md"
                aria-describedby="mail-city-error"
                name="mail-city"
                type="text"
                autoComplete="off"
                required={(parseInt(addressFieldsState.required))}
                value={props.fieldData.mail_city}
                onChange={props.saveFieldData('mail_city')}
                onKeyDown={(e) => restrictType(e, 'letters')}
                onBlur={(e) => setHandleErrors({ ...handleErrors, mail_city: checkForErrors(e, 'check value exists') })}
            />,
        state:
            <StateSelector
                id="mail-state"
                classes="radius-md"
                autoComplete="off"
                ariaDescribedBy="mail-state-error"
                required={(parseInt(addressFieldsState.required))}
                statesList={props.statesList}
                state={props.fieldData.mail_state}
                saveState={props.saveFieldData('mail_state')}
                onBlur={(e) => {checkStateValue('mail_state'), setHandleErrors({ ...handleErrors, mail_state: checkForErrors(e, 'check value exists')})} }
            />,
        zip:
            <TextInput
                id="mail-zip"
                className="radius-md"
                aria-describedby="mail-zip-error"
                name="mail-zip"
                value={props.fieldData.mail_zip_code}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                required={(parseInt(addressFieldsState.required))}
                minLength={5}
                maxLength={5}
                onChange={props.saveFieldData('mail_zip_code')}
                onKeyDown={(e) => restrictType(e, 'number')}
                onBlur={(e) => setHandleErrors({ ...handleErrors, mail_zip: checkForErrors(e, 'check value length') })}
            />
    }

    const prevAddressFields = {
        street:
            <TextInput
                id="prev-street"
                className="radius-md"
                aria-describedby="prev-street-error"
                name="prev-street"
                type="text"
                autoComplete="off"
                required={(parseInt(addressFieldsState.required))}
                value={props.fieldData.prev_street_address}
                onChange={props.saveFieldData('prev_street_address')}
                onBlur={(e) => setHandleErrors({ ...handleErrors, prev_street: checkForErrors(e, 'check value exists') })}
            />,
        aptNum:
            <TextInput
                id="prev-apt"
                className="radius-md"
                name="prev-apt"
                // aria-describedby=""
                type="text"
                autoComplete="off"
                value={props.fieldData.prev_apt_num}
                onChange={props.saveFieldData('prev_apt_num')}
            />,
        city:
            <TextInput
                id="prev-city"
                className="radius-md"
                aria-describedby="prev-city-error"
                name="prev-city"
                type="text"
                autoComplete="off"
                required={(parseInt(addressFieldsState.required))}
                value={props.fieldData.prev_city}
                onChange={props.saveFieldData('prev_city')}
                onKeyDown={(e) => restrictType(e, 'letters')}
                onBlur={(e) => setHandleErrors({ ...handleErrors, prev_city: checkForErrors(e, 'check value exists') })}
            />,
        state:
            <StateSelector
                id="prev-state"
                classes="radius-md"
                ariaDescribedby="prev-state-error"
                autoComplete="off"
                required={(parseInt(addressFieldsState.required))}
                statesList={props.statesList}
                state={props.fieldData.prev_state}
                saveState={props.saveFieldData('prev_state')}
                onBlur={(e) => checkStateValue('prev_state')}
            />,
        zip:
            <TextInput
                id="prev-zip"
                className="radius-md"
                aria-describedby="prev-zip-error"
                name="prev-zip"
                value={props.fieldData.prev_zip_code}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                required={(parseInt(addressFieldsState.required))}
                minLength={5}
                maxLength={5}
                onChange={props.saveFieldData('prev_zip_code')}
                onKeyDown={(e) => restrictType(e, 'number')}
                onBlur={(e) => setHandleErrors({ ...handleErrors, prev_zip: checkForErrors(e, 'check value length') })}
            />     
    }

    return (
        <>
        <h2>{headings.step_label_2}</h2>

        {addressFieldsState && (
            <>
            { changeRegistrationVisible && (
                <Checkbox id="prev-res-addr" name="prev-res-addr" checked={props.hasPreviousAddress} onChange={props.onChangePreviousAddressCheckbox} label={prevAddressField.label} />
            )}
                <Checkbox id="no-addr" className="margin-bottom-4" name="no-addr" checked={props.hasNoAddress} onChange={props.hasNoAddressCheckbox} label={noAddressField.label} />
                {/******** Current Address Block *********/}
                { !props.hasNoAddress && (<>
                    {homeAddressSectionField.section_alert && (
                    <div className="usa-alert usa-alert--info" role="alert">
                        <div className="usa-alert__body">
                            <div dangerouslySetInnerHTML= {{__html: homeAddressSectionField.section_alert}}/>
                        </div>
                    </div> )}

                    <h3 className='margin-top-5'>{homeAddressSectionField.label}</h3>
                    <div dangerouslySetInnerHTML= {{__html: homeAddressSectionField.instructions}}/>

                    <Grid row gap>
                        <Grid tablet={{ col: 12}}>
                            <FieldContainer
                                inputField={addressFields.street}
                                label={streetAddressField.label}
                                fieldRequired={addressFieldsState.required}
                                // helpText={""}
                                htmlFor={"street-address"}
                                showError={(parseInt(addressFieldsState.required) && handleErrors.street)}
                                errorId={"street-address-error"}
                                errorMsg={streetAddressField.error_msg}
                            />
                        </Grid>
                    </Grid>

                    <Grid row gap>
                        <Grid tablet={{ col: 5}}>
                            <FieldContainer
                                inputField={addressFields.aptNum}
                                label={aptField.label}
                                // fieldRequired={""}
                                // helpText={""}
                                htmlFor={"apt-num"}
                                // showError={""}
                                // errorId={""}
                                // errorMsg={""}
                            />
                        </Grid>
                    </Grid>

                    <Grid row gap className={'flex-align-end'}>
                        <Grid tablet={{ col: 4 }}>
                            <div className={((parseInt(addressFieldsState.required)) && handleErrors.city) ? 'error-container' : ''}>
                                <Label className="text-bold" htmlFor="city">
                                    {cityField.label}{(addressFieldsState.required === "1") && <span className='required-text'>*</span>}
                                    <TextInput
                                        id="city"
                                        className="radius-md"
                                        aria-describedby="city-error"
                                        name="city"
                                        value={props.fieldData.city}
                                        type="text"
                                        autoComplete="off"
                                        required={(parseInt(addressFieldsState.required))}
                                        onChange={props.saveFieldData('city')}
                                        onKeyDown={(e) => restrictType(e, 'letters')}
                                        onBlur={(e) => setHandleErrors({ ...handleErrors, city: checkForErrors(e, 'check value exists') })}
                                    />
                                    {((parseInt(addressFieldsState.required)) && handleErrors.city) &&
                                        <span id="city-error" role="alert" className='error-text'>
                                    {cityField.error_msg}
                                </span>
                                    }
                                </Label>
                            </div>
                        </Grid>

                        <Grid tablet={{ col: 4 }}>
                        <Label htmlFor="state" className="text-bold">
                            {stateField.label}
                        <StateSelector
                            classes="radius-md"
                            statesList={props.statesList}
                            state={props.stateData.name}
                            saveState={props.saveFieldData('state')}
                            autoComplete="off"
                            disabled={true}
                            required={(parseInt(addressFieldsState.required))}
                        />
                        </Label>
                        </Grid>

                        <Grid tablet={{ col: 3 }}>
                            <FieldContainer
                                inputField={addressFields.zip}
                                label={zipcodeField.label}
                                fieldRequired={addressFieldsState.required}
                                // helpText={""}
                                htmlFor={"zip"}
                                showError={((parseInt(addressFieldsState.required)) && handleErrors.zip)}
                                errorId={"zip-error"}
                                errorMsg={zipcodeField.error_msg}
                            />
                        </Grid>
                    </Grid>
                    <Checkbox className="margin-top-3" id="alt-mail-addr" name="alt-mail-addr" checked={props.hasMailAddress} onChange={props.onChangeMailAddressCheckbox} label={differentMailAddressField.label} />
                </>
                )}
                {/******* END BLOCK *********/}

                {/******* MAIL ADDRESS BLOCK ********/}
                {(props.hasMailAddress || props.hasNoAddress) && (
                    <>
                        {props.hasNoAddress && (
                        <div className="usa-alert usa-alert--info" role="alert">
                            <div className="usa-alert__body" dangerouslySetInnerHTML= {{__html: mailAddressSectionField.section_alert}}/>
                        </div>)}

                        <h3 className='margin-top-8'>{mailAddressSectionField.label}</h3>
                        <div dangerouslySetInnerHTML= {{__html: mailAddressSectionField.section_description}}/>

                        <Grid row gap>
                            <Grid tablet={{ col: 12 }}>
                                <FieldContainer
                                    inputField={mailFields.street}
                                    label={mailStreetAddressField.label}
                                    fieldRequired={addressFieldsState.required}
                                    // helpText={""}
                                    htmlFor={"mail-street"}
                                    showError={((parseInt(addressFieldsState.required)) && handleErrors.mail_street)}
                                    errorId={"mail-street-error"}
                                    errorMsg={mailStreetAddressField.error_msg}
                                />
                            </Grid>
                        </Grid>

                        <Grid row gap className={'flex-align-end'}>
                            <Grid tablet={{ col: true }}>
                                <FieldContainer
                                    inputField={mailFields.city}
                                    label={mailCityField.label}
                                    fieldRequired={addressFieldsState.required}
                                    // // helpText={""}
                                    htmlFor={"mail-city"}
                                    showError={((parseInt(addressFieldsState.required)) && handleErrors.mail_city)}
                                    errorId={"mail-city-error"}
                                    errorMsg={mailCityField.error_msg}
                                />
                            </Grid>

                            <Grid tablet={{ col: true }}>
                                <div className='bottom'>
                                    <FieldContainer
                                        inputField={mailFields.state}
                                        label={mailStateField.label}
                                        fieldRequired={addressFieldsState.required}
                                        // helpText={""}
                                        htmlFor={"mail-state"}
                                        showError={((parseInt(addressFieldsState.required)) && handleErrors.mail_state)}
                                        errorId={"mail-state-error"}
                                        errorMsg={mailStateField.error_msg}
                                    />
                                </div>
                            </Grid>

                            <Grid tablet={{ col: true }}>
                                <FieldContainer
                                    inputField={mailFields.zip}
                                    label={mailZipcodeField.label}
                                    fieldRequired={addressFieldsState.required}
                                    helpText={"For example: 12345"}
                                    htmlFor={"mail-zip"}
                                    showError={((parseInt(addressFieldsState.required)) && handleErrors.mail_zip)}
                                    errorId={"mail-zip-error"}
                                    errorMsg={mailZipcodeField.error_msg}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
                {/******* END BLOCK *********/}

                {/******* PREVIOUS ADDRESS BLOCK ********/}
                {props.hasPreviousAddress && (
                    <>
                        { prevAddressSectionField.section_alert && (//section_description
                        <div className="usa-alert usa-alert--info" role="alert">
                            <div className="usa-alert__body" dangerouslySetInnerHTML= {{__html: prevAddressSectionField.section_alert}}/>
                        </div>)}

                        <h3 className='margin-top-8'>{prevAddressSectionField.label}</h3>
                        <div dangerouslySetInnerHTML= {{__html: prevAddressSectionField.instructions}}/>

                        <Grid row gap>
                            <Grid tablet={{ col: 12 }}>
                            <FieldContainer
                                inputField={prevAddressFields.street}
                                label={prevStreetAddressField.label}
                                fieldRequired={addressFieldsState.required}
                                // helpText={""}
                                htmlFor={"prev-street"}
                                showError={((parseInt(addressFieldsState.required)) && handleErrors.prev_street)}
                                errorId={"prev-street-error"}
                                errorMsg={prevStreetAddressField.error_msg}
                            />
                            </Grid>
                        </Grid>

                        <Grid row gap className={'flex-align-end'}>
                            <Grid tablet={{ col: 5 }}>
                                <FieldContainer
                                    inputField={prevAddressFields.aptNum}
                                    label={prevAptField.label}
                                    // fieldRequired={""}
                                    // helpText={""}
                                    htmlFor={"prev-apt"}
                                    // showError={""}
                                    // errorId={""}
                                    // errorMsg={""}
                                />
                            </Grid>
                        </Grid>

                        <Grid row gap>
                            <Grid tablet={{ col: 4 }}>
                                <FieldContainer
                                    inputField={prevAddressFields.city}
                                    label={prevCityField.label}
                                    fieldRequired={addressFieldsState.required}
                                    // helpText={""}
                                    htmlFor={"prev-city"}
                                    showError={((parseInt(addressFieldsState.required)) && handleErrors.prev_city)}
                                    errorId={"prev-city-error"}
                                    errorMsg={prevCityField.error_msg}
                                />
                            </Grid>

                        <Grid tablet={{ col: 4 }}>
                            <div className="bottom">
                                <FieldContainer
                                    inputField={prevAddressFields.state}
                                    label={prevStateField.label}
                                    fieldRequired={addressFieldsState.required}
                                    // helpText={""}
                                    htmlFor={"prev-state"}
                                    showError={((parseInt(addressFieldsState.required)) && handleErrors.prev_state)}
                                    errorId={"prev-state-error"}
                                    errorMsg={prevStateField.error_msg}
                                />
                            </div>
                        </Grid>

                            <Grid tablet={{ col: 4 }}>
                                <FieldContainer
                                    inputField={prevAddressFields.zip}
                                    label={prevZipcodeField.label}
                                    fieldRequired={addressFieldsState.required}
                                    helpText={"For example: 12345"}
                                    htmlFor={"prev-zip"}
                                    showError={((parseInt(addressFieldsState.required)) && handleErrors.prev_zip)}
                                    errorId={"prev-zip-error"}
                                    errorMsg={prevZipcodeField.error_msg}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
                {/******* END BLOCK *********/}
            </>
        )}
        </>
    );
}

export default Addresses;