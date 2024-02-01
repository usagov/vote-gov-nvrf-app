import { Dropdown } from '@trussworks/react-uswds';
import * as string from '../../public/data/en/strings.json';

function StateSelector(props) {
    const stringContent = props.stringContent

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
        <option value="">{stringContent.select}</option>
            {props.statesList.map(
            state => <option key={state} value={state}>{state}</option>
        )}
        </Dropdown>
        </>
    );
}

export default StateSelector;