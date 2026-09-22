import React from "react";
import Skeleton from "react-loading-skeleton";

const MusicCardSkeleton = () => {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <Skeleton
        height={180}
        borderRadius={18} />
      <Skeleton
        height={20}
        style={{ marginTop: 15 }}
      />
      <Skeleton
        width='70%'
      />
      <Skeleton
        width='40%'
        style={{marginTop: 10}}
      />
    </div>
  )
}
export default MusicCardSkeleton