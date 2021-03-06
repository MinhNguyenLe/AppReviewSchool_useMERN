const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { json } = require("express");

const userController = {
  getAll(req, res) {
    User.find({})
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getByUsername(req, res) {
    const username = req.params.username;
    User.findOne({ username })
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getByEmail(req, res) {
    const email = req.params.email;
    User.findOne({ email })
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getById(req, res) {
    const id = req.params.id;
    User.findById(id)
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getByPermission(req, res) {
    const permission = req.params.permission;
    if (permission < 0 || permission > 2) {
      return res.status(500).json({ msg: "permission invalid" });
    }
    User.find({ permission })
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getMe(req, res) {
    const id = req.user.id;
    User.findById(id)
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  register: async (req, res) => {
    try {
      const { username, name, password, email, permission } = req.body; // FrontEnd submit object to BackEnd

      let user = await User.findOne({ username });

      if (!user) {
        user = await User.findOne({ email });
      }

      if (user)
        return res.status(400).json({ msg: "This email or username is exist" });
      if (password.length < 6)
        return res.status(400).json({ msg: "Password so short" });

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        name: name,
        email: email,
        password: passwordHash,
      });

      if (req.file) newUser.avatar = req.file.path;

      await newUser.save();

      return res.json({ msg: "Success", id: newUser.id });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.headers["x-refresh-token"];

      if (!rf_token)
        return res.status(400).json({ msg: "you need provide refresh token" });

      if (blackListRT.has(rf_token))
        return res
          .status(400)
          .json({ msg: "you are logout, please login again." });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: err });
        const accessToken = createAccessToken({ id: user.id });

        return res.json({ user, accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      // console.log({ username, password });
      if (!user) return res.status(400).json({ msg: "User not exist" });
      const isMatch = await bcrypt.compare(password, user.password);
      // console.log(isMatch);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.set({ "x-access-token": accessToken });

      res.set({ "x-refresh-token": refreshToken });

      return res.status(200).json({ msg: "Login successful!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      const rf_token = req.headers["x-refresh-token"];
      blackListRT.add(rf_token);
      return res.status(200).json({ msg: "Log out successful." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  }); // access token expires in 5 minutes
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1h",
  }); // refresh token expires in 1 hour => need login again
};

module.exports = userController;
