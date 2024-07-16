import { Label, TextInput, Checkbox, Grid } from '@trussworks/react-uswds';
import StateSelector from '../StateSelector';
import FieldContainer from '../FieldContainer';
import React, { useState } from "react";
import { restrictType, checkForErrors, toggleError } from '../HelperFunctions/ValidateField';
import { sanitizeDOM } from '../HelperFunctions/JsonHelper';


function Addresses(props){
    const headings = props.headings;
    const fields = props.fieldContent;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;
    const nvrfStateFields = props.stateData.nvrf_fields;
    const stringContent = props.stringContent


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
    const mailCityField = fields.find(item => item.uuid === "9a5baee7-357b-4e59-b4f2-fe2525c0fd6c");
    const mailStateField = fields.find(item => item.uuid === "b0f80289-6084-4723-8278-110fda210f0d");
    const mailZipcodeField = fields.find(item => item.uuid === "c4f9c0cb-2a25-4f1d-a93a-b06a19656cfe");

    //Field requirements by state data
    const addressFieldsState = (nvrfStateFields.find(item => item.uuid === streetAddressField.uuid));

    // Instructions for optional checkboxes (prev address, no address)
    const addressCheckBoxInstructions = sanitizeDOM(noAddressField.instructions);
    const addressCheckBoxesInstructions = sanitizeDOM(prevAddressField.instructions);

    return (
        <>
        <h2>{headings.step_label_2}</h2>

        {addressFieldsState && (
            <>
            {!changeRegistrationVisible && (
                <span className='usa-hint' id='addresses-checkbox-hint'>{addressCheckBoxInstructions}</span>
            )}
            { changeRegistrationVisible && (
                <>
                <span className='usa-hint' id='addresses-checkbox-hint'>{addressCheckBoxesInstructions}</span>
                <Checkbox id="prev-address" name="prev-address" data-test="checkBox" checked={props.hasPreviousAddress} onChange={props.onChangePreviousAddressCheckbox} label={prevAddressField.label} />
                </>
            )}
                <Checkbox id="no-address" aria-describedby="no-address_alert" className="margin-bottom-4" name="no-addr" data-test="checkBox" checked={props.hasNoAddress} onChange={props.hasNoAddressCheckbox} label={noAddressField.label} />
                {/******** Current Address Block *********/}
                { !props.hasNoAddress && (<>
                    {homeAddressSectionField.section_alert && (
                    <div id="no-address_alert" className="usa-alert usa-alert--info" role="region" aria-live="polite">
                        <div className="usa-alert__body">
                            <div className="usa-alert__text" dangerouslySetInnerHTML= {{__html: homeAddressSectionField.section_alert}}/>
                        </div>
                    </div> )}

                    <h3 className='margin-top-5'>{homeAddressSectionField.label}</h3>
                        {homeAddressSectionField.instructions && (
                            <div dangerouslySetInnerHTML={{__html: homeAddressSectionField.instructions}}/>
                        )}

                        <Grid row gap>
                            <Grid tablet={{col: 12}}>
                        <div className="input-parent">
                            <Label className="text-bold" htmlFor="street">
                                {streetAddressField.label}{(addressFieldsState.required === "1") && <span className='required-text'>*</span>}
                            </Label>
                            <TextInput
                                data-test="street"
                                id="street"
                                className="radius-md"
                                aria-describedby="street_error"
                                name="street"
                                type="text"
                                autoComplete="off"
                                required={(parseInt(addressFieldsState.required))}
                                value={props.fieldData.street_address}
                                onChange={props.saveFieldData('street_address')}
                                onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                onInvalid={(e) => e.target.setCustomValidity(' ')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                />
                            <span id="street_error" role="alert" className='error-text' data-test="errorText">
                                {streetAddressField.error_msg}
                            </span>
                        </div>
                        </Grid>
                    </Grid>

                    <Grid row gap>
                        <Grid tablet={{ col: 5}}>
                            <FieldContainer
                                fieldType={'text'} inputData={{
                                id: aptField.nvrf_id,
                                dataTest: 'aptNumber',
                                label: aptField.label,
                                error_msg: aptField.error_msg,
                                help_text: aptField.help_text,
                            }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
                        </Grid>
                    </Grid>

                    <Grid row gap className={'flex-align-end'}>
                        <Grid tablet={{ col: 4 }}>
                            <div className="input-parent">
                                <Label className="text-bold" htmlFor="city">
                                    {cityField.label}{(addressFieldsState.required === "1") && <span className='required-text'>*</span>}
                                </Label>
                                    <TextInput
                                        data-test="city"
                                        id="city"
                                        className="radius-md"
                                        aria-describedby="city_error"
                                        name="city"
                                        value={props.fieldData.city}
                                        type="text"
                                        autoComplete="off"
                                        required={(parseInt(addressFieldsState.required))}
                                        onChange={props.saveFieldData('city')}
                                        onKeyDown={(e) => restrictType(e, 'letters')}
                                        onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                        onInvalid={(e) => e.target.setCustomValidity(' ')}
                                        onInput={(e) => e.target.setCustomValidity('')}
                                    />
                                <span id="city_error" role="alert" className='error-text' data-test="errorText">
                                    {cityField.error_msg}
                                </span>
                            </div>
                        </Grid>

                        <Grid tablet={{ col: 4 }}>
                        <Label htmlFor="state" className="text-bold">
                            {stateField.label}
                        </Label>
                        <StateSelector
                            classes="radius-md"
                            data-test="select"
                            statesList={props.statesList}
                            stringContent={props.stringContent}
                            state={props.stateData.name}
                            saveState={props.saveFieldData('state')}
                            autoComplete="off"
                            disabled={true}
                            required={(parseInt(addressFieldsState.required))}
                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                        </Grid>

                        <Grid tablet={{ col: 3 }}>
                        <div className="input-parent">
                            <Label className="text-bold" htmlFor="zip-code">
                                {zipcodeField.label} {(addressFieldsState.required === "1") && <span className={'required-text'}>*</span>}
                            </Label>
                            <span className="usa-hint" id="zip-hint">{zipcodeField.help_text}</span>
                            <TextInput
                                data-test="zip"
                                id="zip-code"
                                className="radius-md"
                                aria-describedby="zip-code_error"
                                name="zip-code"
                                type="text"
                                inputMode="numeric"
                                autoComplete="off"
                                required={(parseInt(addressFieldsState.required))}
                                minLength={5}
                                maxLength={5}
                                value={props.fieldData.zip_code}
                                onChange={props.saveFieldData('zip_code')}
                                onKeyDown={(e) => restrictType(e, 'number')}
                                onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
                                onInvalid={(e) => e.target.setCustomValidity(' ')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                            <span id="zip-code_error" role="alert" className='error-text' data-test="errorText">
                                {zipcodeField.error_msg}
                            </span>
                        </div>
                        </Grid>
                    </Grid>
                    <Checkbox data-test="checkBox" className="margin-top-3" id="alt-mail-addr" name="alt-mail-addr" checked={props.hasMailAddress} onChange={props.onChangeMailAddressCheckbox} label={differentMailAddressField.label} />
                </>
                )}
                {/******* END BLOCK *********/}

                {/******* MAIL ADDRESS BLOCK ********/}
                {(props.hasMailAddress || props.hasNoAddress) && (
                    <>
                        {props.hasNoAddress && (
                        <div className="usa-alert usa-alert--info" role="alert">
                            <div className="usa-alert__body">
                                <div className="usa-alert__text" dangerouslySetInnerHTML={{__html: mailAddressSectionField.section_alert}}/>
                            </div>
                        </div>)}

                        <h3 className='margin-top-8'>{mailAddressSectionField.label}</h3>
                        {mailAddressSectionField.section_description && (
                            <div dangerouslySetInnerHTML={{__html: mailAddressSectionField.section_description}}/>
                        )}

                        <Grid row gap>
                            <Grid tablet={{col: 12 }}>
                            <div className="input-parent">
                            <Label className="text-bold" htmlFor="mail-street">
                                {mailStreetAddressField.label}{(addressFieldsState.required === "1") && <span className='required-text'>*</span>}
                            </Label>
                                <TextInput
                                    data-test="mailStreet"
                                    id="mail-street"
                                    className="radius-md"
                                    aria-describedby="mail-street_error"
                                    name="mail-street"
                                    type="text"
                                    autoComplete="off"
                                    required={(parseInt(addressFieldsState.required))}
                                    value={props.fieldData.mail_street_address}
                                    onChange={props.saveFieldData('mail_street_address')}
                                    onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                />
                            <span id="mail-street_error" role="alert" className='error-text' data-test="errorText">
                                {mailStreetAddressField.error_msg}
                            </span>
                            </div>
                            </Grid>
                        </Grid>

                        <Grid row gap className={'flex-align-end'}>
                            <Grid tablet={{ col: true }}>
                                <div className="input-parent">
                                    <Label className="text-bold" htmlFor="mail-city">
                                        {mailCityField.label}{(addressFieldsState.required === "1") && <span className='required-text'>*</span>}
                                    </Label>
                                        <TextInput
                                            data-test="mailCity"
                                            id="mail-city"
                                            className="radius-md"
                                            aria-describedby="mail-city_error"
                                            name="mail-city"
                                            type="text"
                                            autoComplete="off"
                                            required={(parseInt(addressFieldsState.required))}
                                            value={props.fieldData.mail_city}
                                            onChange={props.saveFieldData('mail_city')}
                                            onKeyDown={(e) => restrictType(e, 'letters')}
                                            onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                                            onInput={(e) => e.target.setCustomValidity('')}
                                        />
                                    <span id="mail-city_error" role="alert" className='error-text' data-test="errorText">
                                       {mailCityField.error_msg}
                                    </span>
                                </div>
                            </Grid>

                            <Grid tablet={{ col: true }}>
                                <div className="input-parent">
                                    <Label className="text-bold" htmlFor="mail-state">
                                        {mailStateField.label}{(addressFieldsState.required === "1") && <span className='required-text'>*</span>}
                                    </Label>
                                        <StateSelector
                                            data-test="select"
                                            id="mail-state"
                                            classes="radius-md"
                                            autoComplete="off"
                                            ariaDescribedBy="mail-state_error"
                                            required={(parseInt(addressFieldsState.required))}
                                            statesList={props.statesList}
                                            stringContent={props.stringContent}
                                            state={props.fieldData.mail_state}
                                            saveState={props.saveFieldData('mail_state')}
                                            onBlur={(e) => {toggleError(e, checkForErrors(e, 'check value exists'))} }
                                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                                            onInput={(e) => e.target.setCustomValidity('')}
                                        />
                                    <span id="mail-state_error" role="alert" className='error-text' data-test="errorText">
                                        {mailStateField.error_msg}
                                    </span>
                                </div>
                            </Grid>

                            <Grid tablet={{ col: true }}>
                            <div className="input-parent">
                                <Label className="text-bold" htmlFor="mail-zip-code">
                                    {mailZipcodeField.label} {(addressFieldsState.required === "1") && <span className={'required-text'}>*</span>}
                                </Label>
                                <span className="usa-hint" id="mail-zip-hint">{zipcodeField.help_text}</span>
                                <TextInput
                                    data-test="mailZip"
                                    id="mail-zip-code"
                                    className="radius-md"
                                    aria-describedby="mail-zip-code_error"
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
                                    onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
                                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                />
                                <span id="mail-zip-code_error" role="alert" className='error-text' data-test="errorText">
                                    {mailZipcodeField.error_msg}
                                </span>
                            </div>
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
                            <div className="usa-alert__body">
                                <div className="usa-alert__text" dangerouslySetInnerHTML={{__html: prevAddressSectionField.section_alert}}/>
                            </div>
                        </div>)}

                        <h3 className='margin-top-8'>{prevAddressSectionField.label}</h3>
                        {prevAddressSectionField.instructions && (
                            <div dangerouslySetInnerHTML={{__html: prevAddressSectionField.instructions}}/>
                        )}

                        <Grid row gap>
                            <Grid tablet={{ col: 12 }}>
                            <div className="input-parent">
                                <Label className="text-bold" htmlFor="prev-street">
                                    {prevStreetAddressField.label}{(addressFieldsState.required === "1") && <span className='required-text'>*</span>}
                                </Label>
                                <TextInput
                                    data-test="prevStreet"
                                    id="prev-street"
                                    className="radius-md"
                                    aria-describedby="prev-street_error"
                                    name="prev-street"
                                    type="text"
                                    autoComplete="off"
                                    required={(parseInt(addressFieldsState.required))}
                                    value={props.fieldData.prev_street_address}
                                    onChange={props.saveFieldData('prev_street_address')}
                                    onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                />
                                <span id="prev-street_error" role="alert" className='error-text' data-test="errorText">
                                    {prevStreetAddressField.error_msg}
                                </span>
                            </div>
                            </Grid>
                        </Grid>

                        <Grid row gap className={'flex-align-end'}>
                            <Grid tablet={{ col: 5 }}>
                            <Label className="text-bold" htmlFor="prev-apartment-number">
                                {prevAptField.label}
                            </Label>
                            <TextInput
                                data-test="prevAptNumber"
                                id="prev-apartment-number"
                                className="radius-md"
                                name="prev-apartment-number"
                                aria-describedby=""
                                type="text"
                                autoComplete="off"
                                value={props.fieldData.prev_apt_num}
                                onChange={props.saveFieldData('prev_apt_num')}
                                onInvalid={(e) => e.target.setCustomValidity(' ')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                />
                            </Grid>
                        </Grid>

                        <Grid row gap className={'flex-align-end'}>
                            <Grid tablet={{ col: 4 }}>
                                <div className="input-parent">
                                    <Label className="text-bold" htmlFor="prev-city">
                                        {prevCityField.label}{(addressFieldsState.required === "1") && <span className='required-text'>*</span>}
                                    </Label>
                                        <TextInput
                                            data-test="prevCity"
                                            id="prev-city"
                                            className="radius-md"
                                            aria-describedby="prev-city_error"
                                            name="prev-city"
                                            type="text"
                                            autoComplete="off"
                                            required={(parseInt(addressFieldsState.required))}
                                            value={props.fieldData.prev_city}
                                            onChange={props.saveFieldData('prev_city')}
                                            onKeyDown={(e) => restrictType(e, 'letters')}
                                            onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                                            onInput={(e) => e.target.setCustomValidity('')}
                                        />
                                    <span id="prev-city_error" role="alert" className='error-text' data-test="errorText">
                                        {prevCityField.error_msg}
                                    </span>
                                </div>
                            </Grid>

                        <Grid tablet={{ col: 4 }}>
                            <div className="input-parent">
                                <Label className="text-bold" htmlFor="prev-state">
                                    {prevStateField.label}{(addressFieldsState.required === "1") && <span className='required-text'>*</span>}
                                </Label>
                                    <StateSelector
                                        data-test="select"
                                        id="prev-state"
                                        classes="radius-md"
                                        ariaDescribedby="prev-state_error"
                                        autoComplete="off"
                                        required={(parseInt(addressFieldsState.required))}
                                        statesList={props.statesList}
                                        stringContent={props.stringContent}
                                        state={props.fieldData.prev_state}
                                        saveState={props.saveFieldData('prev_state')}
                                        onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                        onInvalid={(e) => e.target.setCustomValidity(' ')}
                                        onInput={(e) => e.target.setCustomValidity('')}
                                    />
                                <span id="prev-state_error" role="alert" className='error-text' data-test="errorText">
                                    {prevStateField.error_msg}
                                </span>
                            </div>
                        </Grid>

                            <Grid tablet={{ col: 4 }}>
                            <div className="input-parent">
                                <Label className="text-bold" htmlFor="prev-zip-code">
                                    {prevZipcodeField.label} {(addressFieldsState.required === "1") && <span className={'required-text'}>*</span>}
                                </Label>
                                <span className="usa-hint" id="prev-zip-hint">{zipcodeField.help_text}</span>
                                <TextInput
                                    data-test="prevZip"
                                    id="prev-zip-code"
                                    className="radius-md"
                                    aria-describedby="prev-zip-code_error"
                                    name="prev-zip-code"
                                    value={props.fieldData.prev_zip_code}
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="off"
                                    required={(parseInt(addressFieldsState.required))}
                                    minLength={5}
                                    maxLength={5}
                                    onChange={props.saveFieldData('prev_zip_code')}
                                    onKeyDown={(e) => restrictType(e, 'number')}
                                    onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
                                    onInvalid={(e) => e.target.setCustomValidity(' ')}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                />
                                <span id="prev-zip-code_error" role="alert" className='error-text' data-test="errorText">
                                    {prevZipcodeField.error_msg}
                                </span>
                            </div>
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