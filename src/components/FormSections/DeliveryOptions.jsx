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
    const secondSuffix = form.getCheckBox('II');

    //Get all field values in the web form by their names - this is already in props!
    console.log(formData);

    // Fill in the pdf fields
    firstName.setText(formData.first_name);
    // Logic for title select has to be seperated into two radio groups
    if (formData.title == 'Mr' || formData.title == "Mrs"){
        title.select(formData.title);
    } else {
        title2.select(formData.title);
    }

    //Dropdown to checkbox logic for suffix
    if (formData.suffix === 'II') {
        secondSuffix.check();
    }

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