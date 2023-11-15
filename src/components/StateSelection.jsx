import { useState, useEffect } from 'react'
import { Dropdown } from '@trussworks/react-uswds';
import { checkForErrors } from './HelperFunctions/ValidateField';
import { fetchData } from './HelperFunctions/JsonHelper';
import "../styles/pages/StateSelection.css";
import NextButton from './NextButton';

function StateSelection(props) {
    const [content, setContent] = useState('');
    useEffect(() => {
        fetchData("state-selection.json", setContent);
    }, []);

    const [states, setState] = useState('');
    useEffect(() => {
        fetchData("states.json", setState);
    }, []);

    const statesList = []
    for (let i = 0; i < states.length; i++) {
        let stateName = states[i].name;
        statesList.push(stateName);
    };

    const [handleErrors, setHandleErrors] = useState({ 
        state_selected: false
    });

    return (
        <>
        <h1>{content.main_heading}</h1>
        <p className={'usa-intro'}>{content.main_parag}</p>

        <h2>{content.subheading}</h2>
        {content.parag2}
        
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