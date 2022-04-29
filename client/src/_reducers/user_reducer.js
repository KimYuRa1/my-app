import {
    LOGIN_USER
} from '../_actions/types';//_actions>types.js 파일에서 LOGIN_USER라는 action.type을 가져와 쓸 것임

export default function(state={}, action){ // (이전state, action) => state는 빈 상태
    switch(action.type){ //다른 type이 올 때마다 다르게 처리해줘야 하기 때문에 switch문법 사용
        case LOGIN_USER:
            return {...state, loginSuccess : action.payload} //...(spread operator):state를 똑같이 가져오는 역할.  loginSuccess: action.payload =>  user_actions.js에서 받은 payload를 loginSuccess에다가 넣어줌
            //user_action에서 return한 payload를 loginSuccess로 넣어준 것!
            break;
        default:
            return state;               
    }
}
