import { Button, Icon } from '@trussworks/react-uswds';

function BackButton(props) {

    return (
        <>
            {props.type === 'link' ? 
            <>
            <a href="https://vote.gov">
                <Button className="back-button" type="button" onClick={props.onClick} outline>
                <Icon.ArrowBack aria-label="back arrow icon"/> {props.text}
                </Button>
            </a>
            </>
                :
            <>
            <Button className="back-button" type={props.type} onClick={props.onClick} outline>
                <Icon.ArrowBack aria-label="back arrow icon"/> {props.text}
            </Button>
            </>
            }
            
            <hr />
        </>
    );
}

export default BackButton;