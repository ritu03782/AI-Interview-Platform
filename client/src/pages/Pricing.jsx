
import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =
        plan.id === "basic" ? 100 :
        plan.id === "pro" ? 500 : 0;

      const result = await axios.post(
        ServerUrl + "/api/payment/order",
        {
          planId: plan.id,
          amount: amount,
          credits: plan.credits,
        },
        { withCredentials: true }
      )

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "AuraInterviewer",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          try {
            const verifypay = await axios.post(
              ServerUrl + "/api/payment/verify",
              response,
              { withCredentials: true }
            )

            dispatch(setUserData(verifypay.data.user))

            alert("Payment Successful 🎉 Credits Added!");
            navigate("/")
          } catch (error) {
            console.log(error)
            alert("Payment verification failed. Please contact support.")
          } finally {
            setLoadingPlan(null)
          }
        },

        theme: {
          color: "#7F1D2D",
        },
      }

      const rzp = new window.Razorpay(options)

      rzp.on('payment.failed', function (response) {
        console.log(response.error)
        setLoadingPlan(null)
        alert("Payment failed. Please try again.")
      })

      rzp.open()

    } catch (error) {
      console.log(error)
      setLoadingPlan(null);
    }
  }

  return (
    <div className='min-h-screen bg-[#FFF8F5] py-16 px-6'>

      {/* Header */}
      <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>

        <button
          onClick={() => navigate("/")}
          className='mt-2 p-3 rounded-full bg-white border border-[#FFE3D5] shadow-sm hover:shadow-md hover:bg-[#FFE3D5] transition'
        >
          <FaArrowLeft className='text-[#7F1D2D]' />
        </button>

        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-[#7F1D2D]">
            Choose Your Plan
          </h1>

          <p className="text-[#987A76] mt-3 text-lg">
            Flexible pricing to match your interview preparation goals.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div
              key={plan.id}
              whileHover={!plan.default ? { scale: 1.03 } : {}}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}

              className={`relative rounded-3xl p-8 transition-all duration-300 border
                ${isSelected
                  ? "border-[#7F1D2D] shadow-xl bg-white"
                  : "border-[#FFE3D5] bg-white shadow-md"
                }
                ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6 bg-[#7F1D2D] text-white text-xs px-4 py-1 rounded-full shadow-sm">
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-6 right-6 bg-[#FFE3D5] text-[#7F1D2D] text-xs px-3 py-1 rounded-full">
                  Default
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-[#4A252B]">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4">
                <span className="text-3xl font-bold text-[#7F1D2D]">
                  {plan.price}
                </span>

                <p className="text-[#987A76] mt-1">
                  {plan.credits} Credits
                </p>
              </div>

              {/* Description */}
              <p className="text-[#987A76] mt-4 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-[#B85C68] text-sm shrink-0" />

                    <span className="text-[#5F4545] text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Select / Payment Button */}
              {!plan.default &&
                <button
                  disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!isSelected) {
                      setSelectedPlan(plan.id)
                    } else {
                      handlePayment(plan)
                    }
                  }}
                  className={`w-full mt-8 py-3 rounded-xl font-semibold transition
                    ${isSelected
                      ? "bg-[#7F1D2D] text-white hover:bg-[#641523] shadow-md"
                      : "bg-[#FFF0E9] text-[#7F1D2D] hover:bg-[#FFE3D5]"
                    }
                    disabled:opacity-60 disabled:cursor-not-allowed
                  `}
                >
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                      ? "Proceed to Pay"
                      : "Select Plan"}
                </button>
              }

            </motion.div>
          )
        })}

      </div>
    </div>
  )
}

export default Pricing
