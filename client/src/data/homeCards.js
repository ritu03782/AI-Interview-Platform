import { BsBarChart,BsFileEarmarkText } from "react-icons/bs";
import evalImg from '../assets/AI-Descriptive-Answer-Evaluation.gif';
import resumeImg from '../assets/resume.png';
import pdfImg from "../assets/pdf.png"
import analyticsImg from "../assets/history.png"

const homeCards = [
    {
        image:evalImg,
        icon:BsBarChart,
        title:"AI Answer Evaluation",
        desc:"Scores communication, technical accuracy and confidence."
    },
    {
        image:resumeImg,
        icon:BsFileEarmarkText,
        title:"Resume Based Interview",
        desc:"Project-specific questions based on uploaded resume."
    },
    {
        image:pdfImg,
        icon:BsFileEarmarkText,
        title:"Downloadable PDF Report",
        desc:"Detailed strengths, weaknesses and improvement insights. "
    },
    {
        image:analyticsImg,
        icon:BsBarChart ,
        title:"Dowloadable PDF Report",
        desc:"Detailed strengths, weaknesses and improvement insights."
    }
   
]
export {homeCards}