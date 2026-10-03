import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { auth } from "../../../backend/firebase";
import { useNavigate } from "react-router-dom";

const LogoutSettings = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await signOut(auth);

      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      alert(error.message);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div>
      <div className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-4"
          onClick={() => setShowLogout((prev) => !prev)}
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <FiLogOut className="shrink-0 text-xl text-red-500 sm:text-2xl" />

            <span className="text-lg font-bold text-red-500 sm:text-xl">
              Logout
            </span>
          </div>

          <FaCaretDown
            className={`shrink-0 transition duration-300 ${
              showLogout ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {showLogout && (
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-white/10 p-5 backdrop-blur-xl sm:p-6">
          <div className="text-center">
            <div className="mb-4 text-5xl sm:text-6xl">
              👋
            </div>

            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Sign Out
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
              Are you sure you want to sign out of your XSound account?
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50 sm:text-base"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>

            <button
              type="button"
              onClick={() => setShowLogout(false)}
              disabled={loggingOut}
              className="flex-1 rounded-xl border border-white/20 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutSettings;