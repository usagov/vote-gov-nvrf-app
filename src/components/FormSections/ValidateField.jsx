
export const focusNext=(value, maxLength, nextId)=>{
    if (value.length == maxLength) {
        document.getElementById(nextId).focus();
    }
}

export const restrictType = (e) => {
    if (e.key === 'Backspace') {
      return;
    } else if (isNaN(e.key)) {
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