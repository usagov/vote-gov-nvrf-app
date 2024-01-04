// import { useState, useEffect } from 'react'
// import {fetchData} from './HelperFunctions/JsonHelper.jsx';
import { Label, Alert } from '@trussworks/react-uswds';
// import { getFieldError, getFieldLabel } from './HelperFunctions/fieldParser';

function Error(props) {
    // const [fieldContent, setFieldContent] = useState('')

    // useEffect(() => {
    //   fetchData("fields.json", setFieldContent);
    // }, []);

    console.log('props: ', props)

    return (
        <div className={props.showError ? `error-container ${props.classes}` : props.classes}>
            <Label className="text-bold" htmlFor={props.htmlFor}>
                <strong>{props.label}{(props.fieldRequired === "1") && <span className='required-text'>*</span>}</strong>
                {props.inputField}
                {props.showError &&
                    <span id={props.errorId} role="alert" className="error-text text-bold">
                        {props.errorMsgUUID}
                    </span>
                }
            <Alert type="info" slim noIcon role="alert">
                Test text for informational alert instructions.
            </Alert>
            </Label>
        </div>
    );
}

export default Error;


{/* <Error 
label={}
className={}
showError={}
id={}
errorMsgUUID={}
inputField={}
/> */}