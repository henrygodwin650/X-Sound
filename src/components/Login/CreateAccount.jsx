import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { auth, db } from "../../backend/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  FaApple,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaMusic,
} from "react-icons/fa";

import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";

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

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [showConfirm, setShowConfirm] = useState(false);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      navigate("/");

    } catch (error) {
      alert(error.message);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password", "");

  const strength = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[a-z]/.test(password)) score++;

    if (/\d/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [password]);

  const onSubmit = async (data) => {

    try {
      setMessage('');
      setError("");

      // Create Firebase user

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, {
        displayName: data.name,
      });

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: data.name,
        email: data.email,
        createdAt: serverTimestamp(),
      });

      // Send email verification
      await sendEmailVerification(user);

      setMessage(
        <div className="container my-4 mx-auto">
          <div className="border text-green-600 rounded-2xl border-white/20 py-3 bg-white/10 shadow-[0_0_80px_rgba(34,197,94,.25)]">
            <p className="text-center font-semibold text-lg">Password reset email sent to your email. Please check your inbox 📧.</p>
          </div>
        </div>
      );

      navigate("/verify-email");

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

  const getStrengthColor = () => {
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-orange-500";
    if (strength === 3) return "bg-yellow-500";
    if (strength === 4) return "bg-lime-500";

    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    if (strength === 4) return "Strong";

    return "Excellent";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-900 to-green-950">

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      {/* Aurora */}

      <div className="absolute inset-0">

        <div className="absolute -left-20 top-0 h-105 w-105 rounded-full bg-green-500/20 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-125 w-125 rounded-full bg-emerald-500/20 blur-[170px]" />

      </div>

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

              Listen.

              <br />

              Discover.

              <br />

              Feel Music.

            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-gray-300">

              Stream millions of songs, create unlimited playlists,
              download music offline, and enjoy a premium listening
              experience anywhere.

            </p>

            {/* Feature Cards */}

            <div className="mt-12 grid grid-cols-2 gap-5">

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">

                <h3 className="text-3xl font-bold text-green-400">
                  100M+
                </h3>

                <p className="mt-2 text-gray-300">
                  Songs Available
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">

                <h3 className="text-3xl font-bold text-green-400">
                  50M+
                </h3>

                <p className="mt-2 text-gray-300">
                  Active Users
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">

                <h3 className="text-3xl font-bold text-green-400">
                  HD
                </h3>

                <p className="mt-2 text-gray-300">
                  Lossless Audio
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">

                <h3 className="text-3xl font-bold text-green-400">
                  Offline
                </h3>

                <p className="mt-2 text-gray-300">
                  Download Music
                </p>

              </div>

            </div>

          </motion.div>

          {/* ================= RIGHT SIDE ================= */}

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-[35px] border border-white/20 bg-white/10 p-8 shadow-[0_0_80px_rgba(34,197,94,.25)] backdrop-blur-2xl"
          >

            <h2 className="text-center text-4xl font-bold text-white">
              Create Account
            </h2>

            <p className="mt-3 text-center text-gray-400">
              Start your premium music journey today.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-5"
            >
              {/* ================= FULL NAME ================= */}

              <div>

                <label className="mb-2 block font-medium text-gray-300">
                  Full Name
                </label>

                <div className="relative">

                  <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name", {
                      required: "Full name is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters",
                      },
                    })}
                    className="w-full rounded-2xl border border-gray-700 bg-gray-900/70 py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition focus:border-green-500"
                  />

                </div>

                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}

              </div>

              {/* ================= EMAIL ================= */}

              <div>

                <label className="mb-2 block font-medium text-gray-300">
                  Email Address
                </label>

                <div className="relative">

                  <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

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
                    className="w-full rounded-2xl border border-gray-700 bg-gray-900/70 py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition focus:border-green-500"
                  />

                </div>

                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}

              </div>

              {/* ================= PASSWORD ================= */}

              <div>

                <label className="mb-2 block font-medium text-gray-300">
                  Password
                </label>

                <div className="relative">

                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...register("password",
                      {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Minimum 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                          message:
                            "Must contain uppercase, lowercase, number and special character",
                        },
                      })}
                    className="w-full rounded-2xl border border-gray-700 bg-gray-900/70 py-3 pl-12 pr-12 text-white placeholder:text-gray-500 outline-none transition focus:border-green-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>

                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}

              </div>

              {/* ================= PASSWORD STRENGTH ================= */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm text-gray-400">
                    Password Strength
                  </span>

                  <span className="text-sm font-semibold text-green-400">
                    {getStrengthText()}
                  </span>

                </div>

                <div className="flex gap-2">

                  {[1, 2, 3, 4, 5].map((level) => (

                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full ${level <= strength
                        ? getStrengthColor()
                        : "bg-gray-700"
                        }`}
                    />

                  ))}

                </div>

                <p className="mt-3 text-sm text-gray-400">

                  Password should contain:

                  <br />

                  • 8+ characters

                  <br />

                  • Uppercase letter

                  <br />

                  • Lowercase letter

                  <br />

                  • Number

                  <br />

                  • Special character

                </p>

              </div>
              {/* ================= CONFIRM PASSWORD ================= */}

              <div>
                <label className="mb-2 block font-medium text-gray-300">
                  Confirm Password
                </label>

                <div className="relative">

                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="w-full rounded-2xl border border-gray-700 bg-gray-900/70 py-3 pl-12 pr-12 text-white placeholder:text-gray-500 outline-none transition focus:border-green-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* ================= TERMS ================= */}

              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  {...register("terms", {
                    required: "You must accept the Terms & Conditions",
                  })}
                  className="mt-1 h-5 w-5 accent-green-500"
                />

                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-green-400 hover:text-green-300"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-green-400 hover:text-green-300"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {errors.terms && (
                <p className="text-sm text-red-400">
                  {errors.terms.message}
                </p>
              )}

              {/* ================= DIVIDER ================= */}

              <div className="flex items-center gap-4">

                <div className="h-px flex-1 bg-gray-700" />

                <span className="text-sm text-gray-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-gray-700" />

              </div>

              {/* ================= SOCIAL LOGIN ================= */}

              <div className="grid grid-cols-2 gap-4">

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-gray-600 py-3 text-white transition hover:bg-white hover:text-black"
                >
                  <FaApple className="text-xl" />
                  Apple
                </button>

                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-red-500 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  <FaGoogle className="text-xl" />
                  Google
                </button>

              </div>

              {/* ================= CREATE ACCOUNT BUTTON ================= */}

              <motion.button
                whilehover={{
                  scale: 1.02,
                }}
                whiletap={{
                  scale: 0.98,
                }}
                type="submit"
                className="w-full rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 py-4 text-lg font-bold text-white shadow-lg transition hover:shadow-[0_0_30px_rgba(34,197,94,.45)]"
              >
                Create Account
              </motion.button>

              {/* ================= LOGIN LINK ================= */}

              <p className="text-center text-gray-400">

                Already have an account?

                <Link
                  to="/login"
                  className="ml-2 font-semibold text-green-400 hover:text-green-300"
                >
                  Login
                </Link>

              </p>

            </form>

          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default CreateAccount;