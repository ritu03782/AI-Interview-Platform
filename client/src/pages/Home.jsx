import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import AuthModel from '../components/AuthModel';
import { HiSparkles } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { featureCards } from "../data/featureCards.js";
import { homeCards } from "../data/homeCards.js";
import { interviewModeCards } from "../data/interviewModeCards.js";
import Footer from "../components/Footer"
function Home() {
  const {userData} = useSelector((state)=>state.user)
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()
  return (
    <div className = 'min-h-screen bg-[#f3f3f3] flex flex-col'>
      <Navbar/>
      <div className = 'flex-1 px-6 py-20'>
        <div className='max-w-6xl mx-auto'>
        <div className='flex justify-center mb-6'>
          <div className='bg-gray-100 text-gray-600 text-sm px-4 py2 rounded-full flex items-center gap-2'>
            <HiSparkles size={16} className='bg-[#FFF8F5] text-[#C1123F] '/>
            AI Powered Smart Interview Platform
          </div>
        </div>
        <div className='text-center mb-28'>
            <motion.h1 
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.6}}
            className='text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto'>
             Practice Interviews with
             <span className='relative inline-block'>
              <span className='bg-[#FFF8F5] text-[#C1123F] px-5 py-1 rounded-full '>
               AI Intelligence
              </span>
             </span>
            </motion.h1>
            <motion.p 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.8}}
            className='text-gray-500 mt-6 max-w-2xl mx-auto text-lg'>
             Role-based mock interviews with smart follow-ups,
              adaptive difficulty and real-time performance evaluation
            </motion.p>
            <div className='flex flex-wrap justify-center gap-4 mt-10'>
              <motion.button
              onClick={()=>{
                if(!userData){
                  setShowAuth(true)
                  return;
                }
                navigate("/interview")
              }}
              whileHover={{opacity:0.9 , scale:1.03}}
              whileTap={{opacity:1 , scale:0.98}}
              className="group flex items-center justify-center gap-2 rounded-full bg-[#7F1D2D] px-10 py-3  font-semibold text-white transition-colors duration-200 hover:bg-[#C1123F] focus:outline-none focus:ring-4 focus:ring-[#F4A6A0]/40 disabled:cursor-not-allowed disabled:opacity-70">
              Start Interview
              </motion.button>
              <motion.button
              onClick={()=>{
                if(!userData){
                  setShowAuth(true)
                  return;
                }
                navigate("/history")
              }}
              whileHover={{opacity:0.9 , scale:1.03}}
              whileTap={{opacity:1 , scale:0.98}}
              className="group flex items-center justify-center gap-2 rounded-full bg-[#FFE3D5] px-10 py-3  font-semibold text-black transition-colors duration-200 hover:bg-[#F4A6A0] focus:outline-none focus:ring-4 focus:ring-[#F4A6A0]/40 disabled:cursor-not-allowed disabled:opacity-70">
              View History
              </motion.button>
            </div>

          </div>
           <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-28">
            {featureCards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ rotate: 0, y: -10, scale: 1.03 }}
                className={`
                  group relative flex min-h-[270px] w-80 max-w-[90%]
                  flex-col justify-center rounded-3xl
                  border border-[#F3E4DE] bg-white
                  px-7 pb-8 pt-14
                  shadow-[0_8px_30px_rgba(127,29,45,0.06)]
                  transition-all duration-300
                  hover:border-[#E8B7B0]
                  hover:shadow-[0_20px_45px_rgba(127,29,45,0.13)]
                  ${index === 0 ? "rotate-[-3deg]" : ""}
                  ${index === 1 ? "rotate-[2deg] md:-mt-7" : ""}
                  ${index === 2 ? "rotate-[-2deg]" : ""}
                `}
              >
                {/* Floating Icon */}
                <div
                  className="
                    absolute -top-8 left-1/2 z-10
                    flex h-16 w-16 -translate-x-1/2
                    items-center justify-center
                    rounded-2xl border border-[#F3E4DE]
                    bg-[#FFF0EB] text-[#C1123F]
                    shadow-[0_8px_20px_rgba(127,29,45,0.10)]
                    transition-all duration-300
                    group-hover:bg-[#7F1D2D]
                    group-hover:text-white
                  "
                >
                  {<item.icon size={24}/>}
                </div>

                {/* Card Content */}
                <div className="text-center">
                  <span className="
                    inline-block rounded-full
                    bg-[#FFE3D5] px-4 py-2
                    text-[12px] font-bold tracking-[0.18em]
                    text-[#7F1D2D]
                  ">
                    {item.step}
                  </span>

                  <h3 className="
                    mt-4 text-xl font-bold
                    leading-snug tracking-tight
                    text-[#292124]
                    transition-colors duration-300
                    group-hover:text-[#C1123F]
                  ">
                    {item.title}
                  </h3>

                  <p className="
                    mt-3 text-md leading-6
                    text-[#786A6D]
                  ">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="
                  absolute bottom-0 left-1/2
                  h-1 w-12 -translate-x-1/2
                  rounded-full bg-[#F4A6A0]
                  transition-all duration-300
                  group-hover:w-24 group-hover:bg-[#C1123F]
                " />
              </motion.div>
            ))}
        </div>
          <div className='mb-32'>
            <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6  }}
            className = 'text-4xl font-semibold text-center mb-16'>
            Advanced AI{" "}
            <span className="text-[#ae042f]">Capabilities</span>
            </motion.h2>
            <div className='grid md:grid-cols-2 gap-10'>
              {homeCards.map((item,index)=>(
                <motion.div key = {index} 
                initial ={{opacity:0,y:30}}
                whileInView={{opacity:1,y:0}}
                transition={{duration:0.5,delay:index*0.1}}
                whileHover={{scale:1.02}}
                className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm 
                hover:shadow-xl transition-all'>
                 <div className='flex flex-col md:flex-row items-center gap-8'>
                  <div className='w-full md:w-1/2 flex justify-center'>
                  <img src = {item.image} alt={item.title}
                  className='w-full h-auto object-contain max-h-64'/>
                  </div>
                  <div className='w-full md:w-1/2'>
                  <div className='bg-[#FFF0EB] text-[#ae042f]
                   w-12 h-12 rounded-xl flex items-center justify-center mb-6'>
                    {<item.icon size={20}/>}</div>
                  <h3 className='font-semibold mb-3 text-xl'>{item.title}</h3>
                  <p className='text-gray-500 text-sm leading-relaxed'>{item.desc}</p>
                  </div>
                 </div>
                </motion.div>
              ))
                
              }
            </div>

          </div>
          <div className='mb-32'>
            <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6  }}
            className = 'text-4xl font-semibold text-center mb-16'>
            Multiple Interview{" "}
            <span className="text-[#ae042f]">Modes</span>
            </motion.h2>
            <div className='grid md:grid-cols-2 gap-10'>
              {interviewModeCards.map((mode,index)=>(
                <motion.div key = {index} 
                initial ={{opacity:0,y:30}}
                whileInView={{opacity:1,y:0}}
                transition={{duration:0.5,delay:index*0.1}}
                whileHover={{y:-6}}
                className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm 
                hover:shadow-xl transition-all'>
                 
                 <div className='flex items-center justify-between gap-6'>
                  <div className='w-1/2'>
                  <h3 className='font-semibold text-xl mb-3'>{mode.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{mode.desc}</p>
                  </div>
                  <div className="w-1/2 flex justify-end">
                  <img
                   src={mode.image}
                   alt={mode.title}
                   className="w-28 h-28 object-contain"
                  />

                  </div>
                 </div>
                </motion.div>
              ))
                
              }
            </div>

          </div>
      </div>
      </div>
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
        <Footer/>
    </div>
    
  )
}

export default Home