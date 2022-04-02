const User2 = require("../models/User2");

/* 인증 처리 */
let auth = (req, res, next) => {
    //client 쿠키에서 token을 가져옴
    let token = req.cookies.y_auth;

    //가져온 token을 복호화(decode) 후 user을 찾는다.
    User2.findByToken( token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true}) //user가 없으니 auth false, error가 있다고 전해줌
        req.token = token;
        req.user = user; //token과 user을 req에 넣어줌으로 인해서 index.js > app.get('api/users/auth', auth , (req, res)=> { ... 안에서 > req.~~로 user정보,token을 가질 수 있고 사용할 수 있게 됨       
        next(); // index.js > app.get('api/users/auth', auth , (req, res)=> { ... 
		//의 middleware(auth)에서 계속 넘어갈 수 있도록(빠져나가게)함.
    })

    //user가 있으면 인증 O
    //user가 없으면 인증 X

}

module.exports= {auth}