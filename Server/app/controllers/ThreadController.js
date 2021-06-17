const Thread = require("../models/Thread")
const axios = require("axios")
const Post = require('../models/Post');
const User = require("../models/User");

const ThreadCtrl = {
    getAll: async (req, res) => {
        try {
            const threads = await Thread.find({}).populate('byUser', 'name avatar username').exec();
            return res.json(threads);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const thread = await Thread.findById(id);
            if (thread){
                return res.status(200).json(thread);
            }
            return res.status(404).json({msg: "Can't find thread"})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    create: async (req, res) => {
        try {
            const {
                title,
                tags,
                category,
                content,
            } = req.body;
            const postUser = await User.findById('6093aca55a313c3e7cbcd59b')
            let newThread = new Thread({
                byUser: postUser._id,
                title: title,
                tags: tags,
                category: category,
                posts: [],
                lastedPostBy: postUser.username,
                lastedPostAt: new Date().toISOString()
            });
            await newThread.save();

            const newPost = new Post({
                byUser: '6093aca55a313c3e7cbcd59b',
                inThread: newThread.id,
                content: content,
            });
            await newPost.save();
            newThread.posts.push(newPost.id);
            await newThread.save();
            return res.status(200).json({code: 1, msg: "Create thread successful.", id: newThread.id, data: newThread});
            
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.params.id;
            const thread = await Thread.findById(id);
            if(thread){
                await Thread.deleteOne(id);
                return res.status(200).json({msg: "Deleted thread"});
            } 
            return res.status(404).json({msg: "Can't find thread"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getAllPostsByIdThread: async (req, res) => {
        try {
            let id = req.params.id;           
            const posts = await Post.find({inThread: id}).populate('byUser', 'name avatar username').exec();
            if (posts){
                return res.status(200).json(posts);
            }
            return res.status(404).json({msg: "Can't find any posts with idthread"})

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = ThreadCtrl;