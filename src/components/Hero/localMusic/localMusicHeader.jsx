import React from 'react'
import { FiHardDrive } from "react-icons/fi"
const LocalMusicHeader = () => {
  return (
    <div className='rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl p-8'>
   <div className="flex items-center gap-4">
    <div className="rounded-2xl bg-green-500 p-4">
      <FiHardDrive className='text-4xl text-white' />
    </div>
    <div className="">
      <h1 className="text-4xl font-black text-white">
        Local Music
      </h1>
      <p className="mt-2 text-gray-400">
        Import and play music stored on your device.
      </p>
    </div>
   </div>
    </div>
  )
}

export default LocalMusicHeader