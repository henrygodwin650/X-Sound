import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { auth } from "../../backend/firebase";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

  // ==========================================
  // EMAIL + PASSWORD LOGIN
  // ==========================================

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const email = data.email.trim().toLowerCase();

      await signInWithEmailAndPassword(
        auth,
        email,
        data.password
      );

      setMessage("Login successful. Welcome back to XSound! 🎵");

      navigate("/home");
    } catch (err) {
      console.error("Login Error:", err);
      console.error("Error Code:", err.code);
      console.error("Error Message:", err.message);

      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address 📧.");
          break;

        case "auth/user-not-found":
          setError("No account was found with that email 📧.");
          break;

        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Incorrect email or password.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many unsuccessful attempts. Please try again later."
          );
          break;

        case "auth/user-disabled":
          setError(
            "This account has been disabled. Please contact support."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        default:
          setError(
            err.message ||
              "Something went wrong. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GOOGLE LOGIN
  // ==========================================

  const loginWithGoogle = async () => {
    try {
      setGoogleLoading(true);
      setError("");
      setMessage("");

      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      setMessage("Google login successful. Welcome to XSound! 🎵");

      navigate("/home");
    } catch (err) {
      console.error("Google Login Error:", err);
      console.error("Google Error Code:", err.code);
      console.error("Google Error Message:", err.message);

      switch (err.code) {
        case "auth/popup-closed-by-user":
          setError("Google login was cancelled.");
          break;

        case "auth/popup-blocked":
          setError(
            "The Google login popup was blocked by your browser."
          );
          break;

        case "auth/cancelled-popup-request":
          setError("Google login was cancelled.");
          break;

        case "auth/account-exists-with-different-credential":
          setError(
            "An account already exists with this email using a different login method."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Too many attempts. Please try again later."
          );
          break;

        default:
          setError(
            err.message ||
              "Unable to sign in with Google. Please try again."
          );
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-900 to-green-950">

      {/* ==========================================
          ALERT MESSAGES
      ========================================== */}

      {message && (
        <div className="absolute left-1/2 top-5 z-50 w-[90%] max-w-md -translate-x-1/2">
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-center text-green-400 shadow-[0_0_50px_rgba(34,197,94,.2)] backdrop-blur-xl">
            <p className="font-semibold">
              {message}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute left-1/2 top-5 z-50 w-[90%] max-w-md -translate-x-1/2">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-center text-red-400 shadow-[0_0_50px_rgba(239,68,68,.15)] backdrop-blur-xl">
            <p className="font-semibold">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* ==========================================
          AURORA BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-green-500/20 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-112.5 w-112.5 rounded-full bg-emerald-500/20 blur-[170px]" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-[120px]" />
      </div>

      {/* ==========================================
          FLOATING MUSIC NOTES
      ========================================== */}

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

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div className="relative z-10 container mx-auto px-6 py-10">
        <div className="grid min-h-screen items-center gap-16 lg:grid-cols-2">

          {/* ==========================================
              LEFT SIDE
          ========================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="hidden flex-col justify-center lg:flex"
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
              Login to continue enjoying music,
              your favourite playlists, artists and albums.
            </p>

            {/* SOCIAL ICONS */}

            <div className="mt-12 flex gap-5 text-2xl text-white">
              <FaFacebook className="cursor-pointer transition hover:text-blue-500" />

              <FaInstagram className="cursor-pointer transition hover:text-pink-500" />

              <FaTwitter className="cursor-pointer transition hover:text-sky-500" />

              <FaLinkedin className="cursor-pointer transition hover:text-blue-700" />
            </div>
          </motion.div>

          {/* ==========================================
              LOGIN CARD
          ========================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md rounded-[35px] border border-white/20 bg-white/10 p-8 shadow-[0_0_80px_rgba(34,197,94,.25)] backdrop-blur-2xl">

              {/* TITLE */}

              <div className="text-center">
                <h2 className="text-4xl font-bold text-white">
                  Welcome Back
                </h2>

                <p className="mt-3 text-gray-400">
                  Login to continue your music journey.
                </p>
              </div>

              {/* ==========================================
                  SOCIAL LOGIN
              ========================================== */}

              <div className="mt-8 grid grid-cols-2 gap-4">

                {/* APPLE */}

                <button
                  type="button"
                  disabled
                  className="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-gray-600 py-3 text-gray-500 opacity-70"
                >
                  <FaApple className="text-xl" />

                  Apple
                </button>

                {/* GOOGLE */}

                <button
                  type="button"
                  onClick={loginWithGoogle}
                  disabled={googleLoading || loading}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-500 py-3 text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaGoogle className="text-xl" />

                  {googleLoading
                    ? "Signing In..."
                    : "Google"}
                </button>
              </div>

              {/* DIVIDER */}

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-700" />

                <span className="text-sm text-gray-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-gray-700" />
              </div>

              {/* ==========================================
                  FORM
              ========================================== */}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >

                {/* EMAIL */}

                <div>
                  <label className="mb-2 block text-gray-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="example@email.com"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message:
                          "Please enter a valid email",
                      },
                    })}
                    className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-green-500"
                  />

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}

                <div>
                  <label className="mb-2 block text-gray-300">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      {...register("password", {
                        required:
                          "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 pr-12 text-white outline-none transition placeholder:text-gray-500 focus:border-green-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
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

                {/* REMEMBER + FORGOT PASSWORD */}

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      className="accent-green-500"
                    />

                    Remember Me
                  </label>

                  <Link
                    to="/forgotten"
                    className="text-sm text-green-400 transition hover:text-green-300"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* LOGIN BUTTON */}

                <motion.button
                  whileHover={{
                    scale: loading ? 1 : 1.02,
                  }}
                  whileTap={{
                    scale: loading ? 1 : 0.98,
                  }}
                  disabled={loading || googleLoading}
                  type="submit"
                  className="w-full rounded-xl bg-linear-to-r from-green-500 to-emerald-600 py-4 text-lg font-bold text-white shadow-lg transition hover:shadow-[0_0_25px_rgba(34,197,94,.45)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Signing In..."
                    : "Login"}
                </motion.button>

                {/* CREATE ACCOUNT */}

                <p className="text-center text-gray-400">
                  Don't have an account?

                  <Link
                    to="/create-account"
                    className="ml-2 font-semibold text-green-400 transition hover:text-green-300"
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