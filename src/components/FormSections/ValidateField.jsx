
export const focusNext=(value, maxLength, nextId)=>{
    if (value.length == maxLength) {
        document.getElementById(nextId).focus();
    }
}

export const restrictType = (e, requiredType) => {
    let letters = /^[A-Za-z]+$/;

    if (e.key === 'Backspace') {
      return;
    } else if (requiredType === 'letters' && !e.key.match(letters) ) {
      e.preventDefault();
      return;
    } else if (requiredType === 'number' && isNaN(e.key)) {
      e.preventDefault();
      return;
    }
}

export const restrictLength = (e, value, maxLength) => {
  if (e.key === 'Backspace') {
    return;
  } else if (value.length === maxLength) {
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

export const expirationValidate=()=> {
  // format is YYYY-MM-DD
  let expireDate = Date.parse("2023-08-03");
  let todayDate = Date.parse(Date());

  let diff = todayDate - expireDate;
  if (diff > 0) {
      return false
      } else {
        return true
      }
}

export const checkForErrors=(e, requirement)=> {
  if (requirement === 'check value exists') {
    if (e.target.value) {
      console.log('ERROR: value is empty')
      return false
    } else {
      console.log('value exists')
      return true
    }    
  }

  if (requirement === 'check value length') {
    if (e.target.value.length != e.target.maxLength) {
      console.log('ERROR: value not long enough')
      return true
    } else {
      console.log('value is correct length')
      return false
    }    
  }
}