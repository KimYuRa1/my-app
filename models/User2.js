/* User2.js 파일과 mongoose 연결*/
const mongoose = require('mongoose')
/* bcrypt : 비밀번호를 암호화하여 데이터베이스에 저장 */
const bcrypt = require('bcrypt');
const saltRounds = 10; //10자리인 salt를 생성하고, 이 salt를 이용해서 비밀번호를 암호화할 것.

const jwt = require('jsonwebtoken') //jsonwebtoken : 로그인 시 Token생성을위한 라이브러리

// 유저 스키마 생성 (회원정보 담기)
const user2Schema = mongoose.Schema({ //이름.이메일.비밀번호. role:상인회원(0)일반회원(1), 이미지, 토큰(로그인/로그아웃), 토큰유지시간
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
    role : {
        type : Number,// 예를 들면 0이면 상인 유저, 1이면 일반 유저로 설정하기 위해~
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

/*
    bcrypt로 mongoDB에 저장될 비밀번호 암호화 하기!
     : User2 모델에 유저 정보를 save하기(index.js에서 user.save) 전에(user2Schema.pre),
        function을 수행하고 나서
        index.js의 register route 안의 다른 것들을 수행하라.
*/
user2Schema.pre('save', function(next) {
    var user  = this;
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

/* 로그인을 할 때, 입력한 password와 DB에 저장된 password가 일치하는지 확인. */
user2Schema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword:1234567 , this.password(암호화된 패스워드)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(!isMatch) return cb(err)
        cb(null,isMatch) // err없고 isMatch=true
    })
}

/*로그인을 할 때, 입력된 password와 저장된password가 같으면 , 로그인 정보 저장을 위한 token 생성 */
user2Schema.methods.generateToken = function(cb) {
    var user=this;
    //json web token을 이용해서 토큰을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //user._id + 'secretToken' = token 만듦
    //나중에 token 생성할 때 'secretToken'를 넣으면 user._id가 나옴.
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}



//User2 모델을 만든 후, User2과 user2Schema를 묶어준다
const User2 = mongoose.model('User2', user2Schema);

//다른 파일에서도 User2 모델을 사용하기 위함
module.exports = {User2}