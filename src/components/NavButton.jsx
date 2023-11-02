import { Button } from '@trussworks/react-uswds';
import content from "../data/navigation.json";

function NavButton(props) {
    const stepNum = props.step;
    console.log('IN FORM: ', props.inForm)

    const backText = (step) => {
        console.log('BACK text step: ', step)
    if (props.inForm === false) {
            console.log('not in form yet - back', props.inForm)
            //not yet in multi step form
            switch(step) {
                case 1:
                    return content.back.vote;
                case 2:
                    return content.back.select_state;
                case 3:
                    return content.back.state_reg_options;
                case 4:
                    return content.back.eligibility_req;
                    
                default:
                    return 'Go back 1';
            }  
        } else {
            //in multi step form
            switch(step) {
                case 1:
                    return content.back.reg_options;
                case 2:
                    return content.back.personal_info;
                case 3:
                    return content.back.address_location;
                case 4:
                    return content.back.identification;
                case 5:
                    return content.back.edit_info;
                    
                default:
                    return 'Go back 2';
            }
        }
    }

      const nextText = (step) => {
        console.log('NEXT text step: ', step)
        if (props.inForm === false) {
            console.log('not in form yet - next')
            //not yet in multi step form
            switch(step) {
                case 1:
                    return content.next.next;
                case 2:
                    return content.next.start;
                case 3:
                    return content.next.continue;
                case 4:
                    return 'NO BUTTON ON THIS PAGE';
                default:
                    return 'Next 1';
            }  
        } else {
            //now in multi step form
            switch(step) {
                case 1:
                    return content.next.address_location;
                case 2:
                    return content.next.identification;
                case 3:
                    return content.next.political_party;
                case 4:
                    return content.next.eligibility_req;
                case 5:
                    return content.next.confirm_info;
                case 6:
                    return 'case 6';
                    
                default:
                    return 'Next 2';
            }            
        }
      }

    return (
        <>
        {props.direction === "back" && <>
        <Button type={props.type}>{backText(stepNum)}</Button>
        <span className="top-divider"></span>
        </>}

        {props.direction === "next" && props.step != 4 && <>
        <Button type={props.type}>{nextText(stepNum)}</Button>
        </>}
        </>
    );
}

export default NavButton;