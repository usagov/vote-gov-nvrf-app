import React from 'react';
import { Select } from '@trussworks/react-uswds';

function StateSelector(props) {
    const statesList = props.statesList;
    const stringContent = props.stringContent
    
    return (
        <>
        <Select
            id="state" 
            className={props.classes}
            name="input-dropdown" 
            value={props.state} 
            aria-describedby={props.ariaDescribedBy}
            onChange={props.saveState} 
            disabled={props.disabled} 
            required={true}
            onBlur={props.onBlur}
        >
        <React.Fragment key=".0">
            <option value="">{stringContent.select}</option>
                {statesList.map(
                state => <option key={state} value={state}>{state}</option>
            )}
        </React.Fragment>
        </Select>
        </>
    );
}

export default StateSelector;