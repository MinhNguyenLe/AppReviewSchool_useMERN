import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [valuesRegister, setValuesRegister] = useState({});
  const [errorsRegister, setErrorsRegister] = useState({});
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);

  useEffect(() => {
    if (Object.keys(errorsRegister).length === 0 && isSubmittingRegister) {
      callback();
    }
  }, [errorsRegister]);

  const handleSubmitRegister = (event) => {
    if (event) event.preventDefault();
    setErrorsRegister(validate(valuesRegister));
    setIsSubmittingRegister(true);
  };

  const handleChangeRegister = (event) => {
    event.persist();
    setValuesRegister((valuesRegister) => ({
      ...valuesRegister,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    valuesRegister,
    errorsRegister,
    handleChangeRegister,
    handleSubmitRegister,
  };
};

export default useForm;
