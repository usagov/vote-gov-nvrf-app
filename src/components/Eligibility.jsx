import { Fieldset, Checkbox, Label } from '@trussworks/react-uswds';
import { fetchData } from './HelperFunctions/JsonHelper.jsx';
import { useState, useEffect } from 'react';
import BackButton from './BackButton';
import NextButton from "./NextButton";

function Eligibility(props) {
    const [data, setData] = useState('')
    const [fields, setFields] = useState('')
    useEffect(() => {
        fetchData("pages.json", setData);
        fetchData("fields.json", setFields);
    }, []);
    const stateContent = props.stateData;

    if (data && fields) {
        const content = data.find(item => item.uuid === "94eab1c9-8343-4747-94b4-08732a175614");
        const eligibility = fields.find(item => item.uuid === "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c");
        return (
            <>
                <BackButton type={'button'} onClick={props.handlePrev} text={'Back to State Registration Options'}/>

                <h1>{content.title.replace("@state_name", props.stateData.name)}</h1>
                <p>{content.body}</p> {/* TODO Formatting each tag */}

                {stateContent.postmarked_mail_deadline_info}{stateContent.received_mail_deadline_info}

                <form onSubmit={(e) => {e.preventDefault(), props.handleNext()}}>
                    <Fieldset legend="Eligibility" legendStyle="srOnly">
                        <div className={props.checkboxes.checkboxesValid ? 'error-container' : ''}>
                            <Label htmlFor="eligibility-error" id="eligibility-error">
                                <strong>{eligibility.name}</strong>
                            </Label>
                            <div>
                                <Checkbox
                                    id="eligibility-checkbox"
                                    name="eligibility-checkbox"
                                    value="eligibility-checkbox"
                                    label={eligibility.label}
                                    aria-required="true"
                                    required={true}
                                    defaultChecked={props.checkboxes.eligibility}
                                    onChange={(e) => props.handleCheckbox(e.target.checked, 'eligibility', 0)}
                                />
                            </div>
                            {props.checkboxes.checkboxesValid &&
                                <span id="eligibility-error" rol="alert" className='error-text'>
                    {eligibility.error_msg}
                </span>
                            }
                        </div>
                    </Fieldset>

                    <p>{eligibility.instructions}</p>

                    <div className="button-container" style={{ margin:'20px' }}>
                        <NextButton type={'submit'} onClick={() => props.checkBoxValues()} text={"Replace this nav text"}/>
                    </div>
                </form>
            </>
        );
    }
}

export default Eligibility;