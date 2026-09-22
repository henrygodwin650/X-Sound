import React from 'react'
import { BiRotateRight } from 'react-icons/bi'
import Skeleton from 'react-loading-skeleton'

const LoadingScreen = () => {
  return (
    <div className='hero-bg-color'>
      <div className="flex flex-col items-center">
        <Skeleton
          circle
          width={120}
          height={120} />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ 
          y: [0, -25, 0],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        >
          <BiRotateRight className='text-green-600 text-8xl' />
        </motion.div>
        <Skeleton
          width={100}
          style={{ marginTop: 15 }}
        />
      </div>
    </div>
  )
}

export default LoadingScreen