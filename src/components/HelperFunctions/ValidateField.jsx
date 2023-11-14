export const jumpTo = (e, nextId) => {
  if (e.target.value.length == e.target.maxLength) {
    document.getElementById(nextId).focus();
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

export const checkExpiration=(date)=> {
  // format is YYYY-MM-DD
  let expireDate = Date.parse(date);
  let todayDate = Date.parse(Date());

  let diff = todayDate - expireDate;
  if (diff > 0) {
      return false
      } else {
        return true
      }
}

export const checkForErrors=(e, requirement)=> {
  switch (requirement) {
    case 'check value exists':
      if (e.target.value) {
        return false
      } else {
        return true
      }

    case 'check value length':
      if (e.target.value.length === e.target.maxLength) {
        return false
      } else {
        return true
      } 

    case 'check state selection':
      if (e.target.value === '') {
        return true
      } else {
        return false
      }

    default:
      return
  }
}