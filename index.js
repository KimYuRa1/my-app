const express = require('express')
const app = express()
const port = 7100
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ura3118:ura62283118@my-app-cluster0.ahjly.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then( () => console.log('MongoDB connectted ...') ) //터미널에 뜨면 성공!
 .catch( err => console.log(err) ) // 에러코드 뜨면 연결 오류
const {User2} = require("./models/User2");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.post('/register', (req,res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 DB에 넣어줌

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})