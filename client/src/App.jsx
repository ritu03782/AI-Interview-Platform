import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearUserData, setUserData } from './redux/userSlice.js';
import InterviewPage from './pages/InterviewPage.jsx';
import InterviewHistory from './pages/InterviewHistory.jsx';
import Pricing from './pages/Pricing.jsx';
import InterviewReport from './pages/InterviewReport.jsx';

export const ServerUrl = import.meta.env.VITE_SERVER_URL;;
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
  const getUser = async () => {
    try {
      const result = await axios.get(
        `${ServerUrl}/api/user/current-user`,
        { withCredentials: true }
      );

      dispatch(setUserData(result.data.user));
    } catch (error) {
      console.log("User session check:", error.response?.data || error.message);

      // Don't clear Redux state here.
      // Initial userData should already be null.
    }
  };

  getUser();
}, [dispatch]);
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