
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App';
import Step3Report from '../components/Step3Report';

function InterviewReport() {
  const { id } = useParams()
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/report/" + id,
          { withCredentials: true }
        )

        console.log(result.data)
        setReport(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchReport()
  }, [id])

  if (!report) {
    return (
      <div className="min-h-screen bg-[#FFF8F5] flex items-center justify-center px-4">
        <div className="bg-white border border-[#FFE3D5] rounded-2xl shadow-sm px-10 py-8 flex flex-col items-center gap-4">

          <div className="w-12 h-12 border-4 border-[#FFE3D5] border-t-[#7F1D2D] rounded-full animate-spin"></div>

          <p className="text-[#7F1D2D] text-lg font-semibold">
            Loading Report...
          </p>

          <p className="text-[#987A76] text-sm">
            Preparing your interview performance report
          </p>

        </div>
      </div>
    );
  }

  return <Step3Report report={report} />
}

export default InterviewReport
