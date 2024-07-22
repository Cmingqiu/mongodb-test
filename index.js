const mongoose = require('mongoose');
(async () => {
  // 这里写127.0.0.1，不能是localhost
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('连接成功');

  const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, //该字段必填
      unique: true, //唯一不重复
      lowercase: true, //全部小写
      trim: true //去除前后空格
    },
    pwd: {
      type: String,
      validate(v) {
        return v.length > 0;
      }
    },
    age: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    gender: {
      type: Number,
      enum: [1, 2]
    },
    data: [{ lesson: String }], //数组表示
    array: [Number]
  });

  // 创建文档
  const User = mongoose.model('User', UserSchema, 'user');
  /* const arr = [];
  for (let i = 1; i <= 4; i++) {
    arr.push({
      name: 'zhangsan' + i,
      pwd: '123_' + i,
      age: 10 + i,
      gender: Math.random() > 0.5 ? 1 : 2
    });
  }
  console.log(await User.insertMany(arr)); */

  const users = await User.find({ age: 10 });
  console.log(users[0].data);

  // User.create() 增
  // User.insertMany()
  // User.deleteOne() 删除
  // User.deleteMany() 删除
  // User.updateOne()
  // User.updateMany() 修改
  // const users = await User.updateMany(
  //   { age: 10 },
  //   { $set: { data: [{ lesson: 'lesson_1' }] } }
  // );

  // 断开连接
  mongoose.disconnect();
  mongoose.connection.on('disconnected', () => console.log('连接断开'));
})();
