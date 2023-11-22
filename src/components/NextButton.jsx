import { Button, Icon } from '@trussworks/react-uswds';

function NextButton(props) {

    return (
        <>
        <Button className="next-button margin-top-5" type={props.type} onClick={props.onClick}>{props.text}
        <Icon.ArrowForward aria-label="forward arrow icon"/>
        </Button>
        </>
    );
}

export default NextButton;