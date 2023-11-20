import { Button, Grid } from '@trussworks/react-uswds';
import { useState, useEffect } from 'react';
import { fetchData } from './HelperFunctions/JsonHelper.jsx';
import CardInfo from "./CardInfo";
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

                <Grid row gap>
                    <CardInfo
                        header={cardOne.heading.replace("@state_name", props.stateData.name)}
                        paragraph={cardOne.body}
                        button={cardOne.button_label}
                        role={"button"}
                        onClick={() => {props.getRegPath("update"), props.handleNext()}}>
                    </CardInfo>
                    <CardInfo
                        header={cardTwo.heading.replace("@state_name", props.stateData.name)}
                        paragraph={cardTwo.body}
                        button={cardTwo.button_label}
                        role={"button"}
                        onClick={() => {props.getRegPath("new"),  props.handleNext()}}>
                    </CardInfo>
                </Grid>
            </>
        );
    }
}

export default PathSelection;