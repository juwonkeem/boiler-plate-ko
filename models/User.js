const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//비밀번호 몇자린지
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this; // 이 user 은 userSchema 안에 요소들을 가르킨다.

  if (user.isModified("password")) {
    // 비밀번호를 암호화시킨다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      //err 가 났을 때 return 시킨다. next 하면은 바로 index.js 에 user.save() 로 들어가진다

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
    // 비밀번호 바꾸는게 아니라 다른거 바꿀 때는 바로 보내줘야 나갈 수 있다
    // 위 코드가 없으면 나가지못하고 여기서 머문다
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 1234567 암호화된 비밀번호 $2b$10$ce.LzyTZMVaOG0p6hEGMiOW.Unl0d8xDinFou5oC5GzSZ2KXhds1S
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
// 암호화된 비밀번호는 복호화가 불가능
// plainPassword 1234567를 암호화해서 암호화된 비밀번호랑 같은지 체크 해야함
userSchema.methods.generateToken = async function () {
  var user = this;

  // jsonwebtoken 이용해서 token을 생성하기 위해서
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  // user._id + 'secretToken' = token
  // ->
  // 'secretToken' -> user._id

  user.token = token;
//   user.save(function (err, user) {
//     if (err) return cb(err);
//     cb(null, user);
//   });

    await user.save();
    return token;

};

userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  // user._id + '' = token 
  // 토큰을 decode 한다.
  jwt.verify(token, 'secretToken', async function(err, decoded){
      //유저아이디를 이용해서 유저를 찾은 다음에 
      //클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지 확인

      try {
            const foundUser = await user.findOne({"_id" : decoded, "token": token});

            if(err) return cb(err);
            cb(null, foundUser)
     
          } catch {
            cb(error)
      }
   })
}

const User = mongoose.model("User", userSchema);

module.exports = { User };
