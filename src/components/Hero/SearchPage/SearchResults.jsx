import React from 'react'
import SearchCard from './SearchCard'
import TopResult from './SearchResults/TopResult'

const SearchResults = ({ music }) => {
  if(music.length === 0) {
    return(
      <div className="flex h-72 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">No Result Found</h2>
          <p className="mt-2 text-gray-400">
            Try searching for another song, artist or album
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="space-y-10">
        <TopResult music={music[0]} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {music.map((item) => (
            <SearchCard
            key={item.id}
            item={item} />
          ))}
        </div>
      </div>
  )
}

export default SearchResults