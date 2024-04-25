import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/indexPage'
import LoginPage from './pages/loginPage'
import Layout from './components/layout'
import RegisterPage from './pages/registerPage'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />} > 
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
