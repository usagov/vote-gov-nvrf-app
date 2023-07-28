export const dayValidate=(value)=>{
    console.log('day: ', value)
    //if value is 1 digit, add a 0 in front
    //when value is 2 digits, focus next element
}
export const monthValidate=(value)=>{
    console.log('month: ', value)
    //if value is 1 digit, add a 0 in front
    //when value is 2 digits, focus next element
}
export const yearValidate=(value)=>{
    console.log('year: ', value)
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