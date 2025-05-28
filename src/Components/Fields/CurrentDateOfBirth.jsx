import FieldsetContainer from "Components/FieldsetContainer";
import { getField } from "Utils/fieldParser";

function CurrentDateOfBirth(props) {
  const uuid = "d31b2a64-36a9-4bc6-a9d1-e68d2be8c211";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  //Get month, day, year field data
  const uuid2 = "2913e847-6d27-48f7-9281-e91f20a9f33d";
  const field_month = getField(props.fieldContent, uuid2);
  const uuid3 = "4297d470-4977-4c7b-a550-940f23d93f20";
  const field_day = getField(props.fieldContent, uuid3);
  const uuid4 = "b7205945-bb5f-4109-a825-810bedf02b4b";
  const field_year = getField(props.fieldContent, uuid4);

  return (
    stateField && (
      <FieldsetContainer
        fieldType={"date"}
        inputData={{
          id: field.nvrf_id,
          dataTest: "dob",
          required: stateField.required,
          label: field.label,
          stringContent: props.stringContent,
          error_msg: field.error_msg,
          help_text: field.help_text,
          field_month: field_month,
          field_day: field_day,
          field_year: field_year,
        }}
        saveFieldData={props.saveFieldData}
        fieldData={props.fieldData}
        dateFormat={props.dateFormat}
      />
    )
  );
}

export default CurrentDateOfBirth;
