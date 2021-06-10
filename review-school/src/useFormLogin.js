import { useState, useEffect } from "react";

const useFormLogin = (callback, validate) => {
  const [valuesLogin, setValuesLogin] = useState({});
  const [errorsLogin, setErrorsLogin] = useState({});
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  useEffect(() => {
    if (Object.keys(errorsLogin).length === 0 && isSubmittingLogin) {
      callback();
    }
  }, [errorsLogin]);

  const handleSubmitLogin = (event) => {
    if (event) event.preventDefault();
    setErrorsLogin(validate(valuesLogin));
    setIsSubmittingLogin(true);
  };

  const handleChangeLogin = (event) => {
    event.persist();
    setValuesLogin((valuesLogin) => ({
      ...valuesLogin,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    valuesLogin,
    errorsLogin,
    handleChangeLogin,
    handleSubmitLogin,
  };
};

export default useFormLogin;
