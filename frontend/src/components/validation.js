import Joi from "joi-browser";

const schema = {
  first_name: Joi.string()
    .regex(/^[A-Za-z]+([a-zA-Z ]+)*$/)
    .label("First Name")
    .required(),
  last_name: Joi.string()
    .regex(/^[A-Za-z]+([a-zA-Z ]+)*$/)
    .label("Last Name"),
  email: Joi.string().email().label("Email"),
  password: Joi.string().min(8).label("Password"),
  password2: Joi.string()
    .min(8)
    .valid(Joi.ref("password"))
    .label("Confirm Password"),
};

// helper functions
const validate = (obj) => {
  const { success, errors, ...state } = obj; // create new object without the errors key
  const { error } = Joi.validate(state, schema, { abortEarly: false });

  const result = {};
  if (!error) return result;

  // get the message for every error
  for (let item of error.details) result[item.path[0]] = getErrorMessage(item);

  return result;
};

const validateField = (name, value, state) => {
  if (name === "password2") {
    console.log("password2");
    const obj = { password: state.password, [name]: value };
    const newSchema = {
      [name]: schema[name],
      password: schema["password"],
    };
    const { error } = Joi.validate(obj, newSchema);
    return !error ? null : error.details[0];
  } else {
    const obj = { [name]: value };
    const singleSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, singleSchema);
    if (!error) return null;
    return error.details[0];
  }
};

const getErrorMessage = (error) => {
  const type = error.type;
  const key = error.path[0];
  const label = error.context.label;

  let message = "";

  switch (key) {
    case "first_name":
      switch (type) {
        case "any.empty":
          message = label + " cannot be empty";
          break;
        case "string.regex.base":
          message = label + " must be letters only";
          break;
        default:
          message = "Unindentified error";
          break;
      }
      break;
    case "last_name":
      switch (type) {
        case "any.empty":
          message = label + " cannot be empty";
          break;
        case "string.regex.base":
          message = label + " must be letters only";
          break;
        default:
          message = "Unidentified error";
          break;
      }
      break;
    case "email":
      switch (type) {
        case "any.empty":
          message = label + " cannot be empty";
          break;
        case "string.email":
          message = "Must be a valid email";
          break;
        default:
          message = "Unidentified Error!";
          break;
      }
      break;
    case "password":
      switch (type) {
        case "any.empty":
          message = label + " cannot be empty";
          break;
        case "string.min":
          message = "Must be at least 8 characters long";
          break;
        default:
          message = "Unidentified error.";
          break;
      }
      break;
    case "password2":
      switch (type) {
        case "any.empty":
          message = label + " cannot be empty";
          break;
        case "string.min":
          message = "Must be at least 8 characters long";
          break;
        case "any.allowOnly":
          message = "Password does not match";
          break;
        default:
          message = "Unidentified error.";
          break;
      }
      break;
    default:
      message = "Unidentified error.";
      break;
  }

  return message;
};

export { validate, validateField, getErrorMessage };
