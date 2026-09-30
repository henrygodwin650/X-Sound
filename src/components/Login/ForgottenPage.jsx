import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../backend/firebase";
import { motion } from "framer-motion";
import { FaArrowLeft, FaMusic } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ForgottenPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage("");
    setError("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, trimmedEmail);

      setMessage(
        "Password reset email sent. Please check your inbox 📧."
      );
    } catch (err) {
      console.error("Password reset error:", err);

      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many attempts. Please try again later."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection and try again."
          );
          break;

        case "auth/user-not-found":
          setError(
            "No account was found with that email."
          );
          break;

        default:
          setError(
            "Something went wrong. Please try again later."
          );
      }
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-900 to-green-950 px-4 py-8 sm:px-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center"
      >
        {/* Back Button */}
        <Link
          to="/login"
          className="mb-8 flex w-fit items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white shadow-[0_0_80px_rgba(34,197,94,.25)] transition hover:bg-white/20"
        >
          <FaArrowLeft />
          <span>Go back to login</span>
        </Link>

        {/* Success Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 w-full max-w-lg rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm font-semibold text-green-400 sm:text-lg"
          >
            {message}
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 w-full max-w-lg rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-400 sm:text-lg"
          >
            {error}
          </motion.div>
        )}

        {/* Logo */}
        <h1 className="text-6xl font-black leading-none text-white sm:text-7xl">
          X
          <span className="bg-linear-to-r from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent">
            Sound
          </span>
        </h1>

        {/* Page Title */}
        <span className="mt-5 mb-4 inline-flex w-fit rounded-full bg-green-500/20 px-4 py-2 text-center text-2xl font-semibold text-green-400 sm:text-3xl">
          🎵 Forgotten password
        </span>

        {/* Description */}
        <p className="mb-7 mt-8 max-w-lg text-center leading-6 text-gray-300">
          <span className="text-blue-400">
            Forgot your password?
          </span>
          <br />
          No worries! Enter your email address and we&apos;ll
          send you a reset link.
        </p>
      </motion.div>

      {/* Reset Form */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >
        <div className="relative w-full max-w-lg rounded-[35px] border border-white/20 bg-white/10 p-5 shadow-[0_0_80px_rgba(34,197,94,.25)] backdrop-blur-2xl sm:p-8">

          {/* Floating Music Notes */}
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{
                y: "110vh",
                opacity: 0,
              }}
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

          {/* Form */}
          <form
            onSubmit={handleResetPassword}
            className="relative z-10 flex flex-col items-center gap-4 lg:flex-row"
          >
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
              disabled={loading}
              required
              className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-green-500 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <motion.button
              type="submit"
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              disabled={loading}
              className="w-full rounded-xl bg-linear-to-r from-green-500 to-emerald-600 px-5 py-3 text-lg font-semibold text-white shadow-lg transition hover:shadow-[0_0_25px_rgba(34,197,94,.45)] disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
            >
              {loading ? "Sending..." : "Reset Password"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgottenPage;