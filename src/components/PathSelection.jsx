import { Button, CardGroup, Card, CardHeader, CardBody, CardFooter, Icon } from '@trussworks/react-uswds';
import { useState, useEffect } from 'react';
import { fetchData } from './HelperFunctions/JsonHelper.jsx';
import BackButton from './BackButton';

function PathSelection(props) {
    const [content, setContent] = useState('')
    const [cards, setCards] = useState('')

    useEffect(() => {
        fetchData("cards.json", setCards);
        fetchData("pages.json", setContent);
    }, []);

    if (content && cards) {
        const introContent = content.find(item => item.uuid === "b3299979-e26c-4885-a949-e1a2c27de91b");
        const cardOne = cards.find(item => item.uuid === "0ac52b5d-4381-4b4e-830e-38319f3a3757");
        const cardTwo = cards.find(item => item.uuid === "3abd804c-2787-44f9-a06b-ad6d63ca797f");
        return (
            <>
                <BackButton type={'button'} onClick={props.handlePrev} text={'Replace this text'}/>

                <h1>{introContent.title.replace("@state_name", props.stateData.name)}</h1>
                <p>{introContent.body}</p>

                <CardGroup className="padding-top-6 border-black container-test-1">
                    <Card className="card-info border-black container-test-2" gridLayout={{ tablet: { col: 4 } }}>
                        <CardHeader className="container-test-3">
                            <h3 className="usa-card__heading">
                            {cardOne.heading.replace("@state_name", props.stateData.name)}
                            </h3>
                        </CardHeader>
                        <CardBody>
                            <p>
                            {cardOne.body}
                            </p>
                        </CardBody>
                        <CardFooter className="padding-top-6">
                            <Button type="submit" onClick={() => {props.getRegPath("update"), props.handleNext()}}>
                                {cardOne.button_label}
                            <Icon.ArrowForward aria-label="forward arrow icon"/>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="card-info" gridLayout={{ tablet: { col: 4 } }}>
                        <CardHeader>
                            <h3 className="usa-card__heading">
                            {cardTwo.heading.replace("@state_name", props.stateData.name)}
                            </h3>
                        </CardHeader>
                        <CardBody>
                            <p>
                            {cardTwo.body}
                            </p>
                        </CardBody>
                        <CardFooter className="padding-top-6">
                            <Button type="submit" onClick={() => {props.getRegPath("new"),  props.handleNext()}}>
                                {cardTwo.button_label}
                            <Icon.ArrowForward aria-label="forward arrow icon"/>
                            </Button>
                        </CardFooter>
                    </Card>
                </CardGroup>
            </>
        );
    }
}

export default PathSelection;