import { useState } from 'react'
import { Icon, Dropdown, Button } from '@trussworks/react-uswds';
import states from "../data/states.json";
import { checkForErrors } from './HelperFunctions/ValidateField';
import "../styles/pages/StateSelection.css";
import content from "../data/state-selection.json";
import BackButton from './BackButton';
import NextButton from './NextButton';

function StateSelection(props) {
    const stateLink = props.stateData.election_website_url;
    const statesList = []
    for (let i = 0; i < states.length; i++) {
        let stateName = states[i].name;
        statesList.push(stateName);
    };

    const [handleErrors, setHandleErrors] = useState({ 
        state_selected: false
    })

    return (
        <>
        <BackButton type={'link'} text={content.back_btn}/>

        <h2>{content.main_heading}</h2>
        <p>{content.main_parag}</p>

        <h3>{content.subheading}</h3>
        <p>{content.parag2.replace("%link%", content.parag2_link)}</p>
        
        <hr />
        <h2>{content.get_started}</h2>
        
        <form onSubmit={(e) => {props.handleSubmit(e), props.handleNext()}}>
        <div className='state-dropdown'>
            <h4>{content.dropdown_text}</h4>
            <div>
                <div className={handleErrors.state_selected ? 'error-container' : ''}>
                        <Dropdown 
                            id="state-dropdown"
                            name="input-dropdown"
                            value={props.state}
                            required={true}
                            onChange={e => {
                                props.getSelectedState(e.target.value)
                            }}
                            onBlur={(e) => setHandleErrors({ state_selected: checkForErrors(e, 'check state selection') })}
                            >
                            <option value="">{content.dropdown_label}</option>
                            {statesList.map(
                            state => <option key={state} value={state}>{state}</option>
                        )}
                        </Dropdown>            
                    {handleErrors.state_selected && 
                        <span id="state-dropdown-error" role="alert" className='error-text'>
                            {content.error_state_dropdown}
                        </span>
                    }
                </div>
            </div>
        </div>
            
        <NextButton type={'submit'} text={content.next_btn}/>

        </form>
        </>
    );
}

export default StateSelection;