const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('express');

const userCtrl = {
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
            return res.status(500).json({ msg: 'permission invalid' });
        }
        User.find({ permission })
            .then((users) => {
                return res.json(users);
            })
            .catch((err) => {
                return res.status(500).json({ msg: err.message });
            });
    },
    register: async (req, res) => {
        try {
            const {
                username,
                name,
                password,
                email,
                permission,
                avatar,
            } = req.body; // FrontEnd submit object to BackEnd
            let user = await User.findOne({ username });
            console.log(user)
            if (!user) {
                user = await User.findOne({ email });
            }

            if (user)
                return res
                    .status(400)
                    .json({ msg: 'This email or username is exist' });
            if (password.length < 6)
                return res.status(400).json({ msg: 'Password so sort' });

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new User({
                username: username,
                name: name,
                email: email,
                password: passwordHash,
                permission: permission,
                avatar: avatar,
            });
            //await newUser.save();

            const accessToken = createAccessToken({ id: newUser._id });
            console.log(accessToken);
            const refreshToken = createRefreshToken({ id: newUser._id });
            console.log(refreshToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
            });


            res.json({ user: newUser });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.headers['x-refresh-token']
            // const rf_token = req.cookies.refreshToken;
            //console.log(rf_token)
            if (!rf_token)
                return res.status(400).json({ msg: 'please login or register' });

            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err)
                        return res
                            .status(400)
                            .json({ msg: 'please login or register' });
                    const accessToken = createAccessToken({ id: user.id });

                    return res.json({ user, accessToken });
                }
            );
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
           console.log({ email, password } )
            if (!user) return res.status(400).json({ msg: 'User not exist' });
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch)
            if (!isMatch)
                return res.status(400).json({ msg: 'Incorrect password' });

            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = createRefreshToken({ id: user._id });

            // access token saved at header and refresh token saved at cookie
            res.set({'x-access-token': accessToken,
            })
            res.set({'x-refresh-token': refreshToken});
            // res.cookie('refreshToken', refreshToken, {
            //     httpOnly: true,
            //     path: '/users/refresh_token',
            // });

            return res.status(200).json({msg: "Login successful!"})
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        try {
            // We don't have db to save token, I think clear token in client.
            return res.status(200).json({msg: "Log out succesful."});
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
};

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userCtrl;
