const Thread = require("../models/Thread")
const axios = require("axios")
const Post = require('../models/Post');
const User = require("../models/User");
const Tag = require("../models/Tag");

const ThreadCtrl = {
    getAll: async (req, res) => {
        try {
            const threads = await Thread.find({}).populate('byUser', 'name avatar username permission')
                                                 .populate('category', 'category color').exec();
            console
            return res.json(threads);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const thread = await Thread.findById(id);
            if (thread) {
                return res.status(200).json(thread);
            }
            return res.status(404).json({ msg: "Can't find thread" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const {
                title,
                tags,
                category,
                content,
                newTag
            } = req.body;
            const postUser = await User.findById(req.user.id)
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
                byUser: postUser._id,
                inThread: newThread.id,
                content: content,
            });
            await newPost.save();
            newThread.posts.push(newPost.id);
            await newThread.save();
            Tag.insertMany(newTag);
            return res.status(200).json({ code: 1, msg: "Create thread successful.", id: newThread.id, data: newThread });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.params.id;
            console.log(id)
            const thread = await Thread.findById(id);
            if (thread) {
                thread.isDeleted = true;
                thread.save();
                return res.status(200).json({ msg: "Deleted thread" });
            }
            return res.status(404).json({ msg: "Can't find thread" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAllPostsByIdThread: async (req, res) => {
        try {
            const id = req.params.id;
            
            const pageOptions = {
                page: parseInt(req.query.page, 10) || 1,
                limit: parseInt(req.query.limit, 10) || 10
            }
            const num_doc = await Post.countDocuments({inThread: id});
            const cur_page = pageOptions.page;
            const posts = await Post.find({ inThread: id })
            .populate('byUser', 'name avatar username permission')
            .skip((pageOptions.page - 1) * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec();
            if (posts) {
                return res.status(200).json({numDoc: num_doc, curPage: cur_page, posts});
            }
            return res.status(404).json({ msg: "Can't find any posts with idthread" })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    update: async (req, res) => {
        try {
            let id = req.params.id;
            const { isOpen, isDeleted } = req.body;
            console.log(isOpen, isDeleted);
            const thread = await Thread.findById(id);
            if (thread) {
                thread.isOpen = isOpen;
                await thread.save();
                return res.status(200).json({ msg: "Updated thread" });
            }
            return res.status(404).json({ msg: "Can't find thread" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAllThreadByIdCategory: async(req, res)=>{
        try {
            const id = req.params.id;
            const threads = await Thread.find({category:{_id: id}}).populate('byUser', 'name avatar username permission')
                                                .populate('category', 'category color').exec();;
            //console.log(threads);

            return res.status(200).json(threads);
            
        } catch (error) {
            return res.status(500).json({status:0, message: error.message});
        }
    }
}

module.exports = ThreadCtrl;