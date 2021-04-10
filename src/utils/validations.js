import validator from "validator";

const required = value => {
  if (typeof value === "string") return !validator.isEmpty(value.trim());

  return true;
};

const numeric = value => {
  if (typeof value === "string") return validator.isNumeric(value.trim());

  return true;
};

const email = value => {
  return validator.isEmail(value);
};

const minLength = (value, min) => {
  return value.length >= min;
};

const stringEquals = (value, valueToCompare) => {
  return validator.equals(value, valueToCompare);
};

export default {
  required,
  numeric,
  email,
  minLength,
  stringEquals
};
