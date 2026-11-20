
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft, FaHistory, FaArrowRight } from 'react-icons/fa'
import { motion } from "motion/react"

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(
                    ServerUrl + "/api/interview/get-interview",
                    { withCredentials: true }
                )

                setInterviews(result.data)

            } catch (error) {
                console.log(error)
            }
        }

        getMyInterviews()

    }, [])

    return (
        <div className='min-h-screen bg-[#FFF8F5] py-10 px-4'>

            <div className='w-full lg:w-[70vw] max-w-5xl mx-auto'>

                {/* HEADER */}

                <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>

                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-full bg-white border border-[#FFE3D5] shadow-sm hover:bg-[#FFE3D5] hover:shadow-md transition-all duration-300'
                    >
                        <FaArrowLeft className='text-[#7F1D2D]' />
                    </button>

                    <div>
                        <h1 className='text-3xl font-bold text-[#7F1D2D]'>
                            Interview History
                        </h1>

                        <p className='text-gray-500 mt-2'>
                            Track your past interviews and performance reports
                        </p>
                    </div>

                </div>

                {/* EMPTY STATE */}

                {interviews.length === 0 ? (

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='bg-white border border-[#FFE3D5] p-10 rounded-3xl shadow-sm text-center'
                    >

                        <div className='w-16 h-16 mx-auto rounded-full bg-[#FFE3D5] flex items-center justify-center mb-5'>
                            <FaHistory className='text-[#7F1D2D] text-2xl' />
                        </div>

                        <h2 className='text-xl font-bold text-[#7F1D2D] mb-2'>
                            No Interviews Yet
                        </h2>

                        <p className='text-gray-500 mb-6'>
                            Your interview history will appear here once you complete your first interview.
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className='bg-[#7F1D2D] hover:bg-[#641624] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 inline-flex items-center gap-2'
                        >
                            Start Your First Interview
                            <FaArrowRight size={14} />
                        </button>

                    </motion.div>

                ) : (

                    /* INTERVIEW LIST */

                    <div className='grid gap-6'>

                        {interviews.map((item, index) => (

                            <motion.div
                                key={item._id || index}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#FFE3D5] hover:border-[#F4A6A0] group'
                            >

                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                                    {/* INTERVIEW DETAILS */}

                                    <div>

                                        <h3 className="text-lg font-semibold text-[#7F1D2D] group-hover:text-[#ae042f] transition-colors">
                                            {item.role}
                                        </h3>

                                        <p className="text-gray-500 text-sm mt-2">
                                            {item.experience} • {item.mode}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-3">
                                            {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            })}
                                        </p>

                                    </div>

                                    {/* SCORE AND STATUS */}

                                    <div className='flex items-center justify-between md:justify-end gap-6'>

                                        {/* SCORE */}

                                        <div className="text-right">

                                            <p className="text-2xl font-bold text-[#7F1D2D]">
                                                {item.finalScore ?? 0}/10
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Overall Score
                                            </p>

                                        </div>

                                        {/* STATUS BADGE */}

                                        <span
                                            className={`px-4 py-2 rounded-full text-xs font-semibold ${
                                                item.status === "completed"
                                                    ? "bg-[#FFE3D5] text-[#7F1D2D]"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {item.status}
                                        </span>

                                        <FaArrowRight className='text-[#F4A6A0] group-hover:text-[#7F1D2D] group-hover:translate-x-1 transition-all duration-300' />

                                    </div>

                                </div>

                            </motion.div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    )
}

export default InterviewHistory
