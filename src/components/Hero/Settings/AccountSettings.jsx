import React, { useEffect, useState } from "react";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  FaLock,
  FaSave,
  FaTrash,
  FaShieldAlt,
} from "react-icons/fa";
import { auth, db } from "../../../backend/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setEmailVerified(user.emailVerified);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteAccount = async () => {
    if (deleteText !== "DELETE") {
      alert('Please type "DELETE" to continue.');
      return;
    }

    const user = auth.currentUser;

    if (!user) return;

    if (!password) {
      alert("Enter your current password.");
      return;
    }

    try {
      setDeleting(true);

      const credential = EmailAuthProvider.credential(
        user.email,
        password
      );

      await reauthenticateWithCredential(user, credential);

      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);

      alert("Account deleted successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Delete account error:", error);
      alert(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      setSendingEmail(true);

      await sendEmailVerification(user);

      alert("Verification email has been sent.");
    } catch (error) {
      console.error("Verification error:", error);
      alert(error.message);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      alert("Enter your current password.");
      return;
    }

    if (!formData.newPassword) {
      alert("Enter a new password.");
      return;
    }

    if (formData.newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) return;

      const credential = EmailAuthProvider.credential(
        user.email,
        formData.currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, formData.newPassword);

      alert("Password updated successfully.");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password update error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const refreshVerificationStatus = async () => {
    const user = auth.currentUser;

    if (!user) return;

    try {
      await user.reload();

      setEmailVerified(auth.currentUser?.emailVerified || false);
    } catch (error) {
      console.error("Refresh verification error:", error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* CHANGE PASSWORD */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-6"
      >
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <FaLock className="text-lg text-green-400 sm:text-xl" />

          <h2 className="text-lg font-bold text-white sm:text-xl">
            Change Password
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {[
            {
              name: "currentPassword",
              label: "Current Password",
            },
            {
              name: "newPassword",
              label: "New Password",
            },
            {
              name: "confirmPassword",
              label: "Confirm Password",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-2 block text-sm text-gray-300">
                {field.label}
              </label>

              <input
                type="password"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500 sm:text-base"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-60 sm:mt-8 sm:text-base"
        >
          <FaSave />

          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* EMAIL VERIFICATION */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <FaShieldAlt className="text-lg text-green-400 sm:text-xl" />

          <h2 className="text-lg font-bold text-white sm:text-xl">
            Email Verification
          </h2>
        </div>

        <div className="space-y-3">
          <p className="break-all text-sm text-white sm:text-base">
            Email:{" "}
            <span className="text-green-400">
              {auth.currentUser?.email || "No email"}
            </span>
          </p>

          <p className="text-sm text-white sm:text-base">
            Status:{" "}
            {emailVerified ? (
              <span className="font-semibold text-green-500">
                ✅ Verified
              </span>
            ) : (
              <span className="font-semibold text-red-500">
                ❌ Not Verified
              </span>
            )}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {!emailVerified && (
            <button
              type="button"
              onClick={handleVerifyEmail}
              disabled={sendingEmail}
              className="rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-60 sm:text-base"
            >
              {sendingEmail
                ? "Sending..."
                : "Send Verification Email"}
            </button>
          )}

          <button
            type="button"
            onClick={refreshVerificationStatus}
            className="rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base"
          >
            Refresh Status
          </button>
        </div>
      </div>

      {/* DELETE ACCOUNT */}
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <FaTrash className="text-lg text-red-500 sm:text-xl" />

          <h2 className="text-lg font-bold text-red-500 sm:text-xl">
            Delete Account
          </h2>
        </div>

        <p className="text-sm leading-6 text-gray-300 sm:text-base">
          Deleting your account will permanently remove your profile,
          playlists, favorites and settings. This action cannot be undone.
        </p>

        <div className="mt-5">
          <label className="mb-2 block text-sm text-gray-300">
            Current Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-red-500 sm:text-base"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm text-gray-300">
            Type{" "}
            <span className="font-bold text-red-500">
              DELETE
            </span>{" "}
            to confirm
          </label>

          <input
            type="text"
            value={deleteText}
            onChange={(e) => setDeleteText(e.target.value)}
            placeholder="DELETE"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-red-500 sm:text-base"
          />
        </div>

        <button
          type="button"
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="mt-5 w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 sm:mt-6 sm:text-base"
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;