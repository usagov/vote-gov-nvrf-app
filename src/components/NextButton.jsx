import { Button, Icon } from '@trussworks/react-uswds';

function NextButton(props) {

    return (
        <>
        <Button className={props.noMarginTop ? 'next-button mobile-width' : 'next-button mobile-width margin-top-5'} type={props.type} onClick={props.onClick}>
            <span>{props.text}</span>
            <Icon.ArrowForward aria-label="forward arrow icon" style={{margin: "-3px -3px -3px 4px"}}/>
        </Button>
        </>
    );
}

export default NextButton;