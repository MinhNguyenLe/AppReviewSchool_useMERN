const jwt = require('jsonwebtoken')

global.blackListRT= new Set();

const auth =(req, res, next)=>{
  try{
    const token = req.headers['x-access-token']
    if(!token) return res.status(403).json({msg : "No token provided."});

    if(blackListRT.has(token))
      return res.status(400).json({msg: "You are not login, please login."});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
      if(err) return res.status(200).json({msg : err, code: -1})

      req.user = user
      next()
    })
  }catch(err){
    return res.status(500).json({msg : err.message})
  }
}

module.exports = auth