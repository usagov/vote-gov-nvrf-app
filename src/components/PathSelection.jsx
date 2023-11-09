import { Button, Grid } from '@trussworks/react-uswds';
//import content from "../data/en/path-selection.json";
import CardInfo from "./CardInfo";
import { useState,useEffect } from 'react';
import {fetchData} from './HelperFunctions/JsonHelper.jsx';


function PathSelection(props) {
    const [content, setContent] = useState()
    useEffect(() => {
        fetchData("path-selection.json", setContent);
    }, []);

    return (
        <>
        {content && <div>
        <Button type="button" onClick={props.handlePrev}>
            Back to Eligibility Information
        </Button>

        <h1>{content.heading_one.replace("%state_name%", props.stateData.name)}</h1>
        <p>{content.subheading_one}</p>

        <h2>{content.heading_two}</h2>

        <Grid row gap>
            <CardInfo
                header={content.update_btn_header}
                paragraph={content.update_btn_paragraph}
                button={content.update_btn_txt}
                role={"button"}
                onClick={() => {props.getRegPath("update"), props.handleNext()}}>
            </CardInfo>
            <CardInfo
                header={content.new_btn_header}
                paragraph={content.new_btn_paragraph}
                button={content.new_btn_txt}
                role={"button"}
                onClick={() => {props.getRegPath("new"),  props.handleNext()}}>
            </CardInfo>
        </Grid>
        </div>}
        </>
    );
}

export default PathSelection;