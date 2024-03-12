import React from 'react';
import { Select } from '@trussworks/react-uswds';
import { checkForErrors } from './HelperFunctions/ValidateField';
import NextButton from './NextButton';
import { getFieldError, getFieldLabel } from './HelperFunctions/fieldParser';
import { sanitizeDOM } from "./HelperFunctions/JsonHelper";
import { focusError, toggleError } from './HelperFunctions/ValidateField';

function StateSelection(props) {
    const content = props.content;
    const navContent = props.navContent;
    const statesList = props.statesList;
    const fields = props.fieldContent;
    const stringContent = props.stringContent

    const introContent = content.find(item => item.uuid === "e3461b9a-e0b1-4157-ad4a-13f3835a101c");
    const introContentBody = sanitizeDOM(introContent.body);
    const introContentBodyParts = introContentBody.split('@state_selector');

    return (
        <div className={'usa-prose margin-top-5 maxw-tablet margin-x-auto'}>
            <h1>{introContent.title}</h1>
            <div className="usa-prose" dangerouslySetInnerHTML= {{__html: introContentBodyParts[0]}}/>

            <form id="state-selection" onSubmit={(e) => {props.handleSubmit(e), props.handleNext()}}>
                <div className="grid-row margin-top-3 flex-align-center">
                    <div className="grid-col-auto margin-right-2">
                        <strong className={'margin-0'}>{getFieldLabel(fields, "7231330d-523b-4e22-b282-b9f98ee20ef2")}</strong>
                    </div>

                    <div className="grid-col">
                        <div className="input-parent">
                            <Select
                                id="state-dropdown"
                                data-test="dropDown"
                                name="state-dropdown"
                                aria-describedby="state-dropdown_error"
                                value={props.state}
                                required={true}
                                aria-invalid={false}
                                onChange={e => {
                                    props.getSelectedState(e.target.value)
                                }}
                                onBlur={(e) => toggleError(e, checkForErrors(e, 'check state selection'))}
                                onInvalid={(e) => e.target.setCustomValidity(' ')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            >
                            <React.Fragment key=".0">
                                <option value="">{stringContent.selectState}</option>
                                {statesList.map(
                                    state => <option key={state} value={state}>{state}</option>
                                )}
                            </React.Fragment>
                            </Select>
                            <span id="state-dropdown_error" role="alert" className='error-text' data-test="errorText">
                                {getFieldError(fields, "7231330d-523b-4e22-b282-b9f98ee20ef2")}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="usa-prose" dangerouslySetInnerHTML= {{__html: introContentBodyParts[1]}}/>

                <NextButton stringContent={stringContent} type={'submit'} onClick={(e) => focusError('state-selection')} text={navContent.next.reg_options}/>

            </form>
        </div>
    );
}

export default StateSelection;