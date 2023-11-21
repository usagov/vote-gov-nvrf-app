import { Button, CardGroup, Card, CardHeader, CardBody, CardFooter, Icon } from '@trussworks/react-uswds';
import { useState, useEffect } from 'react';
import { fetchData } from './HelperFunctions/JsonHelper.jsx';
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

                <CardGroup className="padding-top-6 border-black container-test-1">
                    <Card className="card-info border-black container-test-2" gridLayout={{ tablet: { col: 4 } }}>
                        <CardHeader className="container-test-3">
                            <h3 className="usa-card__heading">
                            {content.update_btn_header.replace("%state_name%", props.stateData.name)}
                            </h3>
                        </CardHeader>
                        <CardBody>
                            <p>
                            {content.update_btn_paragraph}
                            </p>
                        </CardBody>
                        <CardFooter className="padding-top-6">
                            <Button type="submit" onClick={() => {props.getRegPath("update"), props.handleNext()}}>
                                {content.update_btn_txt}
                            <Icon.ArrowForward aria-label="forward arrow icon"/>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="card-info" gridLayout={{ tablet: { col: 4 } }}>
                        <CardHeader>
                            <h3 className="usa-card__heading">
                            {content.new_btn_header.replace("%state_name%", props.stateData.name)}
                            </h3>
                        </CardHeader>
                        <CardBody>
                            <p>
                            {content.new_btn_paragraph}
                            </p>
                        </CardBody>
                        <CardFooter className="padding-top-6">
                            <Button type="submit" onClick={() => {props.getRegPath("new"),  props.handleNext()}}>
                                {content.new_btn_txt}
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