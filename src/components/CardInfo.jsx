import { Card, CardBody, CardHeader, CardFooter, Button, Icon, Form } from '@trussworks/react-uswds';
import styles from "../styles/CardInfo.module.css";

function CardInfo(props) {

    return (
        <>
        <Card gridLayout={{ tablet: { col: 6 } }}>
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
            <Form action={props.action} onClick={props.onClick}>
            <Button type="submit" role={props.role} target={props.target}>
                {props.button} 
            <Icon.ArrowForward aria-label="forward arrow icon"/></Button>
            </Form>
        </CardFooter>
        </Card>
        </>
    );
}

export default CardInfo;