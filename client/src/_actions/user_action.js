import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
}from './types' //_actions > types.js 파일에서 LOGIN_USER라는 action type을 가져와 쓸 것임.

export function loginUser(dataToSubmit){ //loginPage.js에서 준 body의 정보 ( dispatch(loginUser(body)) )를 dataToSubmit파라미터를 통해 받아옴
    //원래는 loginPage.js의 onSubmitHandler에서 하던 request를 여기서 하도록 가져옴.
    //server > index.js의 /api/users/login 으로 이동(request를 날림)
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data) //server에서 받아온 data를 request에다가 저장함
        return{ //reducer로 보내야함! reducer에서 이전state + 현재action을 조합해서 다음 state를 만들어줘야 하기 때문
            type: "LOGIN_USER",
            payload : request
        }
}

export function registerUser(dataToSubmit){
    const request = axios.post('api/users/register', dataToSubmit) //server>index.js의 /api/users/register로 이동.
    .then(response => response.data) // server에서 받은 data를 request에 저장함

    return{ //reducer로 보냄 (이전state + 현재action 조합 => 다음 state)
        type : "REGISTER_USER",
        payload : request
    }
}

export function auth(dataToSubmit){
    const request = axios.get('/api/users/auth') //server>index.js의 /api/users/auth로 이동, get메소드니까 body부분(dataToSubmit)은 필요 없음.
    .then(response=>response.data) //server에서 받은 data를 request에다가 저장함.
    
    return{
        type:"AUTH_USER",
        payload: request
    }
}