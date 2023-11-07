import { useState, useEffect } from 'react'
import { Label, Dropdown, Button, ProcessList, ProcessListItem, ProcessListHeading, Grid } from '@trussworks/react-uswds';
import CardInfo from "./CardInfo";
import { checkForErrors } from './HelperFunctions/ValidateField';
import { fetchData } from './HelperFunctions/JsonHelper';
import { Icon, Dropdown, Button } from '@trussworks/react-uswds';
import { checkForErrors } from './HelperFunctions/ValidateField';
import "../styles/pages/StateSelection.css";
import BackButton from './BackButton';
import NextButton from './NextButton';

function StateSelection(props) {
    const [states, setState] = useState('');
    useEffect(() => {
        fetchData("states.json", setState);
    }, []);

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

        <h1>{content.main_heading}</h1>
        <p className={'usa-intro'}>{content.main_parag}</p>

        <h2>{content.subheading}</h2>
        <p>{content.parag2.replace("%link%", content.parag2_link)}</p>

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