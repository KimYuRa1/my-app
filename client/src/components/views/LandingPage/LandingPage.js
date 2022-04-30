import React,{useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(()=>{
      axios.get('/api/hello')
      .then(response=> console.log(response.data))
  },[]) //[] ; LandingPage 컴포넌트가 가장 처음 렌더링될 때 한번만 실행

  const onClickHandler = (props) =>{
    axios.get('/api/users/logout')
    .then(response =>{
      if(response.data.success){
        navigate('/login') //로그아웃 성공하면 로그인 페이지로 이동
      }else{
        alert('로그아웃 하는 데 실패했습니다.')
      }
    })
  }

  return (
    <div style={{
        display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'
    }}>
      LandingPage
      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default LandingPage
