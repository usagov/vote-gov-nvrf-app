import { Fieldset, Checkbox, Label } from '@trussworks/react-uswds';
import { fetchData } from './HelperFunctions/JsonHelper.jsx';
import { useState, useEffect } from 'react';
import BackButton from './BackButton';
import NextButton from "./NextButton";

function Eligibility(props) {
    const [content, setContent] = useState()
    useEffect(() => {
        fetchData("eligibility.json", setContent);
    }, []);
    const stateContent = props.stateData;

    if (content) {
        return (
            <>
                <BackButton type={'button'} onClick={props.handlePrev} text={'Back to State Registration Options'}/>

                <h1>{content.main_heading.replace("%state_name%", props.stateData.name)}</h1>
                <h2>{content.heading_eligibility}</h2>
                <p>{content.heading_register.replace("%state_name%", props.stateData.name)}</p>
                <ul style={{ listStyleType:'disc' }}>
                    {stateContent.eligibility_list.map(
                        listItem => <li key={listItem} value={listItem}>{listItem}</li>)}
                </ul>

                <h2>{content.heading_deadlines}</h2>
                <p>{content.deadlines_note}</p>
                <ul style={{ listStyleType:'disc' }}>
                    {stateContent.deadlines_list.map(
                        listItem => <li key={listItem} value={listItem}>{listItem}</li>)}
                </ul>

                <form onSubmit={(e) => {e.preventDefault(), props.handleNext()}}>
                    <Fieldset legend="Eligibility" legendStyle="srOnly">
                        <div className={props.error ? 'error-container' : ''}>
                            <Label htmlFor="eligibility-error" id="eligibility-error">
                                <strong>{content.heading_confirm}</strong>
                            </Label>
                            <div>
                                <Checkbox
                                    id="eligibility-checkbox"
                                    name="eligibility-checkbox"
                                    value="eligibility-checkbox"
                                    label={content.eligibility_check}
                                    aria-required="true"
                                    required={true}
                                    defaultChecked={props.hasConfirmed}
                                    onChange={(e) => props.confirmCheckbox(e.target.checked)}
                                />
                            </div>

                            {props.error &&

                                <span id="eligibility-error" rol="alert" className='error-text'>
                                    {content.error_message}
                                </span>
                            }
                        </div>
                    </Fieldset>

                    <p className="text-base padding-y-50">{content.eligibility_agreement}</p>

                    <div className="button-container" style={{ margin:'20px' }}>
                        <NextButton type={'submit'} onClick={() => props.checkboxValid()} text={content.start_button}/>
                    </div>
                </form>
            </>
        );
    }
}

export default Eligibility;