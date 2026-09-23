import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../backend/firebase";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  // Check whether the user has verified their email
  const handleVerification = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setError("No user is currently signed in.");
        return;
      }

      await user.reload();

      if (user.emailVerified) {
        navigate("/");
      } else {
        setError("Your email hasn't been verified yet.");
      }
    } catch (err) {
      console.error("Verification check failed:", err);
      setError("Unable to check your verification status. Please try again.");
    }
  };

  // Resend verification email
  const handleResend = async () => {
  try {
    setMessage("");
    setError("");

    const user = auth.currentUser;

    if (!user) {
      setError("No user is currently signed in.");
      return;
    }

    console.log("Sending verification email to:", user.email);
    console.log("Already verified:", user.emailVerified);

    await sendEmailVerification(user);

    console.log("Firebase accepted the verification email request.");

    setMessage(
      "Verification email sent. Check your inbox and spam folder."
    );
  } catch (err) {
    console.error("SEND VERIFICATION ERROR:", err);
    console.error("ERROR CODE:", err.code);
    console.error("ERROR MESSAGE:", err.message);

    setError(`${err.code}: ${err.message}`);
  }
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-900 to-green-950 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center"
      >
        <h1 className="text-7xl font-black leading-none text-white">
          X
          <span className="bg-linear-to-r from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent">
            Sound
          </span>
        </h1>

        <span className="mb-4 mt-6 inline-flex w-fit rounded-full bg-green-500/20 px-4 py-2 text-3xl font-semibold text-white">
          🎵 Verify your Email
        </span>

        <p className="mb-7 mt-8 max-w-lg text-center leading-5 text-gray-300">
          <span className="text-lg text-blue-400">
            We sent you a verification message to your email!
          </span>
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >
        <div className="relative w-full max-w-lg overflow-hidden rounded-[35px] border border-white/20 bg-white/10 p-8 shadow-[0_0_80px_rgba(34,197,94,.25)] backdrop-blur-2xl">

          {/* Aurora Background */}
          <div className="pointer-events-none absolute inset-0">
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
              className="pointer-events-none absolute text-green-400/20"
            >
              <FaMusic />
            </motion.div>
          ))}

          {/* Content */}
          <div className="relative z-10">
            <div className="flex flex-col items-center justify-center gap-5 lg:flex-row">

              <button
                onClick={handleResend}
                className="cursor-pointer rounded-2xl border border-green-400 bg-green-600 p-4 font-semibold text-white transition hover:bg-green-500"
              >
                Didn't receive an email?
              </button>

              <button
                onClick={handleVerification}
                className="cursor-pointer rounded-2xl border border-green-400 bg-green-600 p-4 font-semibold text-white transition hover:bg-green-500"
              >
                I've Verified my Email
              </button>

            </div>

            {/* Success message */}
            {message && (
              <div className="mt-6 rounded-2xl border border-green-400/30 bg-green-500/10 p-4 text-center text-green-400">
                {message}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-center text-red-400">
                {error}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;