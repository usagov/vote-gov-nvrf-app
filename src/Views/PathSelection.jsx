import { useState, useEffect } from 'react'
import {Button, CardGroup, Card, CardHeader, CardBody, CardFooter, Icon} from '@trussworks/react-uswds';
import BackButton from "Components/Buttons/BackButton"
import {sanitizeDOM} from "Utils/JsonHelper";

function PathSelection(props) {
    const content = props.content;
    const cards = props.cards;
    const navContent = props.navContent;
    const stringContent = props.stringContent;

    const introContent = content.find(item => item.uuid === "b3299979-e26c-4885-a949-e1a2c27de91b");
    const cardOne = cards.find(item => item.uuid === "0ac52b5d-4381-4b4e-830e-38319f3a3757");
    const cardTwo = cards.find(item => item.uuid === "3abd804c-2787-44f9-a06b-ad6d63ca797f");
    const introContentBody = sanitizeDOM(introContent.body);
    const cardOneBody = sanitizeDOM(cardOne.body);
    const cardTwoBody = sanitizeDOM(cardTwo.body);

    //Analytics values - do not change or translate
    const analyticsLabels = {
        pathSelectionTitle: "Path Selection page",
    }

    return (
        <>
            <BackButton stringContent={stringContent} type={'button'} onClick={props.handlePrev} text={navContent.back.eligibility_req}/>
            <div className={'margin-top-5 maxw-tablet margin-x-auto'}>
            <h1>{introContent.title.replace("@state_name", props.stateData.name)}</h1>

            <div dangerouslySetInnerHTML= {{__html: introContentBody}}/>

            <CardGroup className="padding-top-4">
                <Card className="card-info"
                      gridLayout={{ tablet: { col: 6 } }}
                      containerProps={{ className: 'border-1px border-gray-30 radius-md' }}
                >
                    <CardHeader className="container-test-3">
                        <h3 className="usa-card__heading">
                            {cardOne.heading.replace("@state_name", props.stateData.name)}
                        </h3>
                    </CardHeader>
                    <CardBody dangerouslySetInnerHTML= {{__html: cardOneBody}} />
                    <CardFooter className="margin-top-3">
                        <Button data-test="pathBtn" type="submit"
                            onClick={() => {
                                props.getRegPath("update"),
                                props.handleNext(),
                                dataLayer.push({'NVRF_path': 'update_registration_path', 'NVRF_page_title': analyticsLabels.pathSelectionTitle, 'event': 'NVRF_STEP_SUBMIT'})
                            }}>
                            <span>{cardOne.button_label}</span>
                            <Icon.ArrowForward aria-label={stringContent.forwardIcon} style={{margin: "-3px -3px -3px 4px"}}/>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="card-info"
                      gridLayout={{ tablet: { col: 6 } }}
                      containerProps={{ className: 'border-1px border-gray-30 radius-md' }}
                >
                    <CardHeader>
                        <h3 className="usa-card__heading">
                            {cardTwo.heading.replace("@state_name", props.stateData.name)}
                        </h3>
                    </CardHeader>
                    <CardBody dangerouslySetInnerHTML= {{__html: cardTwoBody}}/>
                    <CardFooter className="margin-top-3">
                        <Button data-test="pathBtn" type="submit"
                            onClick={() => {
                                props.getRegPath("new"),
                                props.handleNext(),
                                dataLayer.push({'NVRF_path': 'new_registration_path', 'NVRF_page_title': analyticsLabels.pathSelectionTitle, 'event': 'NVRF_STEP_SUBMIT'})
                            }}>
                            <span>{cardTwo.button_label}</span>
                            <Icon.ArrowForward aria-label={stringContent.forwardIcon} style={{margin: "-3px -3px -3px 4px"}}/>
                        </Button>
                    </CardFooter>
                </Card>
            </CardGroup>
            </div>
        </>
    );
}

export default PathSelection;