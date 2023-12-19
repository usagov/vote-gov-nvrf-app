export const getField = (fields, uuid) => fields.find(item => item.uuid === uuid);

export const getFieldValue = (fields, uuid, name) => fields.find(item => item.uuid === uuid)[name];

export const getFieldLabel = (fields, uuid) => getFieldValue(fields, uuid, "label");

export const getFieldError = (fields, uuid) => getFieldValue(fields, uuid, "error_msg");