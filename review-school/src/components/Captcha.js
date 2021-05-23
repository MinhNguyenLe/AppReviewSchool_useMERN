import React from "react"

import ReCaptcha from "react-google-recaptcha"

const Captcha = () => {

    const onChange = (value) =>{
        console.log("Captcha value: ", value);
    }
    return (
        <div>
            <ReCaptcha
            onChange={onChange}
                theme="light"
                sitekey="6LcXB78aAAAAADAKTkBvNWTulwU5XoCPdG75tyNt" />
        </div>
    );
};

export default Captcha;