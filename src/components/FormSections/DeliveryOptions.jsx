import { Button, Grid, GridContainer } from '@trussworks/react-uswds';
import React, { useState } from "react";
import Email from "../DeliveryOptions/Email";
import Print from "../DeliveryOptions/Print";
import CardSelect from '../CardSelect';
import GenerateFilledPDF from '../GenerateFilledPDF';
import styles from "../../styles/DeliveryOptions.module.css";

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

        <Button onClick={ async () => {await GenerateFilledPDF(props.fieldData);} } type="submit">
            {props.deliveryButtonSelected === 'email' ? 'Send Form to My Email Address' : 'Print'}
        </Button>
        </>
    );
}

export default DeliveryOptions;