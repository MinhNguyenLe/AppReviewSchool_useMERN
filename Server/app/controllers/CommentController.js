const Comment = require("../models/Comment");
const axios = require("axios");
const rCaptcha = require("../utils/recaptcha");

const commentCtrl = {
  getAll: async (req, res) => {
    try {
      let comments = await Comment.find({});

      return res.json(comments);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      let id = req.params;
      const comment = await Comment.findById(id);

      if (comment === null || comment.length === 0 || comment === undefined) {
        return res.status(404).json({ msg: "Can't find comment" });
      }
      return res.json(comment);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  create: async (req, res) => {
    // if(!req.body.token){
    //     return res.status(400).json({msg: "Token is missing!"});
    // }
    try {
      // let captchaValue = await rCaptcha.recaptcha(req.body.token);
      // if(captchaValue === false){
      //     return res.status(400).json({msg: "Invalid token"});
      // }
      const {
        idReview,
        // idUser,
        name,
        content,
      } = req.body;

      const newComment = new Comment({
        idReview: idReview,
        // idUser: idUser,
        name: name,
        content: content,
      });
      await newComment.save();

      res.status(201).json({ comment: newComment });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params;
      const { idReview, idUser, name, content } = req.body;
      const comment = await Comment.findById(id);

      if (comment === null || comment.length === 0 || comment === undefined) {
        return res.status(404).json({ msg: "Can't find comment" });
      }
      comment.name = name;
      comment.content = content;
      await comment.save();
      return res.status(200).json({ msg: "Updated comment" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  detele: async (req, res) => {
    try {
      let id = req.params;
      const comment = await Comment.findById(id);
      if (comment === null || comment.length === 0 || comment === undefined) {
        return res.status(404).json({ msg: "Can't find comment" });
      }
      await Comment.deleteOne(id);
      return res.json({ msg: "Deleted comment" });
    } catch (err) {
      res.status(500).status(200).json({ msg: err.message });
    }
  },
  getCommentsByIdUser: async (req, res) => {
    try {
      let id = res.params;
      const comments = await Comment.find({ idUser: id });
      if (
        comments === null ||
        comments.length === 0 ||
        comments === undefined
      ) {
        return res.status(404).json({ mes: "Can't find comment." });
      }
      return res.json(comments);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = commentCtrl;
