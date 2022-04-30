//email, password, submit form 만들기
import React,{useState} from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import user_reducer from '../../../_reducers/user_reducer';
import {useNavigate} from 'react-router-dom'; //// react-router-dom v6업데이트로 history로 페이지이동 시 오류  =>useNavigate사용으로 해결 https://kyung-a.tistory.com/36
import Auth from "../../../hoc/auth"

function LoginPage() {
  const navigate = useNavigate();/* */
  const dispatch = useDispatch();
  
  const [Email, setEmail] = useState("") //useState(initialState:처음의 상태 설정)
  const [Password, setPassword] = useState("") //react hook의 기능 => 서버에 보내려 하는 값들을 state에서 갖고있음.
  
  const onEmailHandler = (event) => { //state 바꿔주기
    setEmail(event.currentTarget.value)  //value도 바뀌게 됨.
  } 
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault(); //누를 때마다 페이지 refresh되는 것을 방지. refresh가 되면 이 밑에서 수행해야할 것들을 할 수 없음.
    let body={
      email: Email,
      password : Password
    }
    dispatch(loginUser(body)) //dispatch를 사용해서 loginUser라는 action을 취함 (user_action.js)
    .then(response => {
      if(response.payload.loginSuccess){ //login 성공하면 main(root) 페이지로
        navigate('/'); //root페이지로 이동
      }else{
        alert('ERROR!')
      }
    })
  }

  //onChange : 입력을 가능하게 만들어주기. 타이핑을 할 때 onchange이벤트를 발생시켜서 state를 바꿔줌.
  // 이 state가 바뀌면 value가 바뀌게 되고 , 이렇게 되어야 입력form에 입력이 가능해지는 것.
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center',
    width:'100%',height:'100vh' }}>
      <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler}/> 
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <br/>
        <button type="submit">login</button>
      </form> 
    </div>
  )
}

export default Auth(LoginPage,false); //로그인한 유저는 들어올 수 없는 페이지