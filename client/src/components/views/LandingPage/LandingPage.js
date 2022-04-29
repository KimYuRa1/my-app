import React,{useEffect} from 'react'
import axios from 'axios';

function LandingPage() {
    useEffect(()=>{
        axios.get('/api/hello')
        .then(response=> console.log(response.data))
    },[]) //[] ; LandingPage 컴포넌트가 가장 처음 렌더링될 때 한번만 실행
  return (
    <div style={{
        display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'
        }}>
      LandingPage
    </div>
  )
}

export default LandingPage
