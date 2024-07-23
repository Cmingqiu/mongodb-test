const mongoose = require('mongoose');
const { UserSchema } = require('./schemas/author');
const { ArticleSchema } = require('./schemas/article');

// 1.连接数据库
mongoose
  .connect(
    'mongodb://localhost:27017/school' /*  {
  useNewUrlParser: true,
  useUnifiedTopology: true
} */
  )
  .then(async () => {
    console.log('数据库连接成功');

    // 2.关联schema与模型（相当于一个集合/表）
    const User = mongoose.model('User', UserSchema);
    // const Article = mongoose.model('Article', ArticleSchema);

    // const allUser = await User.find();
    const user = await User.insertMany(crateUsers(5));

    console.log('====> ', user);
    // Article.create({ title: '文章1', author: allUser[0]._id });

    // const user = await Article.find({ title: /文章/ }).populate('author');
  })
  .catch(err => {
    console.error('数据库连接出错', err);
    process.exit(1); // 终止程序
  });

function crateUsers(num) {
  const users = [];
  let i = 0;
  while (num--) {
    i++;
    users.push({ name: 'user_' + i, age: i, password: '' + i });
  }
  return users;
}
