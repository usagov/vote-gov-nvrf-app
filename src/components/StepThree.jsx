import { useState } from 'react';
import { Button } from '@trussworks/react-uswds';
import content from "../data/step-three.json";

function StepThree(props) {
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
        <p>{content.help_text_one}</p>
        <Button id="update" onClick={e => {{props.getRegPath(e.target.id)}; handleClick(e.target.id);}} outline={buttonSelected === 'update' ? false : true}>
            {content.button_update_reg}
        </Button>
        <p>{content.help_text_two}</p>
        <Button id="new" onClick={e => {{props.getRegPath(e.target.id)}; handleClick(e.target.id);}} outline={buttonSelected === 'new' ? false : true}>
        {content.button_new_reg}
        </Button>
        <div className="button-container" style={{ margin:'20px' }}>
            <Button type="button" onClick={props.handleNext} disabled={buttonSelected === 'no selection' ? true : false}>
            {content.button_continue}
            </Button>
        </div>
        </>
    );
}

export default StepThree;