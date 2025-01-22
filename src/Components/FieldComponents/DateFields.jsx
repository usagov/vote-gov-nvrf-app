import React from "react";
import {toggleError, restrictType, jumpTo} from 'Utils/ValidateField';

function DateFields({
                      inputData,
                      saveFieldData,
                      dateFormat,
                      fieldData,
                      setFieldError
                    }) {

  const checkDateValues = (e) => {
    let month = fieldData.date_of_birth_month;
    let day = fieldData.date_of_birth_day;
    let year = fieldData.date_of_birth_year;
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let errorArray = [];

    // Clear errors before validating field values.
    setFieldError([]);

    // Check if month is a valid month.
    if (month.length !== 2 || !(month >= 1 && month <= 12)) {
      errorArray.push({
        'message': inputData.field_month.error_msg,
        'id': inputData.field_month.nvrf_id
      });
    }

    // Check if day is a valid day.
    if (day.length !== 2 || !(day >= 1 && day <= 31)) {
      errorArray.push({
        'message': inputData.field_day.error_msg,
        'id': inputData.field_day.nvrf_id
      });
    }

    // Check if year is not in the future.
    if (year.length !== 4 || !(year >= 1900 && year < currentYear)) {
      errorArray.push({
        'message': inputData.field_year.error_msg,
        'id': inputData.field_year.nvrf_id
      });
    }

    // Set field errors.
    setFieldError(errorArray);
    return errorArray.length > 0;
  };

  return (
    <div
      id={inputData.id}
      className="usa-memorable-date"
      name={inputData.id}
      autoComplete="off"
      required={parseInt(inputData.required)}
      data-testid="dateInputGroup"
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget)) toggleError(e, checkDateValues(e))
      }}
    >
      <div data-testid="formGroup"
           className="usa-form-group usa-form-group--month">
        <label data-testid="label" className="usa-label"
               htmlFor={`${inputData.id}` + '_month'}>
          {inputData.field_month.label}
        </label>
        <input
          data-test={inputData.dataTest + 'Month'}
          id={inputData.field_month.nvrf_id}
          className="usa-input radius-md"
          aria-describedby={inputData.field_month.nvrf_id + '_error'}
          name={inputData.field_month.nvrf_id}
          label={inputData.field_month.label}
          unit="month"
          required={true}
          aria-invalid={false}
          type="text"
          pattern="0[1-9]|1[0,1,2]"
          inputMode="numeric"
          maxLength={2}
          minLength={2}
          value={fieldData[inputData.field_month.nvrf_id]}
          onInput={saveFieldData(inputData.field_month.nvrf_id)}
          onKeyUp={(e) => jumpTo(e, inputData.field_day.nvrf_id)}
          onKeyDown={(e) => {
            restrictType(e, 'number'), e.target.setCustomValidity('')
          }}
          onBlur={(e) => {
            dateFormat(e, inputData.field_month.nvrf_id)
          }}
          onInvalid={(e) => e.target.setCustomValidity(' ')}
        />
      </div>
      <div data-testid="formGroup"
           className="usa-form-group usa-form-group--day">
        <label data-testid="label" className="usa-label"
               htmlFor={`${inputData.id}` + '_day'}>
          {inputData.field_day.label}
        </label>
        <input
          data-test={inputData.dataTest + 'Day'}
          id={inputData.field_day.nvrf_id}
          className="usa-input radius-md"
          aria-describedby={inputData.field_day.nvrf_id + '_error'}
          name={inputData.field_day.nvrf_id}
          label={inputData.field_day.label}
          unit="day"
          required={true}
          aria-invalid={false}
          type="text"
          pattern="0[1-9]|[12][0-9]|3[01]"
          inputMode="numeric"
          minLength={2}
          maxLength={2}
          value={fieldData[inputData.field_day.nvrf_id]}
          onInput={saveFieldData(inputData.field_day.nvrf_id)}
          onKeyUp={(e) => jumpTo(e, inputData.field_year.nvrf_id)}
          onKeyDown={(e) => {
            restrictType(e, 'number'), e.target.setCustomValidity('')
          }}
          onBlur={(e) => {
            dateFormat(e, inputData.field_day.nvrf_id)
          }}
          onInvalid={(e) => e.target.setCustomValidity(' ')}
        />
      </div>
      <div data-testid="formGroup"
           className="usa-form-group usa-form-group--year">
        <label data-testid="label" className="usa-label"
               htmlFor={`${inputData.id}` + '_year'}>
          {inputData.field_year.label}
        </label>
        <input
          data-test={inputData.dataTest + 'Year'}
          id={inputData.field_year.nvrf_id}
          className="usa-input radius-md"
          aria-describedby={inputData.field_year.nvrf_id + '_error'}
          name={inputData.field_year.nvrf_id}
          label={inputData.field_year.label}
          unit="year"
          required={true}
          aria-invalid={false}
          type="text"
          pattern="19[0-9][0-9]|20[0-1][0-9]|202[0-4]"
          inputMode="numeric"
          minLength={4}
          maxLength={4}
          value={fieldData[inputData.field_year.nvrf_id]}
          onInput={saveFieldData(inputData.field_year.nvrf_id)}
          onKeyDown={(e) => {
            restrictType(e, 'number'), e.target.setCustomValidity('')
          }}
          onInvalid={(e) => e.target.setCustomValidity(' ')}
        />
      </div>
    </div>
  )
}

export default DateFields;