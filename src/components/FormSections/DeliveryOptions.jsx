import { Button, Grid, GridContainer } from '@trussworks/react-uswds';
import React, { useState } from "react";
import Email from "../DeliveryOptions/Email";
import Print from "../DeliveryOptions/Print";
import CardSelect from '../CardSelect';
import styles from "../../styles/DeliveryOptions.module.css";
import { PDFDocument} from 'pdf-lib';
import download from "downloadjs";

async function fillForm(formData) {
    // Fetch the PDF with form fields
    const formUrl = 'https://www.eac.gov/sites/default/files/eac_assets/1/6/Federal_Voter_Registration_ENG.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes)

    // Get the form containing all the fields
    const form = pdfDoc.getForm()

    //Optional - print the names of all form fields
    const fields = form.getFields()
    fields.forEach(field => {
    const type = field.constructor.name
    const name = field.getName()
    console.log(`${type}: ${name}`)
    })

    // Get all fields in the PDF by their names
    const title =  form.getRadioGroup('salutation');
    const title2 = form.getRadioGroup('salutation_2')
    const firstName = form.getTextField('First Name');
    const middleNames = form.getTextField('Middle Names');
    const lastName = form.getTextField('Last Name');
    const jrsrSuffix = form.getRadioGroup('suffix');//check
    const secondSuffix = form.getCheckBox('II');
    const thirdSuffix = form.getCheckBox('III');
    const fourthSuffix = form.getCheckBox('IV');

    const title3 =  form.getRadioGroup('salutation_3');
    const title4 = form.getRadioGroup('salutation_4')
    const firstName2 = form.getTextField('First Name_2');
    const middleNames2 = form.getTextField('Middle Names_2');
    const lastName2 = form.getTextField('Last Name_2');
    const jrsrSuffix2 = form.getRadioGroup('suffix_2');
    const secondSuffix2 = form.getCheckBox('II_2');
    const thirdSuffix2 = form.getCheckBox('III_2');
    const fourthSuffix2 = form.getCheckBox('IV_2');

    const dobMonth = form.getTextField('Month');
    const dobDay = form.getTextField('Day');
    const dobYear = form.getTextField('Year');
    const phoneNumber = form.getTextField('Telephone Number optional');
    const race = form.getTextField('Race or Ethnic Group see item 8 in the instructions for your State');

    // -----------Fill in the pdf fields---------
    // (1) Personal Information
    // Logic for title select has to be seperated into two radio groups
    if (formData.title == 'Mr' || formData.title == "Mrs"){
        title.select(formData.title);
    } else {
        title2.select(formData.title);
    }

    firstName.setText(formData.first_name);
    middleNames.setText(formData.middle_name);
    lastName.setText(formData.last_name);

    //Dropdown to checkbox/radio logic for suffix
    if (formData.suffix === 'II') {
        secondSuffix.check();
    } else if (formData.suffix === 'III') {
        thirdSuffix.check();
    } else if (formData.suffix === 'IV') {
        fourthSuffix.check();
    } else if (formData.suffix === 'Jr.') {
        jrsrSuffix.select('Jr');
    } else if (formData.suffix === 'Sr.') {
        jrsrSuffix.select('Sr');
    }

    //Previous Name
    if (formData.prev_title === 'Mr') {
        title3.select("Mr_2");
    } else if (formData.prev_title === "Mrs") {
        title3.select("Mrs_2");
    } else if (formData.prev_title === "Miss"){
        title4.select("Miss_2");
    } else if (formData.prev_title === "Ms"){
        title4.select("Ms_2");
    }

    firstName2.setText(formData.prev_first_name);
    middleNames2.setText(formData.prev_middle_name);
    lastName2.setText(formData.prev_last_name);

    //Dropdown to checkbox/radio logic for suffix
    if (formData.prev_suffix === 'II') {
        secondSuffix2.check();
    } else if (formData.prev_suffix === 'III') {
        thirdSuffix2.check();
    } else if (formData.prev_suffix === 'IV') {
        fourthSuffix2.check();
    } else if (formData.prev_suffix === 'Jr.') {
        jrsrSuffix2.select('Jr_2');
    } else if (formData.prev_suffix === 'Sr.') {
        jrsrSuffix2.select('Sr_2');
    }

    //Date of Birth, Phone, Race
    dobMonth.setText(formData.date_of_birth_month);
    dobDay.setText(formData.date_of_birth_day);
    dobYear.setText(formData.date_of_birth_year);
    phoneNumber.setText(formData.phone_number);
    race.setText(formData.race);

    //(2) Addresses
    //(3) Identification
    //(4) Political Party

    //-------------End PDF Fill---------------

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
}

function DeliveryOptions(props){
    return (
        <>
        <h2>You're Almost Done!</h2>
        <p>You can generate a printable document (.pdf) of your completed form and print now, or have a printable document sent to your email address to print later.</p>

        <h3>Select one of the options below to continue.</h3>
        <GridContainer>
            <Grid row gap>
                <div className={styles['card-padding']}>
                <Grid row>
                    <Grid tablet={{ col: true }}>
                        <div onClick={() => {props.handleClickDeliveryButton('email')}}>
                        <CardSelect
                            iconPath={"/images/email-print-mail.svg"}
                            text={"Email, print, and mail"}
                            cardStyle={props.deliveryButtonSelected === 'email' ? 'card-selected' : 'card'}/>
                        </div>
                    </Grid>
                </Grid>
                </div>
                <div className={styles['card-padding']}>
                <Grid row>
                    <Grid tablet={{ col: true }}>
                        <div onClick={() => {props.handleClickDeliveryButton('print')}}>
                            <CardSelect
                                iconPath={"/images/print-mail.svg"}
                                text={"Print"}
                                cardStyle={props.deliveryButtonSelected === 'print' ? 'card-selected' : 'card'}/>
                        </div>
                    </Grid>
                </Grid>
                </div>
            </Grid>
        </GridContainer>

        {props.deliveryButtonSelected === 'email' &&
            <Email
                state={props.state}
                stateData={props.stateData}
                fieldData={props.fieldData}
                saveFieldData = {props.saveFieldData}
                deliveryOption = {props.deliveryButtonSelected}
                handleNext={props.handleNext}
                buttonDisabled={props.buttonDisabled}
            />
        }

        {props.deliveryButtonSelected === 'print' &&
            <Print
                state={props.state}
                stateData={props.stateData}
                fieldData={props.fieldData}
                saveFieldData = {props.saveFieldData}
                deliveryOption = {props.deliveryButtonSelected}
                handleNext={props.handleNext}
                buttonDisabled={props.buttonDisabled}
            />
        }
        {/* On submit, generate a PDF, download or email based on delivery option */}

        <Button onClick={ async () => {await fillForm(props.fieldData);} } type="submit">
            {props.deliveryButtonSelected === 'email' ? 'Send Form to My Email Address' : 'Print'}
        </Button>
        </>
    );
}

export default DeliveryOptions;