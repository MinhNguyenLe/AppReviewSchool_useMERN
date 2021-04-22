const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Resize = require('../../util/resize');
const path = require('path');
const { json } = require('express');

const userCtrl = {
    getAll(req, res) {
        User.find({})
            .then((users) => {
                users = users.map(function (item) {
                    item.avatar =
                        req.protocol +
                        '://' +
                        req.get('host') +
                        '/images/avatar/' +
                        item.avatar;
                    return item;
                });
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
                user.avatar =
                    req.protocol +
                    '://' +
                    req.get('host') +
                    '/images/avatar/' +
                    user.avatar;
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
                user.avatar =
                    req.protocol +
                    '://' +
                    req.get('host') +
                    '/images/avatar/' +
                    user.avatar;
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
                user.avatar =
                    req.protocol +
                    '://' +
                    req.get('host') +
                    '/images/avatar/' +
                    user.avatar;
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
                users = users.map(function (item) {
                    item.avatar =
                        req.protocol +
                        '://' +
                        req.get('host') +
                        '/images/avatar/' +
                        item.avatar;
                    return item;
                });
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

            let avatarName;
            if (req.file) {
                const imagePath = path.join(__dirname);
                let splitPath = imagePath.split('\\');
                splitPath = splitPath.slice(0, -2);
                let newImagePath = splitPath.join('\\');
                newImagePath += '\\public\\images\\avatar';
                const fileUpload = new Resize(newImagePath);
                const filename = await fileUpload.save(req.file.buffer);
                avatarName = filename;
            }

            const newUser = new User({
                username: username,
                name: name,
                email: email,
                password: passwordHash,
            });

            if (req.file) {
                newUser.avatar = avatarName;
            }
            await newUser.save();

            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });

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
            
            if (!rf_token)
                return res.status(400).json({ msg: 'you need provide refresh token' });

            if(blackListRT.has(rf_token))
                return res.status(400).json({msg: "you are logout, please login again."});

            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err)
                        return res
                            .status(400)
                            .json({ msg: err });
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

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/users/refresh_token',
            });

            return res.status(200).json({msg: "Login successful!"})
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        try {
            const rf_token = req.headers['x-refresh-token']
            blackListRT.add(rf_token);
            res.clearCookie('refreshToken',{path : '/users/refresh_token'})
            return res.status(200).json({msg: "Log out succesful."});
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
};

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' }); // access token expires in 5 minutes
};
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' }); // refresh token expires in 1 hour => need login again
};

module.exports = userCtrl;
