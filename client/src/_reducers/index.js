import { combineReducers } from "redux";
import user from './user_reducer';

//combine reducer을 이용하여 rootReducer에서 store 안의 reducer들을 하나로 합쳐주는 것!
const rootReducer = combineReducers({
    user
})
export default rootReducer;