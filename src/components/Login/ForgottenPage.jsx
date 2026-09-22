import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../backend/firebase";
import { motion } from "framer-motion";
import { FaArrowLeft, FaInstagram, FaMusic } from "react-icons/fa6";
import { Link } from "react-router-dom";


const ForgottenPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Password reset email sent. Please check your inbox 📧."
      );
    } catch (err) {
      switch (err.code) {
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email.");
          break;
        case "auth/user-not-found":
          setError("No account was found with that email.");
          break;
        default:
          setError("Something went wrong. Please try again later.");
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
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-900 to-green-950 p-8">
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center"
      >
        <button className="mb-8 flex w-fit items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-[0_0_80px_rgba(34,197,94,.25)]">
          <Link to="/login" className="flex items-center gap-3 text-white">
            <FaArrowLeft />
            Go back to login
          </Link>
        </button>

        {message && (
          <div className="mb-4 w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 py-3 text-center text-lg font-semibold text-green-500">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 py-3 text-center text-lg font-semibold text-red-500">
            {error}
          </div>
        )}

        <h1 className="text-7xl font-black leading-none text-white">
          X
          <span className="bg-linear-to-r from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent">
            Sound
          </span>
        </h1>

        <span className="mt-5 mb-4 inline-flex w-fit rounded-full bg-green-500/20 px-4 py-2 text-3xl font-semibold text-green-400">
          🎵 Forgotten password
        </span>

        <p className="mb-7 mt-8 max-w-lg text-center leading-6 text-gray-300">
          <span className="text-blue-400">Forgot your password?</span>
          <br />
          No worries! Enter your email address and we&apos;ll send you a reset
          link.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >
        <div className="relative w-full max-w-lg rounded-[35px] border border-white/20 bg-white/10 p-8 shadow-[0_0_80px_rgba(34,197,94,.25)] backdrop-blur-2xl">
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
              style={{ left: note.left, fontSize: note.size }}
              className="absolute text-green-400/20"
            >
              <FaMusic />
            </motion.div>
          ))}

          <form
            onSubmit={handleResetPassword}
            className="flex flex-col items-center gap-4 lg:flex-row"
          >
            <input
              type="email"
              className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-green-500"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="rounded-xl bg-linear-to-r from-green-500 to-emerald-600 px-4 py-3 text-lg font-semibold text-white shadow-lg transition hover:shadow-[0_0_25px_rgba(34,197,94,.45)] disabled:cursor-not-allowed disabled:opacity-60"
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