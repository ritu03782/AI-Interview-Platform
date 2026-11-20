import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from 'motion/react';
import Auth from '../pages/Auth';

function AuthModel({ onClose }) {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      onClose();
    }
  }, [userData, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#292124]/50 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative my-auto w-full max-w-md rounded-3xl border border-[#F3E4DE] bg-[#FFF8F5] p-6 shadow-2xl shadow-[#7F1D2D]/20 sm:p-8"
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE3D5] text-[#7F1D2D] transition-all duration-200 hover:scale-105 hover:bg-[#F4A6A0]"
            aria-label="Close login modal"
          >
            <FaTimes size={16} />
          </button>

          <Auth isModel={true} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AuthModel;