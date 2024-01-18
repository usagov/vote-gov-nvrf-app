import { Label } from '@trussworks/react-uswds';

function FieldContainer({
    classes, 
    htmlFor, 
    label, 
    fieldRequired, 
    helpText, 
    inputField, 
    showError, 
    errorId, 
    errorMsg})
    
{
    return (
        <div className={showError ? `error-container ${classes}` : classes}>
            <Label className="text-bold" htmlFor={htmlFor}>
                <strong>{label}{(fieldRequired === "1") && <span className='required-text'>*</span>}</strong>
            </Label>
            <span className="usa-hint">
                {helpText}
            </span>
                {inputField}
                {showError &&
                    <span id={errorId} role="alert" className="error-text">
                        {errorMsg}
                    </span>
                }
        </div>
    );
}

export default FieldContainer;
