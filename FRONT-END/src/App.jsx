import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import CheckIn from './Auth/CheckIn';
import FirstPage from './Components/FirstPage';
import Login from './Auth/Login';
import ResetPassword from './Auth/ResetPassword';
import Dashboard from './page/Dashboard';
import axios from 'axios';

function App() {

  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<FirstPage />} />
          <Route path="/register" element={<CheckIn />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Reset-password" element={<ResetPassword />}/>
          <Route path="/Dashboard" element={<Dashboard />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
