
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen bg-[#FFF8F5] flex items-center justify-center">
        <p className="text-[#7F1D2D] text-lg font-medium">
          Loading Report...
        </p>
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  /* ---------------- DOWNLOAD PDF ---------------- */

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    // TITLE
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(127, 29, 45);

    doc.text(
      "AI Interview Performance Report",
      pageWidth / 2,
      currentY,
      { align: "center" }
    );

    currentY += 5;

    doc.setDrawColor(127, 29, 45);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 15;

    // FINAL SCORE
    doc.setFillColor(255, 227, 213);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(127, 29, 45);

    doc.text(
      `Final Score: ${finalScore}/10`,
      pageWidth / 2,
      currentY + 12,
      { align: "center" }
    );

    currentY += 30;

    // SKILLS
    doc.setFillColor(255, 248, 245);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

    currentY += 45;

    // PROFESSIONAL ADVICE
    let advice = "";

    if (finalScore >= 8) {
      advice =
        "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice =
        "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
      advice =
        "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(244, 166, 160);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(127, 29, 45);
    doc.text("Professional Advice", margin + 10, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);

    currentY += 50;

    // QUESTION TABLE
    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "top",
      },
      headStyles: {
        fillColor: [127, 29, 45],
        textColor: 255,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 55 },
        2: { cellWidth: 20, halign: "center" },
        3: { cellWidth: "auto" },
      },
      alternateRowStyles: {
        fillColor: [255, 248, 245],
      },
    });

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className='min-h-screen bg-[#FFF8F5] px-4 sm:px-6 lg:px-10 py-8'>

      {/* HEADER */}

      <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>

        <div className='md:mb-10 w-full flex items-start gap-4 flex-wrap'>

          <button
            onClick={() => navigate("/history")}
            className='mt-1 p-3 rounded-full bg-white border border-[#FFE3D5] shadow-sm hover:shadow-md hover:bg-[#FFE3D5] transition'
          >
            <FaArrowLeft className='text-[#7F1D2D]' />
          </button>

          <div>
            <h1 className='text-3xl font-bold text-[#7F1D2D]'>
              Interview Analytics Dashboard
            </h1>

            <p className='text-gray-500 mt-2'>
              AI-powered performance insights
            </p>
          </div>
        </div>

        <button
          onClick={downloadPDF}
          className='bg-[#7F1D2D] hover:bg-[#641624] text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap'
        >
          Download PDF
        </button>
      </div>

      {/* MAIN DASHBOARD */}

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>

        {/* LEFT SECTION */}

        <div className='space-y-6'>

          {/* OVERALL PERFORMANCE */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-[#FFE3D5] p-6 sm:p-8 text-center"
          >

            <h3 className="text-[#7F1D2D] font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
              Overall Performance
            </h3>

            <div className='relative w-20 h-20 sm:w-25 sm:h-25 mx-auto'>

              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#7F1D2D",
                  textColor: "#7F1D2D",
                  trailColor: "#FFE3D5",
                })}
              />

            </div>

            <p className="text-gray-400 mt-3 text-xs sm:text-sm">
              Out of 10
            </p>

            <div className="mt-4">

              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {performanceText}
              </p>

              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {shortTagline}
              </p>

            </div>
          </motion.div>

          {/* SKILL EVALUATION */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-[#FFE3D5] p-6 sm:p-8'
          >

            <h3 className="text-base sm:text-lg font-semibold text-[#7F1D2D] mb-6">
              Skill Evaluation
            </h3>

            <div className='space-y-5'>

              {skills.map((s, i) => (
                <div key={i}>

                  <div className='flex justify-between mb-2 text-sm sm:text-base'>

                    <span className='text-gray-700'>
                      {s.label}
                    </span>

                    <span className='font-semibold text-[#7F1D2D]'>
                      {s.value}
                    </span>

                  </div>

                  <div className='bg-[#FFE3D5] h-2 sm:h-3 rounded-full'>

                    <div
                      className='bg-[#7F1D2D] h-full rounded-full transition-all duration-700'
                      style={{
                        width: `${Math.min(100, Math.max(0, s.value * 10))}%`
                      }}
                    />

                  </div>
                </div>
              ))}

            </div>
          </motion.div>

        </div>

        {/* RIGHT SECTION */}

        <div className='lg:col-span-2 space-y-6'>

          {/* PERFORMANCE TREND */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-[#FFE3D5] p-5 sm:p-8'
          >

            <h3 className="text-base sm:text-lg font-semibold text-[#7F1D2D] mb-4 sm:mb-6">
              Performance Trend
            </h3>

            <div className='h-64 sm:h-72'>

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={questionScoreData}>

                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F4A6A0" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#FFE3D5" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#F3E4DE" />

                  <XAxis dataKey="name" stroke="#9CA3AF" />

                  <YAxis domain={[0, 10]} stroke="#9CA3AF" />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#7F1D2D"
                    fill="url(#scoreGradient)"
                    strokeWidth={3}
                  />

                </AreaChart>

              </ResponsiveContainer>
            </div>

          </motion.div>

          {/* QUESTION BREAKDOWN */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-[#FFE3D5] p-5 sm:p-8'
          >

            <h3 className="text-base sm:text-lg font-semibold text-[#7F1D2D] mb-6">
              Question Breakdown
            </h3>

            <div className='space-y-6'>

              {questionWiseScore.map((q, i) => (
                <div
                  key={i}
                  className='bg-[#FFF8F5] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#FFE3D5]'
                >

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>

                    <div>

                      <p className="text-xs text-[#F4A6A0] font-semibold">
                        Question {i + 1}
                      </p>

                      <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">
                        {q.question || "Question not available"}
                      </p>

                    </div>

                    <div className='bg-[#FFE3D5] text-[#7F1D2D] px-3 py-1 rounded-full font-bold text-xs sm:text-sm w-fit'>
                      {q.score ?? 0}/10
                    </div>

                  </div>

                  <div className='bg-white border border-[#F4A6A0]/40 p-4 rounded-lg'>

                    <p className='text-xs text-[#7F1D2D] font-semibold mb-1'>
                      AI Feedback
                    </p>

                    <p className='text-sm text-gray-700 leading-relaxed'>
                      {q.feedback && q.feedback.trim() !== ""
                        ? q.feedback
                        : "No feedback available for this question."}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Step3Report
