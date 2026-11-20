import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BsRobot, BsCoin } from 'react-icons/bs';
import { FaUserAstronaut } from 'react-icons/fa';
import { HiOutlineLogout,HiOutlineLogin } from 'react-icons/hi';
import { FiClock, FiPlus, FiChevronDown } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../redux/userSlice';
import axios from 'axios';
import AuthModel from './AuthModel';

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false); 
  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const closePopups = () => {
    setShowCreditPopup(false);
    setShowUserPopup(false);
  };

  const handleLogout = async () => {
  try {
    await axios.get(`${ServerUrl}/api/auth/logout`, {
      withCredentials: true,
    });

  } catch (error) {
    console.error(
      "Logout failed:",
      error.response?.data || error.message
    );

  } finally {
    // Clear Redux state even if the API request fails
    dispatch(clearUserData());
    closePopups();
    navigate("/", { replace: true });
  }
  };

  return (
    <div className=" px-4 py-4 sm:px-6 md:px-8">

      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-[#F3E4DE] bg-white px-4 py-3 shadow-[0_4px_20px_rgba(127,29,45,0.06)] sm:px-6"
      >

        {/* Brand */}
        <div
          onClick={() => navigate('/')}
          className="flex cursor-pointer items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F1D2D] text-white shadow-sm">
            <BsRobot size={21} />
          </div>

          <h1 className="hidden text-lg font-bold tracking-tight text-[#292124] sm:block">
            Aura<span className="text-[#C1123F]">Interviewer</span>
          </h1>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Credits */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                if(!userData){
                   setShowAuth(true)
                   return;
                }
                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false);
              }}
              className="flex items-center gap-2 rounded-full border border-[#F3E4DE] bg-[#FFF8F5] px-3 py-2 text-sm font-semibold text-[#7F1D2D] transition-all duration-200 hover:border-[#E8B7B0] hover:bg-[#FFE3D5]"
            >
              <BsCoin className="text-[#C1123F]" size={17} />
              <span>{userData?.credits ?? 0}</span>
              <span className="hidden text-xs font-medium text-[#786A6D] sm:inline">
                Credits
              </span>
              <FiChevronDown
                size={14}
                className={`transition-transform duration-200 ${showCreditPopup ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {showCreditPopup && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-[#F3E4DE] bg-white p-4 shadow-[0_12px_35px_rgba(127,29,45,0.12)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE3D5] text-[#C1123F]">
                      <BsCoin size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-[#9A898C]">Available credits</p>
                      <p className="text-xl font-bold text-[#292124]">
                        {userData?.credits ?? 0}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-[#786A6D]">
                    Need more credits to continue your interview practice?
                  </p>

                  <button
                    onClick={() => {
                      closePopups();
                      navigate('/pricing');
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7F1D2D] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C1123F]"
                  >
                    <FiPlus size={16} />
                    Buy more credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                if(!userData){
                   setShowAuth(true)
                   return;
                }
                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false);
              }}
              aria-label="Open user profile"
              aria-expanded={showUserPopup}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBCBC3] bg-[#FFE3D5] text-[#7F1D2D] transition-all duration-200 hover:bg-[#F4A6A0]/40"
            >
              {userData?.name ? (
                <span className="text-sm font-bold">
                  {userData.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <FaUserAstronaut size={18} />
              )}
            </button>

            <AnimatePresence>
              {showUserPopup && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-[#F3E4DE] bg-white shadow-[0_12px_35px_rgba(127,29,45,0.12)]"
                >

                  {/* User information */}
                  <div className="border-b border-[#F3E4DE] bg-[#FFF8F5] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7F1D2D] text-white">
                        <FaUserAstronaut size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#292124]">
                          {userData?.name || 'User'}
                        </p>
                        <p className="truncate text-xs text-[#9A898C]">
                          {userData?.email || 'Welcome back!'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu */}
                <div className="p-2">
                      <button
                        onClick={() => {
                          closePopups();
                          navigate('/history');
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#514448] transition-colors hover:bg-[#FFF0EB] hover:text-[#7F1D2D]"
                      >
                        <FiClock size={17} />
                        Interview History
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          closePopups();
                          handleLogout();
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#C1123F] transition-colors hover:bg-[#FFF0EB]"
                      >
                        <HiOutlineLogout size={19} />
                        Logout
                      </button>
                </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
    </div>
  );
}

export default Navbar;