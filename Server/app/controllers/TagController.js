const Tag = require("../models/Tag")
const axios = require("axios")
const Thread = require("../models/Thread")
const TagCtrl = {
    getAll: async (req, res) => {
        try {
            let tags = await Tag.find({});
            return res.json(tags);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const tag = await Tag.findById(id);
            if (tag){
                return res.status(200).json(tag);
            }
            return res.status(404).json({msg: "Can't find tag"})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    create: async (req, res) => {
        try {
            const {
                tagName,
                inThread
            } = req.body;

            const newTag = new Tag({
                tagName: tagName,
                inThread: inThread
            });
            await newTag.save();
            return res.status(200).json({code: 1, msg: "Create tag successful.", id: newTag.id});
            
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    update: async (req, res) => {
        try {
            let id = req.params.id;
            const { tagName,
                inThread} = req.body;
            const curTag = await Tag.findById(id);
            if(curTag){
                curTag.tagName = tagName;
                curTag.inThread = inThread;
                await curTag.save();
                return res.status(200).json({code: 1, msg: "Updated tag"});
            } 
            return res.status(404).json({code: 0, msg: "Can't find tag"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.params.id;
            const curCategory = await Category.findById(id);
            if(curCategory){
                curCategory.isDeleted = true;
                await Category.save();
                return res.status(200).json({code: 1, msg: "Deleted tag"});
            } 
            return res.status(404).json({code: 0, msg: "Can't find tag"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
}

module.exports = TagCtrl;