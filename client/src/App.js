//Routing 관련 일 처리
import React from 'react'
import{
  BrowserRouter as Router,
  Routes, ////react-router-dom 버전6 업그레이드 .. Switch > Routes
  Route,
  Link
} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"

function App() {
  return (
    <Router>

      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />}> </Route>
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/register" element={<RegisterPage/>} />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
