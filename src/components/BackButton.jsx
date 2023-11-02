import { Button } from '@trussworks/react-uswds';

function BackButton(props) {

    return (
        <>
            {props.type === 'link' ? 
            <>
            <a href="https://vote.gov">
                <Button type="button" onClick={props.onClick}>
                    {props.text}
                </Button>
            </a>
            </>
                :
            <>
            <Button type={props.type} onClick={props.onClick}>
                    {props.text}
            </Button>
            </>
            }
            
            <hr />
        </>
    );
}

export default BackButton;