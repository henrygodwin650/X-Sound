import React from 'react'
import { FiMusic } from 'react-icons/fi'

const EmptyLibrary = () => {
  return (
    <div className='rounded-3xl border border-dashed border-white/10 bg-white/5 p-20 text-center'>
      <FiMusic className='mx-auto text-7xl text-gray-500' />
      <h2 className='mt-6 text-3xl font-bold text-white'>
        No Local Music
      </h2>
      <p className='mt-3 text-gray-400'>
        Click "Import Music" to add songs from your device.
      </p>
    </div>
  )
}

export default EmptyLibrary