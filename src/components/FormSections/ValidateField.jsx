export const dayValidate=(value)=>{
    if (value > 0 && value < 13 ) {
        return true
    } else {
        return false;
    }
}
export const monthValidate=(value)=>{
    if (value > 0 && value < 32 ) {
        return true
    } else {
        return false;
    }
}
export const yearValidate=(value)=>{
    if (value.length === 4) {
        return true;
    } else {
        return false;
    }
}

export const expirationValidate=()=> {

}

export const focusNext=(currentId, value, maxLength, nextId)=>{
    if (value.length == maxLength) {
        document.getElementById(nextId).focus();
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