// How to use
// token's parameter in req.body
// function return true or false
// 
// example
// check token in request
// if(!req.body.token){
//     return res.status(400).json({msg: "Token is missing!"});
// }
//
// let captchaValue = await rCaptcha.recaptcha(req.body.token);
//             if(captchaValue === false){
//                 return res.status(400).json({msg: "Invalid token"});
//             }
//  ...
// add field 'token' in postman before send request
// get token in tab console.log in frontend. I had written a captcha component. 

const axios = require('axios')

const recaptcha  = async (token) => {
    try {
        const urlVerify = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
        const gRespone = await axios.post(urlVerify);
        return gRespone.data.success;

    } catch (err) {
        return err;
    }

}

module.exports = {
    recaptcha
};