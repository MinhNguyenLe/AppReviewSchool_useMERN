export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 or more characters";
  }
  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 6) {
    errors.name = "Your name must be 6 or more characters";
  }
  if (!values.username) {
    errors.username = "User is required";
  }
  return errors;
}
