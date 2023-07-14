import { useState } from 'react';
import { Button, Icon, GridContainer, Grid } from '@trussworks/react-uswds';
import content from "../data/path-selection.json";
import CardSelect from "./CardSelect";
import styles from "../styles/PathSelection.module.css";

function PathSelection(props) {
    const [buttonSelected, setButtonSelected] = useState('no selection')

    const handleClick = (id) => {
        if (id === 'update') {
            setButtonSelected('update')
        } else if (id === 'new') {
            setButtonSelected('new')
        }
    }

    return (
        <>
        <Button type="button" onClick={props.handlePrev}>
            Back to Eligibility Information
        </Button>

        <h1>{content.heading_one.replace("%state_name%", props.stateData.name)}</h1>
        <p>{content.subheading_one}</p>

        <h2>{content.heading_two}</h2>
        <GridContainer style={{ padding:'0'}}>
            <Grid row gap>
                <Grid col={6}>
                    <div onClick={() => {props.getRegPath("update"), handleClick("update")}}>
                    <CardSelect 
                        iconPath={"/images/update.svg"}
                        text={content.button_update_reg} 
                        cardStyle={buttonSelected === 'update' ? 'card-selected' : 'card'}/>
                    </div >
                </Grid>
                <Grid col={6}><p>{content.help_text_one}</p></Grid>
            </Grid>
            <div className={styles['gap']}></div>
            <Grid row gap>
                <Grid col={6}>
                    <div onClick={() => {props.getRegPath("new"), handleClick("new")}}>
                    <CardSelect 
                        iconPath={"/images/register.svg"}
                        text={content.button_new_reg} 
                        cardStyle={buttonSelected === 'new' ? 'card-selected' : 'card'}/>
                    </div>
                </Grid>
                <Grid col={6}>
                    <p>{content.help_text_two}</p>
                </Grid>
            </Grid>
        </GridContainer>

        <p style={{ marginTop:'30px'}}>
            <Button type="button" onClick={props.handleNext} disabled={buttonSelected === 'no selection' ? true : false}>
                {content.button_continue} <Icon.ArrowForward aria-label="forward arrow icon"/>
            </Button>
        </p>
        </>
    );
}

export default PathSelection;