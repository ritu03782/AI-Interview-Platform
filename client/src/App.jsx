import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import InterviewPage from './pages/InterviewPage.jsx';
import InterviewHistory from './pages/InterviewHistory.jsx';
import Pricing from './pages/Pricing.jsx';
import InterviewReport from './pages/InterviewReport.jsx';
import useAuth from "./hooks/useAuth";
export const ServerUrl = import.meta.env.VITE_SERVER_URL;;
function App() {
  useAuth();
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/interview' element={<InterviewPage/>}/>
      <Route path='/history' element={<InterviewHistory/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/report/:id' element={<InterviewReport/>}/>

    </Routes>
  )
}

export default App