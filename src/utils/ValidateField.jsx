export const focusError = (formId) => {
  if(!document.getElementById(formId).checkValidity()){
      const firstInvalidChild = document.getElementById(formId).querySelectorAll(':invalid')[0];
      let errorContainer;
      errorContainer = firstInvalidChild.id === "eligibility-checkbox" || firstInvalidChild.id === "acknowledge-checkbox" ? firstInvalidChild.parentNode.parentNode : firstInvalidChild.parentNode;
      errorContainer.className = "error-container";
  }
}

export const toggleError = (e, error) => {
  let input = e.currentTarget;
  let dateOfBirthInputs = input.id === "date-of-birth_month" || input.id === "date-of-birth_day" || input.id === "date-of-birth_year";
  let errorContainer;
  errorContainer = input.id === "eligibility-checkbox" || input.id === "date-of-birth" || input.id === "acknowledge-checkbox" ? input.parentNode.parentNode : input.parentNode;
  errorContainer = dateOfBirthInputs ? input.parentNode.parentNode.parentNode.parentNode : errorContainer;

  if (error) {
    errorContainer.className = "error-container";
  } else {
    errorContainer.className = "";
  }
}

export const jumpTo = (e, nextId) => {
  const isNumber = /^[0-9]$/i.test(e.key)
  if (isNumber) {
    if (e.target.value.length == e.target.maxLength) {
      document.getElementById(nextId).focus();
    }
  }
}

export const restrictType = (e, requiredType) => {
  let allowKeys = ['Backspace', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Tab']
  let letters = /^[A-Za-z\s]*$/;

  if (allowKeys.includes(e.key)) {
    return;
  } else if (requiredType === 'letters' && !e.key.match(letters) ) {
    e.preventDefault();
    return;
  } else if (requiredType === 'number' && isNaN(e.key)) {
    e.preventDefault();
    return;
  }
}

export const dateFormat = (e, name, setFieldData, fieldData) => {
  if (e.target.value.length === 1 ) {
    let newValue = 0 + e.target.value;
  setFieldData({ ...fieldData, [name]: newValue })
  } else if (e.target.value.length === 0 ) {
  setFieldData({ ...fieldData, [name]: '' })
  } else {
      return
  }
}

export const phoneFormat=(input)=>{//returns (###) ###-####
    input = input.replace(/\D/g,'');
    var size = input.length;
    if (size>0) {input="("+input}
    if (size>3) {input=input.slice(0,4)+") "+input.slice(4,11)}
    if (size>6) {input=input.slice(0,9)+"-" +input.slice(9)}
    return input;
}

export const dayFormat = (input) => {
  var date = new Date('Jan' + input + ', 2023');
  var dateDoubleDigit = String(date.getDate()).padStart(2, '0');
  return dateDoubleDigit;
}

export const checkForErrors=(e, requirement)=> {
  const value = e.target.value;
  const valueRequired = e.target.required; 

  if (value || valueRequired) {
  switch (requirement) {
    case 'check value exists':
      if (value) {
        return false
      } else {
        return true
      }
    case 'check value length':
      let valueIsLength = e.target.value.length === e.target.maxLength;
      if (valueIsLength) {
        return false
      } else {
        return true
      }

    case 'check state selection':
      if (value === '') {
        return true
      } else {
        return false
      }

    default:
      return
  }    
  }
}