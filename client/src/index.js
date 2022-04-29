import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
//redux import
import {Provider} from 'react-redux';
import {applyMiddleware ,createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

//미들웨어를 생성하는데, 원래 reducer은 객체 형식만 받으므로
// function이나 promise 형태를 받을 수 있도록 하기 위해
//promiseMiddleware,ReduxThunk를 적용할 수 있도록
// createStoreWithMiddlewarestore을 만들어주기
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  //Provider : redux와 나의 app을 연결시켜줌
  <Provider
    store = {createStoreWithMiddleware(Reducer, 
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}> 
    <App />
  </Provider> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
