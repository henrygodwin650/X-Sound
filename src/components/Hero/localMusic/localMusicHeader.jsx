import React from "react";
import { FiHardDrive } from "react-icons/fi";

const LocalMusicHeader = () => {
  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-white/10
        p-4
        backdrop-blur-3xl
        sm:rounded-3xl sm:p-6
        md:p-8
      "
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className="
            flex shrink-0 items-center justify-center
            rounded-xl
            bg-green-500
            p-3
            sm:rounded-2xl sm:p-4
          "
        >
          <FiHardDrive className="text-2xl text-white sm:text-4xl" />
        </div>

        <div className="min-w-0">
          <h1
            className="
              text-2xl font-black text-white
              sm:text-3xl
              md:text-4xl
            "
          >
            Local Music
          </h1>

          <p className="mt-1 text-sm text-gray-400 sm:mt-2 sm:text-base">
            Import and play music stored on your device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocalMusicHeader;