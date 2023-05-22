const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log("MongoDb Connected...."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! Hi Linda");
});

app.post("/api/users/register", async (req, res) => {
  const user = new User(req.body);
  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });
});

app.post("/api/users/login", async (req, res) => {
  try {
      // 1. 요청된 이메일을 데이터베이스에서 찾는다.
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다.",
        });
      }

      // 2. 요청한 이메일이 DB에 있는지 확인하고 비밀번호가 맞는지 확인해야 한다.
      user.comparePassword(req.body.password, async (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        }

      // 3. 비밀번호까지 맞다면 토큰 생성하기
      const token = await user.generateToken();
      res
        .cookie("x_auth", token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id });
    });   
  } catch (err) {
        console.log(err);
        res.status(500).json({ loginSuccess: false, message: "서버 오류" });
    }
});


app.get('/api/users/auth', auth , (req, res) => {

  //여기까지 미틀웨어를 통과해와다는 얘기는 Authentication 이 True 라는 말
  res.status(200).json({
    _id: req.user._id,
    idAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })

})

app.get('/api/users/logout', auth, async (req,res) => {

  try{
    const user = await User.findOneAndUpdate(
      { _id: req.user._id}, 
      {token : ""}
    ).exec();

    if(!user) {
      return res.json({success:false, error:"User not found"});
    }

    return res.status(200).send({
      success: true
    });
  } catch (error) {
    return res.json({success:false, error});
  }
});


app.listen(port, () => console.log(`Example app listening on port ${port}`));
