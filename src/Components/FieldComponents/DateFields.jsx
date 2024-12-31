import React from "react";
import {
  restrictType,
  checkForErrors,
  jumpTo,
  toggleError
} from 'Utils/ValidateField';

function DateFields({inputData, saveFieldData, dateFormat, fieldData}) {

  const checkDateValues = (e, type) => {
    let month = fieldData.date_of_birth_month;
    let day = fieldData.date_of_birth_day;
    let year = fieldData.date_of_birth_year;
    let yearStart = year.slice(0, 2);

    /* Comment out age validation for now
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();
    let currentYear = currentDate.getFullYear();
    let age = currentYear - year - (currentMonth <= month && currentDay < day);
    */

    if (type === "all") {
      let dobValues = [
        month.length === 2,
        day.length === 2,
        year.length === 4,

        month <= 12,
        month >= 1,
        day <= 31,
        day >= 1,
        yearStart <= 20,
        yearStart >= 19,
        //age <= 120,
        //age >= 16
      ];

      if (dobValues.includes(false)) {
        e.target.setCustomValidity(' ');
        return true
      } else {
        return false
      }

    } else if (type === "month") {
      if (month > 12 || month < 1) {
        return true
      } else {
        return false
      }
    } else if (type === "day") {
      if (day > 31 || day < 1) {
        return true
      } else {
        return false
      }
    } //Removing age validation for now
    /* else if (type === "year") {
    if (age > 110 || age < 17) {
      return true
    } else {
      return false
    }
  } */
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
        if (!e.currentTarget.contains(e.relatedTarget)) toggleError(e, checkDateValues(e, 'all'))
      }}
    >
      <div data-testid="formGroup"
           className="usa-form-group usa-form-group--month">
        <label data-testid="label" className="usa-label"
               htmlFor={`${inputData.id}` + '_month'}>
          {inputData.stringContent.month}
        </label>
        <input
          data-test={`${inputData.dataTest}` + 'Month'}
          id={`${inputData.id}` + '_month'}
          className="usa-input radius-md"
          aria-describedby={`${inputData.id}` + '_error'}
          name={`${inputData.id}` + '_month'}
          label={inputData.stringContent.month}
          unit="month"
          required={true}
          aria-invalid={false}
          type="text"
          pattern="0[1-9]|1[0,1,2]"
          inputMode="numeric"
          maxLength={2}
          minLength={2}
          value={fieldData[`${inputData.id}` + '_month']}
          onInput={saveFieldData(`${inputData.id}` + '_month')}
          onKeyUp={(e) => jumpTo(e, `${inputData.id}` + '_day')}
          onKeyDown={(e) => {
            restrictType(e, 'number'), e.target.setCustomValidity('')
          }}
          onBlur={(e) => {
            dateFormat(e, `${inputData.id}` + '_month'), toggleError(e, checkDateValues(e, 'month'))
          }}
          onInvalid={(e) => e.target.setCustomValidity(' ')}
        />
      </div>
      <div data-testid="formGroup"
           className="usa-form-group usa-form-group--day">
        <label data-testid="label" className="usa-label"
               htmlFor={`${inputData.id}` + '_day'}>
          {inputData.stringContent.day}
        </label>
        <input
          data-test={`${inputData.dataTest}` + 'Day'}
          id={`${inputData.id}` + '_day'}
          className="usa-input radius-md"
          aria-describedby={`${inputData.id}` + '_error'}
          name={`${inputData.id}` + '_day'}
          label={inputData.stringContent.day}
          unit="day"
          required={true}
          aria-invalid={false}
          type="text"
          pattern="0[1-9]|[12][0-9]|3[01]"
          inputMode="numeric"
          minLength={2}
          maxLength={2}
          value={fieldData[`${inputData.id}` + '_day']}
          onInput={saveFieldData(`${inputData.id}` + '_day')}
          onKeyUp={(e) => jumpTo(e, `${inputData.id}` + '_year')}
          onKeyDown={(e) => {
            restrictType(e, 'number'), e.target.setCustomValidity('')
          }}
          onBlur={(e) => {
            dateFormat(e, `${inputData.id}` + '_day'), toggleError(e, checkDateValues(e, 'day'))
          }}
          onInvalid={(e) => e.target.setCustomValidity(' ')}
        />
      </div>
      <div data-testid="formGroup"
           className="usa-form-group usa-form-group--year">
        <label data-testid="label" className="usa-label"
               htmlFor={`${inputData.id}` + '_year'}>
          {inputData.stringContent.year}
        </label>
        <input
          data-test={`${inputData.dataTest}` + 'Year'}
          id={`${inputData.id}` + '_year'}
          className="usa-input radius-md"
          aria-describedby={`${inputData.id}` + '_error'}
          name={`${inputData.id}` + '_year'}
          label={inputData.stringContent.year}
          unit="year"
          required={true}
          aria-invalid={false}
          type="text"
          pattern="19\d{2}|20\d{2}"
          inputMode="numeric"
          minLength={4}
          maxLength={4}
          value={fieldData[`${inputData.id}` + '_year']}
          onInput={saveFieldData(`${inputData.id}` + '_year')}
          onKeyDown={(e) => {
            restrictType(e, 'number'), e.target.setCustomValidity('')
          }}
          onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
          onInvalid={(e) => e.target.setCustomValidity(' ')}
        />
      </div>
    </div>
  )
}

export default DateFields;