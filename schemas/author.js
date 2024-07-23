const crypto = require('crypto');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 作者
const UserSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  password: { type: String, required: true }
});

/**
 * 密码加密
 * @example User.insertMany([],{...options})
 */
UserSchema.pre('insertMany', function (next, options) {
  console.log('this.password： ', this.get('password'));
  this.set('password', cryptoPwd(this.get('password')));
  next();
});

// utils 加密密码
function cryptoPwd(pwd) {
  return crypto.createHash('md5').update(pwd).digest('base64');
}

module.exports = { UserSchema };
