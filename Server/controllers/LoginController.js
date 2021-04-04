const Users = require("../models/useModels");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });

      if (user) return res.status(400).json({ msg: "This email is exist" });
      if (password.length < 6)
        return res.status(400).json({ msg: "Password so sort" });

      const newUser = new Users({
        name,
        email,
        password,
      });

      await newUser.save();

      const accessToken = createAccessToken({ id: newUser._id });

      res.json({ user: newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user);
};

module.exports = userCtrl;
