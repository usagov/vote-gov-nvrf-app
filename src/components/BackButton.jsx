import { Button, Icon } from '@trussworks/react-uswds';

function BackButton(props) {

    return (
        <>
            {props.type === 'link' ? 
            <>
            <a href="https://vote.gov">
                <Button className="back-button mobile-width" type="button" onClick={props.onClick} outline>
                <Icon.ArrowBack aria-label="back arrow icon"/> {props.text}
                </Button>
            </a>
            </>
                :
            <>
            <Button className="back-button mobile-width" type={props.type} onClick={props.onClick} outline>
                <Icon.ArrowBack aria-label="back arrow icon"/> {props.text}
            </Button>
            </>
            }
            
            <span className="divider-grey margin-top-6"></span>
        </>
    );
}

export default BackButton;