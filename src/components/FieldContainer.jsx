import { Label } from '@trussworks/react-uswds';

function FieldContainer(props) {

    return (
        <div className={props.showError ? `error-container ${props.classes}` : props.classes}>
            <Label className="text-bold" htmlFor={props.htmlFor}>
                <strong>{props.label}{(props.fieldRequired === "1") && <span className='required-text'>*</span>}</strong>
            </Label>
            <span className="usa-hint" id="date-of-birth-hint">
                {props.helpText}
            </span>
                {props.inputField}
                {props.showError &&
                    <span id={props.errorId} role="alert" className="error-text text-bold">
                        {props.errorMsg}
                    </span>
                }
        </div>
    );
}

export default FieldContainer;
