export default function validateLogin(values) {
  let errors = {};
  if (!values.emailLogin) {
    errors.emailLogin = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.emailLogin)) {
    errors.emailLogin = "Email address is invalid";
  }
  if (!values.passLogin) {
    errors.passLogin = "Password is required";
  } else if (values.passLogin.length < 6) {
    errors.passLogin = "Password must be 6 or more characters";
  }
  // if (!values.name) {
  //   errors.name = "Name is required";
  // } else if (values.name.length < 6) {
  //   errors.name = "Your name must be 6 or more characters";
  // }
  // if (!values.username) {
  //   errors.username = "User is required";
  // }
  return errors;
}
