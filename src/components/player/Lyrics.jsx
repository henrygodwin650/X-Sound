import React from "react";
import { FaMusic } from "react-icons/fa";

const Lyrics = () => {
  return (
    <section className="min-h-screen bg-white px-4 py-8 text-gray-900 dark:bg-zinc-950 dark:text-white md:px-8">
      {/* Header */}
      <div className="mb-8 mt-15">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <FaMusic className="text-xl text-green-500" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Lyrics</h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Follow along with the music
            </p>
          </div>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-6 text-center dark:border-white/10 dark:bg-white/5">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <FaMusic className="text-2xl text-green-500" />
        </div>

        <h2 className="mb-2 text-xl font-semibold">
          No lyrics available
        </h2>

        <p className="max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
          Play a song to see its lyrics here.
        </p>
      </div>
    </section>
  );
};

export default Lyrics;