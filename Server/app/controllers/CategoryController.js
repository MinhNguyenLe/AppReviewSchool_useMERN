const Category = require("../models/Category")
const axios = require("axios")
const User = require("../models/User")
const Thread = require("../models/Thread")
const CategoryCtrl = {
    getAll: async (req, res) => {
        try {
            let categories = await Category.find({});
            return res.json(categories);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await Category.findById(id);
            if (category){
                return res.status(200).json(category);
            }
            return res.status(404).json({msg: "Can't find category"})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    create: async (req, res) => {
        try {
            const {
                category
            } = req.body;

            const newCategory = new Category({
                category: category,
                color: "#" + Math.floor(Math.random()*16777215).toString(16)
            });
            await newCategory.save();
            return res.status(200).json({code: 1, msg: "Create category successful.", id: newCategory.id});
            
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    update: async (req, res) => {
        try {
            let id = req.params.id;
            const {category} = req.body;
            const curCategory = await Category.findById(id);
            if(curCategory){
                curCategory.category = category;
                await post.save();
                return res.status(200).json({code: 1, msg: "Updated category"});
            } 
            return res.status(404).json({code: 0, msg: "Can't find category"});
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
                return res.status(200).json({code: 1, msg: "Deleted category"});
            } 
            return res.status(404).json({code: 0, msg: "Can't find category"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
}

module.exports = CategoryCtrl;