import { Button, Icon } from '@trussworks/react-uswds';

function NextButton(props) {

    return (
        <>
        <Button className={props.noMarginTop ? 'next-button mobile-width' : 'next-button mobile-width margin-top-5'} data-test="nextBtn" type={props.type} onClick={props.onClick}>
            <span>{props.text}</span>
            <Icon.ArrowForward aria-label={props.stringContent.forwardIcon} style={{margin: "-3px -3px -3px 4px"}}/>
        </Button>
        </>
    );
}

export default NextButton;