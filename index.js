const express = require('express')
const app = express()
const port = 7100
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); //express에서 제공되는 cookieParser(설치필요)
const {User2} = require("./models/User2");
/* token 확인을 위한 미들웨어 auth import */
const {auth} = require("./middleware/auth")

/* mongoDB 연결 => config 폴더에서 mongoDB관리, index.js로부터 숨겨서 비밀 정보 보호하기 */
const config = require('./config/key')
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then( () => console.log('MongoDB connected ...') ) //터미널에 뜨면 성공!
  .catch( err => console.log(err) ) // 에러코드 뜨면 연결 오류

/*body-parser: node.js모듈 . 클라이언트 POST request data의 body로부터 파라미터를 편리하게 추출하기 위함 */
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json())
/* cookie-parser : express 모듈. 로그인 시 생성된 token을 cookie에 저장하기 위함 */
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send('시작 페이지')
})


/*
  회원가입
  : 회원가입 할 때 필요한 정보들을 client에서 가져오면, 그것들을 DB에 넣어줌
*/
app.post('/api/users/register', (req,res) => {
  //req.body 안에는 {name:“hello”, email:“~~”,password : “~”, ...} 등이 들어있는 것. =>bodyparser이 있어서 가능! 
  const user = new User2(req.body);

  //save: mongoDB의 메서드. 이 정보들이 User2모델에 저장됨
  user.save( (err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})


/* 
  로그인  
  : bycript 이용한 로그인기능 만들기( 입력한 email이 DB에 저장된 email이라면,  comparePassword 후 generateToken  + cookie에 token 저장)
*/
app.post('/api/users/login', (req, res)=>{
  //1)요청된 이메일을 DB(user2)에서 찾기
  User2.findOne({email:req.body.email}, (err,user)=>{
    if(!user){ //user가 없으면 
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //2)요청된 이메일이 DB에 있다면, 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch)=> { //로그인을 위해 입력한 password와 DB에 저장된 password가 일치하는지 확인.
      if(!isMatch) return res.json({loginSuccess:false, message:"비밀번호가 일치하지 않습니다."})
      //3)비밀번호가 맞다면 Token을 생성
      user.generateToken((err, user)=>{
        if (err) return res.status(400).send(err); //status(400) = 에러
        //비밀번호가 일치하므로token생성하기
        //어디에? 쿠키, 로컬 스토리지 , 세션 .. 여기서는 "쿠키"에 저장하자!=> express에서 제공하는 cookie-parser 설치 필요.
        res.cookie("y_auth", user.token)
        .status(200) //성공
        .json({ loginSuccess : true , userId : user._id })
      })
    })
  })
})


/*
  권한(auth) 확인
  : auth라는 미들웨어는 /를 통해 request를 만든 다음, callback function을 하기 전에, 중간에서 일함.
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentification = true라는 말.
*/
app.get('/api/users/auth', auth , (req,res) => {

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})