import Skeleton from "react-loading-skeleton";
import React from "react";

const PlaylistSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <Skeleton
        circle
        width={120}
        height={120} />

        <Skeleton 
         width={100}
         style={{marginTop: 15}}
        />
    </div>
  )
};
export default PlaylistSkeleton;