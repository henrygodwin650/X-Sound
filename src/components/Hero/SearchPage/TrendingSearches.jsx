import { motion } from 'framer-motion'
import React from 'react'
import { FiTrendingUp } from 'react-icons/fi'
import Davido from '../../../assets/cover-image/download (4).jpeg'
import Burnaboy2 from '../../../assets/cover-image/images (5).jpeg'
import Wizkid2 from '../../../assets/cover-image/images (12).jpeg'
import Ayra1 from '../../../assets/cover-image/images (16).jpeg'
import Phyno from '../../../assets/cover-image/images (28).jpeg'
import Evado from '../../../assets/cover-image/images (32).jpeg'
import Rema from '../../../assets/cover-image/images (1).jpeg'
import OmahLay from '../../../assets/cover-image/images (7).jpeg'
import ChinyereUdoma from '../../../assets/cover-image/images (15).jpeg'
import Jeriq from '../../../assets/cover-image/download (5).jpeg'

const trending = [
 { 
  id: 1,
  title: "Burna Boy",
  image: Burnaboy2,
},
  { 
  id: 2,
  title: "Wizkid",
  image: Wizkid2,
},
 { 
  id: 3,
  title: "Phyno",
  image: Phyno,
},
  { 
  id: 4,
  title: "Evado",
  image: Evado,
},
  { 
  id: 5,
  title: "Rema",
  image: Rema,
},
  { 
  id: 6,
  title: "Omah Lay",
  image: OmahLay,
},
 { 
  id: 7,
  title: "Chinyere Udoma",
  image: ChinyereUdoma,
},
 { 
  id: 8,
  title: "Davido",
  image: Davido,
},
 { 
  id: 9,
  title: "Ayra Starr",
  image: Ayra1,
},
 { 
  id: 10,
  title: "Jeriq",
  image: Jeriq,
}
]

const TrendingSearches = ({ setSearch }) => {
  return (
    <div className='mb-12'>
      <div className="mb-5 flex items-center gap-3">
        <FiTrendingUp className='text-2xl text-green-500' />
        <h2 className='text-2xl font-bold text-white'>
          Trending Searches
        </h2>
      </div>
      <div className="flex flex-wrap gap-4">
        {trending.map((item, index) => (
          <motion.button
          key={item.id}
          initial={{
            opacity:0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay:index*0.05
          }}
          whileHover={{
            scale:1.06
          }}
          whileTap={{
            scale:.95
          }}
          onClick={()=>setSearch(item.title)}
          className='roundeed-full border border-white/10 bg-white/10 backdrop-blur-3xl px-5 py-3 text-gray-200 transition hover:bg-green-500 hover:text-white'
        >
          <img src={item.image} alt={item.title} className="s:w-12 s:h-12 w-24 h-24 rounded-full border-4 hover:border-white/70 border-green-500" />
          <p className='font-bold'>#{item.title}</p>
        </motion.button>
        ))}
      </div>
    </div>
  )
}

export default TrendingSearches