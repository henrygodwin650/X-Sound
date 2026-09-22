import React, { useState } from 'react'
import { FaSave, FaUser } from 'react-icons/fa'
import { auth, db } from "../../../backend/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { updateProfile } from "firebase/auth"
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    userName: '',
    email: '',
    phone: '',
    bio: '',
    country: 'Nigeria',
  })
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")
  // const [preview, setPreview] = useState("");
  // const [loading, setLoading] = useState(true)

  // const loadProfile = async () => {
  //   try {
  //     const user =auth.currentUser
  //     if(!user) return;

  //     // Firebase Authentication
  //     const authData = {
  //       displayName: user.displayName || "",
  //       email: user.email || ""
  //     }
  //     setPreview(user.photoUrl || "")

  //     // Firestore
  //     const docRef = doc(db, 'user', user.uid)
  //     const docSnap = await getDoc(docRef)

  //     if (docSnap.exists())
  //       {
  //       const data = docSnap.data();
  //     setFormData(
  //       ...authData,
  //       username: data.username || "",
  //       phone: data.phone || "",
  //       country: data.country || "",
  //     )
  //   } else {
  //     // If no Firestore document exists
  //     setFormData(
  //       ...authData,
  //       username: "",
  //       phone: "",
  //       bio: "",
  //       country: "",
  //     )}
  //   } 
  // } catch(error){
  //   console.error(error)
  // } finally{
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   loadProfile();
  // }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {

    if (!formData.displayName.trim()) {
      setError({
        displayName: "display Name is required."
      });
      return;
    }

    if (!formData.username.trim()) {
      setError({
        username: "Username is required."
      });
      return;
    }

    if (formData.username.length < 3) {
      setError({ username: "Username must be at least 3 characters." });
      return;
    }

    if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      setError({ phone: "Please enter a vaild phone number." });
      return;
    }

    if (formData.bio.length > 150) {
      setError({ bio: "Bio cannot exceed 150 characters." });
      return;
    }

    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    try {
      setSaving(true);
      // Update Firebase Authentication
      await updateProfile(user, {
        displayName: formData.displayName
      });
      // Upadte Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        username: formData.userName,
        phone: formData.phone,
        bio: formData.bio,
        country: formData.country
      });
      setMessage(
        <div className="container my-4 mx-auto">
          <div className="border text-green-600 rounded-2xl border-white/20 py-3 bg-white/10 shadow-[0_0_80px_rgba(34,197,94,.25)]">
            <p className="text-center font-semibold text-lg">Profile update successfully!</p>
          </div>
        </div>
      )
    } catch (error) {
      setError(
        error.message(<div className="container my-4 mx-auto">
          <div className="border text-red-500 rounded-2xl border-white/20 py-3 bg-white/10 shadow-[0_0_80px_rgba(34,197,94,.25)]">
            <p className="text-center font-semibold text-lg">Something went wrong. Please try again later.</p>
          </div>
        </div>)
      );
    } finally {
      setSaving(false)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl'>
      {/* Header */}
      <div className="mb-8 flex items-center gap-3 text-green-600 font-bold">
        <FaUser className='text-2xl font-bold text-white' />
        Profile Settings
      </div>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <div className='flex justify-center mb-8'>
        <div className='flex h-28 w-28 items-center justify-center rounded-full border-4 border-green-500 bg-green-600 text-5xl font-bold text-white'>
          {(formData.displayName?.charAt(0) || "U").toUpperCase()}
        </div>
      </div>

      {/* input Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="">
          <label htmlFor="" className="mb-2 block text-sm font-medium text-gray-300">
            DIsplay Name
          </label>
          <input
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder='User-name'
            type="text"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-green-500" />

          {error.displayName && (
            <p className='mt-1 text-red-400'>
              {error.displayName}
            </p>
          )}
        </div>

        {/* UserName */}
        <div className="">
          <label htmlFor="" className="mb-2 block text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            name='username'
            value={formData.username}
            onChange={handleChange}
            placeholder='@henry'
            className='w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-green-500'
            type="text" />
          {error.username && (
            <p className='mt-1 text-red-400'>
              {error.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="">
          <label htmlFor="" className="mb-2 block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input type="email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='example@gmail.com'
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-green-500" />
        </div>

        {/* Phone */}
        <div className="">
          <label htmlFor="" className="mb-2 block text-sm font-medium text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='+234 904 *** ****'
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-green-500" />
          {error.phone && (
            <p className='mt-1 text-red-400'>
              {error.phone}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="">
          <label htmlFor="" className="mb-2 block text-sm font-medium text-gray-300">
            Bio
          </label>
          <textArea
            rows={4}
            name='bio'
            value={formData.bio}
            maxLength={150}
            onChange={handleChange}
            placeholder='Tell people about yourself...'
            className='w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-green-500'
          ></textArea>
          {error.bio && (
            <p className='mt-1 text-red-400'>
              {error.bio}
            </p>
          )}
          <p className='mt-1 text-right text-xs text-gray-400'>
            {formData.bio.length} / 150
          </p>
        </div>

        {/* Country */}
        <div className="mt-5">
          <label htmlFor="" className="mb-2 block text-sm font-medium text-gray-300">
            Country
          </label>

          <select
            name="country"
            id=""
            value={formData.country}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-green-500">
            <option value="Ghana" className="bg-gray-900">
              Ghana
            </option>
            <option value="South Africa" className="bg-gray-900">
              South Africa
            </option>
            <option value="United States" className="bg-gray-900">
              United States
            </option>
            <option value="Nigeria" className="bg-gray-900">
              Nigeria
            </option>
          </select>
        </div>

        {/* Save Button */}
        <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-5 py-3 font-semibold text-white transition hover:bg-green-600"
          disable={saving}
          type='submit'>
          <FaSave />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}

export default ProfileForm