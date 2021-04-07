const UsersData = require("../models/LoginModel");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");

const userCtrl = {
  register: async (req, res) => {
    try { 
      const { name, email, password } = req.body;     // FrontEnd submit object to BackEnd
      const user = await UsersData.findOne({ email });

      if (user) return res.status(400).json({ msg: "This email is exist" });
      if (password.length < 6) return res.status(400).json({ msg: "Password so sort" });

      const passwordHash = await bcrypt.hash(password, 10)

      const newUser = new UsersData({
        userName : name,
        eMail : email,
        passWord : passwordHash ,
      });
      await newUser.save();

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({id: newUser._id })

      res.cookie('refreshToken',refreshToken,{
        httpOnly :true,
        path : '/user/refresh_token' 
      })

      res.json({ user: newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }, 
  refreshToken: (req,res) =>{
    try{
      const rf_token = req.cookies.refreshtoken;
      if(!rf_token) res.status(400).json({ msg: "please login or register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET,(err, user) =>{
        if(err) return res.status(400).json({ msg: "please login or register" })
        const accessToken = createAccessToken({id : user.id})
        
        res.json({user, accessToken})
      })
    }catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login : async (req,res)=>{
    try{
      const {email, pass} = req.body
      const user = await Users.findOne({ email})

      if(!user) return res.status(400).json({msg: "User not exist"}) 
      const isMatch = await bcrypt.compare(pass, user.passWord)

      if(!isMatch) return res.status(400).json({msg: "Incorrect password"}) 

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({id: user._id })

      res.cookie('refreshToken',refreshToken,{
        httpOnly :true,
        path : '/user/refresh_token' 
      })
    }catch(err){
      res.status(500).json({msg: err.message});
    }
  },
  logout : async (req,res)=>{
    try{
      res.clearCookie('refreshtoken',{path : '/user/refresh_token'})
    }catch(err){
      res.status(500).json({msg: err.message});
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expires : '1d'});
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{expires : '7d'});
};

module.exports = userCtrl;
