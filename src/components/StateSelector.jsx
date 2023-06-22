import { Label, Dropdown } from '@trussworks/react-uswds';

function StateSelector(props) {
    return (
        <>
        <Label htmlFor="options">Home state or territory</Label>
        <Dropdown id="input-dropdown" name="input-dropdown">
            {props.statesList.map(
            state => <option key={state} value={state}>{state}</option>
        )}
        </Dropdown>
        </>
    );
}

export default StateSelector;