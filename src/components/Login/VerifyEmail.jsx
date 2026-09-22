import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMusic } from 'react-icons/fa';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../backend/firebase';

const VerifyEmail = () => {
  const notes = [
    { id: 1, left: "5%", size: 24, duration: 12, delay: 0 },
    { id: 2, left: "15%", size: 18, duration: 16, delay: 3 },
    { id: 3, left: "25%", size: 30, duration: 18, delay: 5 },
    { id: 4, left: "38%", size: 22, duration: 15, delay: 2 },
    { id: 5, left: "52%", size: 28, duration: 14, delay: 7 },
    { id: 6, left: "66%", size: 20, duration: 19, delay: 4 },
    { id: 7, left: "78%", size: 26, duration: 17, delay: 8 },
    { id: 8, left: "92%", size: 22, duration: 13, delay: 6 },
  ];
  const navigate = useNavigate();
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleVerification = async () => {
    await auth.currentUser.reload();
    if (auth.currentUser.emailVerified) {
      navigate("/")
    } else {
      alert("Your Email hasn't been verified yet.")
    }
  };

  const handleResend = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setMessage(
        <div className="container my-4 mx-auto">
          <div className="border text-green-600 rounded-2xl border-white/20 py-3 bg-white/10 shadow-[0_0_80px_rgba(34,197,94,.25)]">
            <p className="text-center font-semibold text-lg">Password reset email sent to your email. Please check your inbox 📧.</p>
          </div>
        </div>
      );
    } catch (err) {
      switch (error.code) {
        case "auth/too-many-attempt": setError(
          err.message(<div className="container my-4 mx-auto">
            <div className="border text-red-500 rounded-2xl border-white/20 py-3 bg-white/10 shadow-[0_0_80px_rgba(34,197,94,.25)]">
              <p className="text-center font-semibold text-lg">Too many attempts. Please try again later.</p>
            </div>
          </div>)
        );
          break;
        default: setError(
          <div className="container my-4 mx-auto">
            <div className="border text-red-500 rounded-2xl border-white/20 py-3 bg-white/10 shadow-[0_0_80px_rgba(34,197,94,.25)]">
              <p className="text-center font-semibold text-lg">
                Something went wrong. Please try again later
              </p>
            </div>
          </div>
        );
      };
    }
  }
  return (
    <div className="relative min-h-screen overflow-hidden p-8 bg-linear-to-br from-black via-gray-900 to-green-950">
      <motion.div initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex items-center flex-col justify-center"
      >
        <h1 className="text-7xl font-black leading-none text-white">
          X
          <span className="bg-linear-to-r from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent">
            Sound
          </span>
        </h1>
        <span className="mb-4 mt-6 inline-flex w-fit rounded-full bg-green-500/20 px-4 py-2 text-white font-semibold text-3xl">
          🎵 Verify your Email
        </span>
        <p className="text-shadow-lg mt-8 max-w-lg leading-5 text-gray-300 mb-7">
          <span className='text-lg text-blue-400 -mb-2'>
            We sent you a verification message to your email!.
          </span>
          <br />

        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >
        <div className="w-full max-w-lg rounded-[35px] border border-white/20 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(34,197,94,.25)]">

          {/* Aurora Background */}
          <div className="absolute inset-0">
            <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-green-500/20 blur-[140px]" />
            <div className="absolute bottom-0 right-0 h-112.5 w-112.5 rounded-full bg-emerald-500/20 blur-[170px]" />
          </div>
          {/* Floating Music Notes */}
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ y: "110vh", opacity: 0 }}
              animate={{
                y: "-20vh",
                opacity: [0, 0.5, 0.8, 0],
              }}
              transition={{
                duration: note.duration,
                delay: note.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: note.left,
                fontSize: note.size,
              }}
              className="absolute text-green-400/20"
            >
              <FaMusic />
            </motion.div>
          ))}
          <div className="flex gap-5 justify-center items-center lg:flex-row flex-col">
            <button onClick={handleResend} className="border border-green-400 bg-green-600 text-white cursor-pointer hover:opacity-20 text-semibold rounded-2xl p-4">
              Didn't receive an email?
            </button>
            <button onClick={handleVerification} className="border border-green-400 bg-green-600 text-white cursor-pointer hover:opacity-20 text-semibold rounded-2xl p-4">
              I've Verified my Email.
            </button>
          </div>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </div>
      </motion.div>
    </div>
  )
}

export default VerifyEmail