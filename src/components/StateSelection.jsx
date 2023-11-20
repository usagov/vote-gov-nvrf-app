import { useState, useEffect } from 'react'
import { Dropdown } from '@trussworks/react-uswds';
import { checkForErrors } from './HelperFunctions/ValidateField';
import { fetchData } from './HelperFunctions/JsonHelper';
import "../styles/pages/StateSelection.css";
import NextButton from './NextButton';

function StateSelection(props) {
    const [content, setContent] = useState('');
    useEffect(() => {
        fetchData("pages.json", setContent);
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

    if (content) {
        const introContent = content.find(item => item.uuid === "e3461b9a-e0b1-4157-ad4a-13f3835a101c");
        return (
            <>
            <h1>{introContent.title}</h1>
            {introContent.body} {/* TODO: Need to style each paragraph */}

            <form onSubmit={(e) => {props.handleSubmit(e), props.handleNext()}}>
            <div className='state-dropdown'>
                <h4>{"I live in: "}</h4>
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
                                <option value="">{"Select your state or territory"}</option>
                                {statesList.map(
                                state => <option key={state} value={state}>{state}</option>
                            )}
                            </Dropdown>
                        {handleErrors.state_selected &&
                            <span id="state-dropdown-error" role="alert" className='error-text'>
                                {"State or territory selection must be made."}
                            </span>
                        }
                    </div>
                </div>
            </div>

            <NextButton type={'submit'} text={"Next"}/>

            </form>
            </>
        );
    }
}

export default StateSelection;