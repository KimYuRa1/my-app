const express = require('express')
const app = express()
const port = 7100
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ura3118:ura62283118@my-app-cluster0.ahjly.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then( () => console.log('MongoDB connectted ...') ) //터미널에 뜨면 성공!
 .catch( err => console.log(err) ) // 에러코드 뜨면 연결 오류

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})