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

export const focusNext=(currentId, value, maxLength, nextId)=>{
    if (value.length == maxLength) {
        document.getElementById(nextId).focus();
    }
}

export const handleFormat=(input)=>{
    let output = "";
    input.replace( /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function( match, g1, g2, g3 )
        {
          if ( g1.length ) {
            output += g1;
            if ( g1.length == 3 ) {
                output += "-";
                if ( g2.length ) {
                    output += g2; 
                    if ( g2.length == 3 ) {
                        output += "-";
                        if ( g3.length ) {
                            output += g3;
                        }
                    }
                }
             }
          }
        }       
      );     
    return output;
   } 