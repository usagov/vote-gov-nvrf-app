import { useState } from 'react';
import { Button, Icon, Grid } from '@trussworks/react-uswds';
import content from "../data/path-selection.json";
import CardInfo from "./CardInfo";
import cardInfoStyles from "../styles/CardInfo.module.css";
import styles from "../styles/PathSelection.module.css";

function PathSelection(props) {

    const buttonContinue = <Button type="button" onClick={() => {props.getRegPath("update"), props.handleNext()}}>
    Update my registration <Icon.ArrowForward aria-label="forward arrow icon"/>
    </Button>;

    const buttonRedirect = <Button onClick={() => {props.getRegPath("new"),  props.handleNext()}}>
        Begin new registration
        <Icon.ArrowForward aria-label="forward arrow icon"/>
    </Button>;

    return (
        <>
        <Button type="button" onClick={props.handlePrev}>
            Back to Eligibility Information
        </Button>

        <h1>{content.heading_one.replace("%state_name%", props.stateData.name)}</h1>
        <p>{content.subheading_one}</p>

        <h2>{content.heading_two}</h2>

        <Grid row gap className={cardInfoStyles['justify-height']}>
            <Grid col={6}>
            <CardInfo header={content.button_update_reg} paragraph={content.help_text_one} button={buttonContinue}></CardInfo>
            </Grid>
            <Grid col={6}>
            <CardInfo header={content.button_new_reg} paragraph={content.help_text_two} button={buttonRedirect}></CardInfo>
            </Grid>
        </Grid>
        </>
    );
}

export default PathSelection;