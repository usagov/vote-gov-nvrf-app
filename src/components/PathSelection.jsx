import { Button, Grid } from '@trussworks/react-uswds';
import { useState, useEffect } from 'react';
import { fetchData } from './HelperFunctions/JsonHelper.jsx';
import CardInfo from "./CardInfo";
import BackButton from './BackButton';

function PathSelection(props) {
    const [content, setContent] = useState()
    useEffect(() => {
        fetchData("path-selection.json", setContent);
    }, []);

    if (content) {
        return (
            <>
                <BackButton type={'button'} onClick={props.handlePrev} text={content.back_btn}/>

                <h1>{content.heading_one.replace("%state_name%", props.stateData.name)}</h1>
                <p>{content.subheading_one}</p>

                <h2>{content.heading_two}</h2>

                <Grid row gap>
                    <CardInfo
                        header={content.update_btn_header.replace("%state_name%", props.stateData.name)}
                        paragraph={content.update_btn_paragraph}
                        button={content.update_btn_txt}
                        role={"button"}
                        onClick={() => {props.getRegPath("update"), props.handleNext()}}>
                    </CardInfo>
                    <CardInfo
                        header={content.new_btn_header.replace("%state_name%", props.stateData.name)}
                        paragraph={content.new_btn_paragraph}
                        button={content.new_btn_txt}
                        role={"button"}
                        onClick={() => {props.getRegPath("new"),  props.handleNext()}}>
                    </CardInfo>
                </Grid>
            </>
        );
    }
}

export default PathSelection;