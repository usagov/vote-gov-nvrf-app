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

    if (content) {
        const introContent = content.find(item => item.uuid === "b3299979-e26c-4885-a949-e1a2c27de91b");
        return (
            <>
                <BackButton type={'button'} onClick={props.handlePrev} text={'Replace this text'}/>

                <h1>{introContent.title.replace("@state_name", props.stateData.name)}</h1>
                <p>{introContent.body}</p>

                <Grid row gap>
                    <CardInfo
                        header={cards[0].heading.replace("@state_name", props.stateData.name)}
                        paragraph={cards[0].body}
                        button={cards[0].button_label}
                        role={"button"}
                        onClick={() => {props.getRegPath("update"), props.handleNext()}}>
                    </CardInfo>
                    <CardInfo
                        header={cards[2].heading.replace("@state_name", props.stateData.name)}
                        paragraph={cards[2].body}
                        button={cards[2].button_label}
                        role={"button"}
                        onClick={() => {props.getRegPath("new"),  props.handleNext()}}>
                    </CardInfo>
                </Grid>
            </>
        );
    }
}

export default PathSelection;