import { Button, Icon } from '@trussworks/react-uswds';

function BackButton(props) {

    return (
        <>
            {props.type === 'link' ? 
            <>
            <a href="https://vote.gov">
                <Button className="back-button mobile-width" type="button" onClick={props.onClick} outline>
                    <Icon.ArrowBack aria-hidden="true" aria-label={props.stringContent.backIcon} style={{margin: "-3px 4px -3px -3px"}}/>
                    <span>{props.text}</span>
                </Button>
            </a>
            </>
                :
            <>
            <Button className="back-button mobile-width" type={props.type} onClick={props.onClick} outline data-test="backBtn">
                <Icon.ArrowBack aria-hidden="true" aria-label={props.stringContent.backIcon} style={{margin: "-3px 4px -3px -3px"}}/>
                <span>{props.text}</span>
            </Button>
            </>
            }
            
            <hr aria-hidden="true" className="margin-top-4"/>
        </>
    );
}

export default BackButton;