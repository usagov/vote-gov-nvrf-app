import { Dropdown } from '@trussworks/react-uswds';

function StateSelector(props) {
    return (
        <>
        <Dropdown 
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
        <option value="">Select your state or territory</option>
            {props.statesList.map(
            state => <option key={state} value={state}>{state}</option>
        )}
        </Dropdown>
        </>
    );
}

export default StateSelector;