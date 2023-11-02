import { Button } from '@trussworks/react-uswds';

function NextButton(props) {

    return (
        <>
        <Button type={props.type} onClick={props.onClick}>{props.text}</Button>
        </>
    );
}

export default NextButton;