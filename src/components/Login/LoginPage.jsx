import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { auth } from "../../backend/firebase";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import {
  FaApple,
  FaGoogle,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaEye,
  FaEyeSlash,
  FaMusic,
} from "react-icons/fa6";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState();


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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // =========================
  // Email & Password Login
  // =========================
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      setMessage('');

      await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      setMessage(
        <div className="container my-4 mx-auto">
          <div className="border text-green-600 rounded-2xl border-white/20 py-3 bg-white/10 shadow-[0_0_80px_rgba(34,197,94,.25)]">
            <p className="text-center font-semibold text-lg">Login Successfully.</p>
          </div>
        </div>
      );

      navigate("/home");
    } catch (err) {
      switch (error.code) {
        case "auth/too-many-attempt": setError(
          err.message(<div className="container my-4 mx-auto">
            <div className="border rounded-2xl border-white/20 py-3 bg-white/10 shadow-[0_0_80px_rgba(34,197,94,.25)]">
              <p className="text-center font-semibold text-lg">Too many attempts. Please try again later.</p>
            </div>
          </div>)
        );
          break;
        case "auth/invalid-email": setError(
          err.message(<div className="container my-4 mx-auto">
            <div className="border rounded-2xl text-red-500 border-white/20 py-3 bg-white/10 shadow-[0_0_80px_rgba(34,197,94,.25)]">
              <p className="text-center font-semibold text-lg">Please Enter a valid Email📧.</p>
            </div>
          </div>)
        );
          break;
        case "auth/user-not-found": setError(
          err.message(
            <div className="container my-4 mx-auto">
              <div className="border text-red-500 rounded-2xl border-white/20 py-3 bg-white/10 shadow-[0_0_80px_rgba(34,197,94,.25)]">
                <p className="text-center font-semibold text-lg">No account was found with that email 📧.</p>
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
      }

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Google Login
  // =========================
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      navigate("/home");
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
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-900 to-green-950">

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

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

      <div className="relative z-10 container mx-auto px-6 py-10">

        <div className="grid min-h-screen items-center gap-16 lg:grid-cols-2">

          {/* ================= LEFT SIDE ================= */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex flex-col justify-center"
          >

            <span className="mb-4 inline-flex w-fit rounded-full bg-green-500/20 px-4 py-2 text-green-400">
              🎵 Premium Music Streaming
            </span>

            <h1 className="text-7xl font-black leading-none text-white">
              X
              <span className="bg-linear-to-r from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent">
                Sound
              </span>
            </h1>

            <h2 className="mt-8 text-5xl font-bold leading-tight text-white">
              Welcome
              <br />
              Back.
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-gray-300">
              Login to continue enjoying millions of songs,
              your favourite playlists, artists and albums.
            </p>

            <div className="mt-12 flex gap-5 text-2xl text-white">

              <FaFacebook className="cursor-pointer transition hover:text-blue-500" />

              <FaInstagram className="cursor-pointer transition hover:text-pink-500" />

              <FaTwitter className="cursor-pointer transition hover:text-sky-500" />

              <FaLinkedin className="cursor-pointer transition hover:text-blue-700" />

            </div>

          </motion.div>

          {/* ================= RIGHT SIDE ================= */}

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >

            <div className="w-full max-w-md rounded-[35px] border border-white/20 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(34,197,94,.25)]">

              <div className="text-center">

                <h2 className="text-4xl font-bold text-white">
                  Welcome Back
                </h2>

                <p className="mt-3 text-gray-400">
                  Login to continue your music journey.
                </p>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-600 py-3 text-white transition hover:bg-white hover:text-black"
                >
                  <FaApple className="text-xl" />
                  Apple
                </button>

                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-500 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  <FaGoogle className="text-xl" />
                  Google
                </button>

              </div>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-700" />
                <span className="text-sm text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-700" />
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* ================= EMAIL ================= */}

                <div>

                  <label className="mb-2 block text-gray-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="example@email.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-green-500"
                  />

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}

                </div>

                {/* ================= PASSWORD ================= */}

                <div>

                  <label className="mb-2 block text-gray-300">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 pr-12 text-white placeholder:text-gray-500 outline-none transition focus:border-green-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}

                </div>

                {/* ================= REMEMBER ================= */}

                <div className="flex items-center justify-between">

                  <label className="flex items-center gap-2 text-sm text-gray-400">

                    <input
                      type="checkbox"
                      className="accent-green-500"
                    />

                    Remember Me

                  </label>

                  <button
                    type="button"
                    className="text-sm text-green-400 hover:text-green-300"
                  >
                    <Link to="/forgotten">
                     Forgot Password?
                    </Link>
                  </button>

                </div>

                {/* ================= LOGIN BUTTON ================= */}

                <motion.button
                  whilehover={{ scale: 1.02 }}
                  whiletap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-xl bg-linear-to-r from-green-500 to-emerald-600 py-4 text-lg font-bold text-white shadow-lg transition hover:shadow-[0_0_25px_rgba(34,197,94,.45)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing In..." : "Login"}
                </motion.button>

                {/* ================= CREATE ACCOUNT ================= */}

                <p className="text-center text-gray-400">

                  Don't have an account?

                  <Link
                    to="/"
                    className="ml-2 font-semibold text-green-400 hover:text-green-300"
                  >
                    Create Account
                  </Link>

                </p>

              </form>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;