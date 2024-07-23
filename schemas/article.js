const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 文章
const ArticleSchema = new mongoose.Schema({
  title: String,
  author: { type: Schema.ObjectId, ref: 'User' } //指明此外键是哪个集合中的外键
});

module.exports = { ArticleSchema };
