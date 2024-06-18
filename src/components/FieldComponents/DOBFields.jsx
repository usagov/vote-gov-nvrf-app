import React from "react";
import { restrictType, checkForErrors, jumpTo, toggleError } from '../HelperFunctions/ValidateField';

function DOBFields({ inputData, saveFieldData, fieldData }) {
    return (
        <div
        id="date-of-birth"
        className="usa-memorable-date"
        name="date-of-birth"
        autoComplete="off"
        required={parseInt(dobFieldState.required)}
        data-testid="dateInputGroup"
        onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) toggleError(e, checkDateValues('all')) }}
        >
            <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                <label data-testid="label" className="usa-label" htmlFor="date-of-birth_month">
                    {stringContent.month}
                </label>
                <input
                data-test="dobMonth"
                id="date-of-birth_month"
                className="usa-input radius-md"
                aria-describedby="date-of-birth_error"
                name="date-of-birth_month"
                label={stringContent.month}
                unit="month"
                required={true}
                aria-invalid={false}
                type="text"
                pattern="0[1-9]|1[0,1,2]"
                inputMode="numeric"
                maxLength={2}
                minLength={2}
                value={props.fieldData.date_of_birth_month}
                onInput={props.saveFieldData('date_of_birth_month')}
                onKeyUp={(e) => jumpTo(e, 'date-of-birth_day')}
                onKeyDown={(e) => { restrictType(e, 'number'), e.target.setCustomValidity('') }}
                onBlur={(e) => { props.dateFormat(e, 'date_of_birth_month'), toggleError(e, checkDateValues('month')) }}
                onInvalid={(e) => e.target.setCustomValidity(' ')}
                />
            </div>
            <div data-testid="formGroup" className="usa-form-group usa-form-group--day">
                <label data-testid="label" className="usa-label" htmlFor="date-of-birth_day">
                    {stringContent.day}
                </label>
                <input
                data-test="dobDay"
                id="date-of-birth_day"
                className="usa-input radius-md"
                aria-describedby="date-of-birth_error"
                name="date-of-birth_day"
                label={stringContent.day}
                unit="day"
                required={true}
                aria-invalid={false}
                type="text"
                pattern="0[1-9]|[12][0-9]|3[01]"
                inputMode="numeric"
                minLength={2}
                maxLength={2}
                value={props.fieldData.date_of_birth_day}
                onInput={props.saveFieldData('date_of_birth_day')}
                onKeyUp={(e) => jumpTo(e, 'date-of-birth_year')}
                onKeyDown={(e) => { restrictType(e, 'number'), e.target.setCustomValidity('') }}
                onBlur={(e) => { props.dateFormat(e, 'date_of_birth_day'), toggleError(e, checkDateValues('day')) }}
                onInvalid={(e) => e.target.setCustomValidity(' ')}
                />
            </div>
            <div data-testid="formGroup" className="usa-form-group usa-form-group--year">
                <label data-testid="label" className="usa-label" htmlFor="date-of-birth_year">
                    {stringContent.year}
                </label>
                <input
                data-test="dobYear"
                id="date-of-birth_year"
                className="usa-input radius-md"
                aria-describedby="date-of-birth_error"
                name="date-of-birth_year"
                label={stringContent.year}
                unit="year"
                required={true}
                aria-invalid={false}
                type="text"
                pattern="19\d{2}|200\d{1}"
                inputMode="numeric"
                minLength={4}
                maxLength={4}
                value={props.fieldData.date_of_birth_year}
                onInput={props.saveFieldData('date_of_birth_year')}
                onKeyDown={(e) => { restrictType(e, 'number'), e.target.setCustomValidity('') }}
                onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
                onInvalid={(e) => e.target.setCustomValidity(' ')}
                />
            </div>
        </div>
    )
}

export default DOBFields;