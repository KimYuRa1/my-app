const mongoose = require('mongoose') //User2.js 파일과 mongoose 연결
const bcrypt = require('bcrypt');
const saltRounds = 10; //10자리인 salt를 생성하여 이 salt를 이용해서 비밀번호를 암호화
const user2Schema = mongoose.Schema({
    name: {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true  // 사이 스페이스를 없애주는 역할
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type: String,
        maxlength : 50
    },
    role : {
        type : Number,// 예를 들면 0이면 관리자, 1이면 일반 유저로 설정하기 위해~
        default : 0
    },
    image : String,
    token : { // 유효성 관리
        type : String
    },
    tokenExp : { //token이 사용할 수 있는 기간 설정
        type : Number
    }
})

//User2 모델에 유저 정보를 저장하기(index.js에서 user.save) 전에(user2Schema.pre)
//function을 수행하고 나서! index.js의 register route 안의 다른 것들을 수행하라.
user2Schema.pre('save', function(next) {
    var user= this;
    if(user.isModified('password')){ //password가 변경될 때에만 수행합니다.
        //비밀번호 암호화시키기
        bcrypt.genSalt(saltRounds, function(err, salt ) {
            if(err) next(err) //next()는 user.save하는 곳으로 넘어가는 메소드
            bcrypt.hash(user.password, salt, function(err,hash){ // plainPassword , salt, function(err, hash-암호화된 비밀번호)
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else { //다른 정보(비밀번호 제외)를 바꿀 때 실행
        next()
    }
})

//User2 모델을 만든 후, User2과 user2Schema를 묶어준다
const User2 = mongoose.model('User2', user2Schema);

module.exports = {User2}