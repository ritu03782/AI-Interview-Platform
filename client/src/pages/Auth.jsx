import React, { useState } from 'react';
import { BsRobot } from 'react-icons/bs';
import { IoSparklesSharp } from 'react-icons/io5';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'motion/react';
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { ServerUrl } from '../App';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { clearUserData, setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
  const dispatch = useDispatch();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const handleGoogleAuth = async () => {
    if (isSigningIn) return;

    setIsSigningIn(true);

    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        `${ServerUrl}/api/auth/google`,
        {
          name: user.displayName,
          email: user.email,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data.user));
    } catch (error) {
      console.error("Google authentication failed:", {
        code: error.code,
        message: error.message,
        backendResponse: error.response?.data,
      });

      dispatch(clearUserData());
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div
      className={`relative flex w-full items-center justify-center ${
        isModel
          ? "min-h-0 overflow-visible bg-transparent p-0"
          : "min-h-screen overflow-hidden bg-[#FFF8F5] px-5 py-10"
      }`}
    >
      {/* Background accents - normal page only */}
      {!isModel && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: -40, y: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#FFE3D5]/70 blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 40, y: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
            className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#F4A6A0]/20 blur-3xl"
          />
        </>
      )}

      {/* Main card - normal page only */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={!isModel ? { y: -3 } : undefined}
        transition={{ duration: 0.3 }}
        className={`relative w-full ${
          isModel
            ? "max-w-none rounded-none border-0 bg-transparent p-0 shadow-none"
            : "max-w-sm rounded-3xl border border-[#F3E4DE] bg-white p-7 shadow-[0_20px_60px_rgba(127,29,45,0.08)] sm:p-9"
        }`}
      >
        {/* Brand */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7F1D2D] text-white shadow-md shadow-[#7F1D2D]/15"
          >
            <BsRobot size={23} />
          </motion.div>

          <h2 className="text-xl font-bold tracking-tight text-[#292124]">
            Aura<span className="text-[#C1123F]">Interviewer</span>
          </h2>
        </motion.div>

        {/* Heading and description */}
        <motion.div
          variants={containerVariants}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FFE3D5] px-3 py-1.5 text-xs font-semibold text-[#7F1D2D]"
          >
            <motion.span
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="flex"
            >
              <IoSparklesSharp size={14} />
            </motion.span>
            AI-POWERED INTERVIEWS
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold leading-tight tracking-tight text-[#292124]"
          >
            Your next opportunity
            <span className="mt-1 block text-[#C1123F]">
              starts here.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[#786A6D]"
          >
            Practice with AI, improve your answers, and walk into every
            interview with confidence.
          </motion.p>
        </motion.div>

        {/* Google authentication */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <motion.button
            onClick={handleGoogleAuth}
            type="button"
            disabled={isSigningIn}
            whileHover={{
              scale: 1.02,
              boxShadow: '0px 10px 25px rgba(127, 29, 45, 0.20)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#7F1D2D] px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#C1123F] focus:outline-none focus:ring-4 focus:ring-[#F4A6A0]/40 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FcGoogle size={18} />
            {isSigningIn ? "Connecting to Google..." : "Continue with Google"}

            <motion.span
              className="flex"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiArrowRight size={17} />
            </motion.span>
          </motion.button>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-center text-xs leading-5 text-[#9A898C]"
          >
            Your personal space to practice, learn, and grow.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Footer - normal page only */}
      {!isModel && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-4 text-center text-xs text-[#A39395]"
        >
          © {new Date().getFullYear()} AuraInterviewer
        </motion.p>
      )}
    </div>
  );
}

export default Auth;