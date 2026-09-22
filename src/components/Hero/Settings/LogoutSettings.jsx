import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { auth } from '../../../backend/firebase'
import { useNavigate } from 'react-router-dom'
const LogoutSettings = () => {

  const [showLogout, setShowLogout] = useState(false)
  const navigate = useNavigate();
  const [ loggingOut, setLoggingOut ] = useState(false)
  
  const handleLogout = async () => {
    try{
      setLoggingOut(true)
      await signOut(auth)
      navigate("/login")
    } catch (error) {
      console.error("Logout Error:".error)
      alert(error.message)
    } finally{
      setLoggingOut(false)
    }
  }

  return (
    <div>
      <li className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
        <button className="flex w-full items-center justify-between"
          onClick={() => setShowLogout(!showLogout)}>
          <div className="flex items-center gap-4 ">
            <FiLogOut className='text-2xl text-red-500' />
            <span className="text-xl font-bold text-red-500">Logout</span>
          </div>
          <FaCaretDown className={`transition duration-300 ${showLogout ? "rotate-180" : ""}`} />
        </button>
      </li>
      {/* Comfirmation Box */}
      {showLogout && (
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-white/10 p-6 backdrop-blur-xl">
          <div className="text-center">
            <div className="mb-4 text-6xl">📱</div>
            <h2 className="text-2xl font-bold text-white">
              Sign Out
            </h2>
            <p className="mt-3 text-gray-400">
              Are you sure you want to sign out of your Xsound account?
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <button 
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600 disabled:opacity-50">
              {loggingOut ? "Logging out ..." : "Logout"}
            </button>
            <button className="flex-1 rounded-xl border border-white/20 py-3 font-semibold text-white hover:bg-white/10"
            onClick={() => setShowLogout(false)}
            type='button'
            disabled={loggingOut}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LogoutSettings