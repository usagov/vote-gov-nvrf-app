import { Card, CardBody, CardHeader, CardFooter, Button, Icon, Link } from '@trussworks/react-uswds';
import "../styles/components/CardInfo.css";

function CardInfo(props) {
    const buttonRole = props.role === "link" ? 
    <Link href={props.stateLink} className="usa-button" target="_blank">
            {props.button} <Icon.Launch title="External link opens new window"/>
    </Link>
        :
    <Button type="submit" role={props.role} target={props.target} onClick={props.onClick}>
        {props.button} 
    <Icon.ArrowForward aria-label="forward arrow icon"/>
    </Button>

    return (
        <>
        <Card id="card-info" gridLayout={{ tablet: { col: 6 } }}>
        <CardHeader>
            <h3 className="usa-card__heading">
            {props.header}
            </h3>
        </CardHeader>
        <CardBody>
            <p>
            {props.paragraph}
            </p>
        </CardBody>
        <CardFooter>
            {buttonRole}
        </CardFooter>
        </Card>
        </>
    );
}

export default CardInfo;