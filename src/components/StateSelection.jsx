import React, { useState } from 'react';
import { Select } from '@trussworks/react-uswds';
import { checkForErrors } from './HelperFunctions/ValidateField';
import NextButton from './NextButton';
import { getFieldError, getFieldLabel } from './HelperFunctions/fieldParser';
import {sanitizeDOM} from "./HelperFunctions/JsonHelper";

function StateSelection(props) {
    const content = props.content;
    const navContent = props.navContent;
    const statesList = props.statesList;
    const fields = props.fieldContent;
    const stringContent = props.stringContent

    const introContent = content.find(item => item.uuid === "e3461b9a-e0b1-4157-ad4a-13f3835a101c");
    const introContentBody = sanitizeDOM(introContent.body);
    const introContentBodyParts = introContentBody.split('@state_selector');

    const [handleErrors, setHandleErrors] = useState({
        state_selected: false
    });

    return (
        <div className={'usa-prose margin-top-5 maxw-tablet margin-x-auto'}>
            <h1>{introContent.title}</h1>
            <div className="usa-prose" dangerouslySetInnerHTML= {{__html: introContentBodyParts[0]}}/>

            <form onSubmit={(e) => {props.handleSubmit(e), props.handleNext()}}>
                <div className="grid-row margin-top-3 flex-align-center">
                    <div className="grid-col-auto margin-right-2">
                        <h4 className={'margin-0'}>{getFieldLabel(fields, "7231330d-523b-4e22-b282-b9f98ee20ef2")}</h4>
                    </div>

                    <div className="grid-col">
                        <div className={handleErrors.state_selected ? 'error-container maxw-mobile' : 'maxw-mobile'}>
                            <Select
                                id="state-dropdown"
                                name="state-dropdown"
                                value={props.state}
                                required={true}
                                onChange={e => {
                                    props.getSelectedState(e.target.value)
                                }}
                                onBlur={(e) => setHandleErrors({ state_selected: checkForErrors(e, 'check state selection') })}
                            >
                            <React.Fragment key=".0">
                                <option value="">{stringContent.select}</option>
                                {statesList.map(
                                    state => <option key={state} value={state}>{state}</option>
                                )}
                            </React.Fragment>
                            </Select>
                            {handleErrors.state_selected &&
                                <span id="state-dropdown-error" role="alert" className='error-text'>
                                {getFieldError(fields, "7231330d-523b-4e22-b282-b9f98ee20ef2")}
                            </span>
                            }
                        </div>
                    </div>
                </div>
                <div className="usa-prose" dangerouslySetInnerHTML= {{__html: introContentBodyParts[1]}}/>

                <NextButton type={'submit'} text={navContent.next.reg_options} stringContent={stringContent}/>

            </form>
        </div>
    );
}

export default StateSelection;