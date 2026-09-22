import React from 'react'
import Skeleton from 'react-loading-skeleton'

const HeroSkeleton = () => {
  return (
    <div className='rounded-3xl overflow-hidden'>
      <Skeleton height={420} />
    </div>
  )
}
export default HeroSkeleton