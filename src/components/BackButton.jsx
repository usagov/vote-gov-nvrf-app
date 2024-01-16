import { Button, Icon } from '@trussworks/react-uswds';

function BackButton(props) {

    return (
        <>
            {props.type === 'link' ? 
            <>
            <a href="https://vote.gov">
                <Button className="back-button mobile-width" type="button" onClick={props.onClick} outline>
                    <Icon.ArrowBack aria-label="back arrow icon" style={{margin: "-3px 4px -3px -3px"}}/>
                    <span>{props.text}</span>
                </Button>
            </a>
            </>
                :
            <>
            <Button className="back-button mobile-width" type={props.type} onClick={props.onClick} outline>
                <Icon.ArrowBack aria-label="back arrow icon" style={{margin: "-3px 4px -3px -3px"}}/>
                <span>{props.text}</span>
            </Button>
            </>
            }
            
            <hr className="margin-top-4"/>
        </>
    );
}

export default BackButton;