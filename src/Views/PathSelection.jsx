import {
  Button,
  CardGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
} from "@trussworks/react-uswds";
import { useContext } from "react";
import { DataContext } from "Context/DataProvider";
import BackButton from "Components/Buttons/BackButton";
import { sanitizeDOM } from "Utils/JsonHelper";

function PathSelection(props) {
  const { pageContent, stateContent, stringContent, stepContent } =
    useContext(DataContext);
  const step = stepContent.reg_options;

  const introContent = pageContent.data.find(
    (item) => item.uuid === "b3299979-e26c-4885-a949-e1a2c27de91b",
  );
  const cardOne = stringContent.data.nvrf_card.find(
    (item) => item.nvrf_card_id === "change",
  );
  const cardTwo = stringContent.data.nvrf_card.find(
    (item) => item.nvrf_card_id === "new",
  );

  //Analytics values - do not change or translate
  const analyticsLabels = {
    pathSelectionTitle: "Path Selection page",
  };

  return (
    <>
      <BackButton
        type={"button"}
        onClick={props.handlePrev}
        text={step.back_button_label}
      />
      <div className={"margin-top-5 maxw-tablet margin-x-auto"}>
        <h1>
          {introContent.title.replace("@state_name", stateContent.data.name)}
        </h1>

        <div
          dangerouslySetInnerHTML={{ __html: sanitizeDOM(introContent.body) }}
        />

        <CardGroup className="padding-top-4">
          <Card
            className="card-info"
            gridLayout={{ tablet: { col: 6 } }}
            containerProps={{
              className: "border-1px border-gray-30 radius-md",
            }}
          >
            <CardHeader className="container-test-3">
              <h3 className="usa-card__heading">
                {cardOne.nvrf_card_heading.replace(
                  "@state_name",
                  stateContent.data.name,
                )}
              </h3>
            </CardHeader>
            <CardBody
              dangerouslySetInnerHTML={{
                __html: sanitizeDOM(cardOne.nvrf_card_text),
              }}
            />
            <CardFooter className="margin-top-3">
              <Button
                data-test="pathBtn"
                type="submit"
                onClick={() => {
                  props.getRegPath("update"),
                    props.handleNext(),
                    dataLayer.push({
                      NVRF_path: "update_registration_path",
                      NVRF_page_title: analyticsLabels.pathSelectionTitle,
                      event: "NVRF_STEP_SUBMIT",
                    });
                }}
              >
                <span>{cardOne.nvrf_card_button_label}</span>
                <Icon.ArrowForward
                  role="none"
                  aria-hidden=""
                  style={{ margin: "-3px -3px -3px 4px" }}
                />
              </Button>
            </CardFooter>
          </Card>

          <Card
            className="card-info"
            gridLayout={{ tablet: { col: 6 } }}
            containerProps={{
              className: "border-1px border-gray-30 radius-md",
            }}
          >
            <CardHeader>
              <h3 className="usa-card__heading">
                {cardTwo.nvrf_card_heading.replace(
                  "@state_name",
                  stateContent.data.name,
                )}
              </h3>
            </CardHeader>
            <CardBody
              dangerouslySetInnerHTML={{
                __html: sanitizeDOM(cardTwo.nvrf_card_text),
              }}
            />
            <CardFooter className="margin-top-3">
              <Button
                data-test="pathBtn"
                type="submit"
                onClick={() => {
                  props.getRegPath("new"),
                    props.handleNext(),
                    dataLayer.push({
                      NVRF_path: "new_registration_path",
                      NVRF_page_title: analyticsLabels.pathSelectionTitle,
                      event: "NVRF_STEP_SUBMIT",
                    });
                }}
              >
                <span>{cardTwo.nvrf_card_button_label}</span>
                <Icon.ArrowForward
                  role="none"
                  aria-hidden=""
                  style={{ margin: "-3px -3px -3px 4px" }}
                />
              </Button>
            </CardFooter>
          </Card>
        </CardGroup>
      </div>
    </>
  );
}

export default PathSelection;
