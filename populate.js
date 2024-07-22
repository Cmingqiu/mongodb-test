const crypto = require('crypto');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schemas
// 作者
const UserSchema = new Schema({
  name: String,
  password: { type: String, required: true }
});

// 文章
const ArticleSchema = new mongoose.Schema({
  title: String,
  author: { type: Schema.ObjectId, ref: 'User' }
});

const conn = mongoose.connect(
  'mongodb://localhost:27017/test' /*  {
  useNewUrlParser: true,
  useUnifiedTopology: true
} */
);
conn.on('error', err => console.error('数据库连接失败', err));
conn.on('open', () => console.log('数据库连接成功'));

const User = mongoose.model('User', UserSchema);
const Article = mongoose.model('Article', ArticleSchema);

(async () => {
  const user = await User.create({ name: 'John', password: '1111' });
  await Article.create({ title: 'Hello', author: user.id });
})();

// utils 加密密码
function cryptoPwd(pwd) {
  return crypto.createHash('md5').update(pwd).digest('base64');
}
