import { Dropdown } from '@trussworks/react-uswds';

function StateSelector(props) {
    return (
        <>
        <Dropdown id="input-dropdown" name="input-dropdown" value={props.state} onChange={props.saveState}>
            <option>Select your home State or Territory </option>
            {props.statesList.map(
            state => <option key={state} value={state}>{state}</option>
        )}
        </Dropdown>
        </>
    );
}

export default StateSelector;