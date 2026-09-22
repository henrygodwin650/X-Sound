import React, { useEffect, useState } from 'react';
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updatePassword
} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { FaLock, FaSave, FaTrash, FaShieldAlt } from 'react-icons/fa';
import { auth, db } from '../../../backend/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

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
      alert('Please type "DELETE" to continue');
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      setDeleting(true);
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      alert("Account deleted successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
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
      console.error(error);
      alert(error.message);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      alert("Enter your current password");
      return;
    }
    if (!formData.newPassword) {
      alert("Enter a new password");
      return;
    }
    if (formData.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
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

      alert("Password updated successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const refreshVerificationStatus = async () => {
    const user = auth.currentUser;
    if (!user) return;
    await user.reload();
    setEmailVerified(user.emailVerified);
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <FaLock className="text-xl text-green-400" />
          <h2 className="text-xl font-bold text-white">Change Password</h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-5 py-3 font-semibold text-white transition hover:bg-green-600 disabled:opacity-60"
        >
          <FaSave />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Email Verification */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <FaShieldAlt className="text-xl text-green-400" />
          <h2 className="text-xl font-bold text-white">Email Verification</h2>
        </div>

        <p className="text-white">
          Email:{" "}
          <span className="ms-2 text-green-400">
            {auth.currentUser?.email}
          </span>
        </p>

        <p className="mt-2 text-white">
          Status:{" "}
          {emailVerified ? (
            <span className="ms-2 font-semibold text-green-500">
              ✅ Verified
            </span>
          ) : (
            <span className="ms-2 font-semibold text-red-500">
              ❌ Not Verified
            </span>
          )}
        </p>

        {!emailVerified && (
          <button
            onClick={handleVerifyEmail}
            disabled={sendingEmail}
            className="mt-5 rounded-xl bg-green-500 px-5 py-3 text-white disabled:opacity-60"
          >
            {sendingEmail ? "Sending..." : "Send Verification Email"}
          </button>
        )}

        <button
          onClick={refreshVerificationStatus}
          className="mt-3 rounded-xl border border-white/20 px-4 py-2 text-white"
        >
          Refresh Status
        </button>
      </div>

      {/* Delete Account */}
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
        <div className="mb-4 flex items-center gap-3">
          <FaTrash className="text-xl text-red-500" />
          <h2 className="text-xl font-bold text-red-500">Delete Account</h2>
        </div>

        <p className="mt-4 text-gray-300">
          Deleting your account will permanently remove your profile, playlists,
          favorites and settings. This action cannot be undone.
        </p>

        <div className="mt-5">
          <label className="mb-2 block text-sm text-gray-300">
            Current Password (required)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-red-500"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm text-gray-300">
            Type <span className="font-bold text-red-500">DELETE</span> to
            confirm
          </label>
          <input
            type="text"
            value={deleteText}
            onChange={(e) => setDeleteText(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-red-500"
            placeholder="DELETE"
          />
        </div>

        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="mt-6 w-full rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;