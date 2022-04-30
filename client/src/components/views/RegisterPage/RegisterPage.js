/*회원가입 페이지 : email. name. password. password check => 회원가입 완료 */

import React,{useState} from 'react'
//import axios from 'axios' //redux사용으로 request를 보내기 때문에 axios 필요X.
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import user_reducer from '../../../_reducers/user_reducer';
import {useNavigate} from 'react-router-dom';
import Auth from "../../../hoc/auth"

function RegisterPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email,setEmail] = useState("")
  const [Name,setName] = useState("") // 서버에 보내려하는 값들을 state에서 갖고있음
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) =>{
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) =>{
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) =>{
    event.preventDefault(); //누를때마다 페이지 refresh 방지
    
    //비밀번호 확인
    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    let body = {
      email : Email,
      password : Password,
      name : Name
    }
    dispatch(registerUser(body)) //registerUser은 user_action의 함수.
    .then(response =>{
      if(response.payload.success){
        navigate('/login'); //회원가입 성공하면 login페이지로 이동
      }else{
        alert('회원가입에 실패했습니다.')
      }
    })
  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center',
    width:'100%',height:'100vh' }}>
      <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}/>

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        <br/>
        <button type="submit">회원 가입</button>
      </form>
    </div>
  )
}

export default Auth(RegisterPage,false); //로그인 한 유저는 출입 불가능