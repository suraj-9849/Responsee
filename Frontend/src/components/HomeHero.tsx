import React from 'react'
import "../index.css"

function HomeHero() {
  return (
    <div className=' hero flex w-full text-white h-[85vh] flex-col sm:flex-row ' >
      <div className='sm:w-1/3 sm:h-full h-[50vh] flex-col flex sm:justify-center justify-center  ' >
        <div className="capsules mb-10 ml-5 flex gap-4 w-full  ">
          <p className='sm:px-4 rounded-full px-5 py-1 inline w-fit  glassmorph sm:py-3 sm:text-2xl ' >AI integrated website</p>
          <p className='sm:px-4 rounded-full px-5 py-1 sm:py-3 hover:bg-purple-700 hover:scale-95 sm:text-2xl bg-purple-600 inline w-fit  ' >Github</p>
        </div>
       <div>
       <h1 className=" sm:text-6xl text-3xl mb-3 text-center" >Make Your Website</h1>
       <h1 className=' sm:text-7xl text-3xl playwrite-be-vlg text-center mb-10 ' >Responsive</h1>
       </div>
        <div className='flex justify-start gap-5 mt-10 ml-5 ' >
          <button className='glassmorph rounded-full hover:scale-95 px-4 py-1 sm:py-3 sm:text-2xl ' >Get started → </button>
          <button className='rounded-full text-start hover:bg-purple-700 hover:scale-95 sm:py-2 sm:text-2xl px-4 py-1 bg-purple-600' >Explore</button>
        </div>
      </div>
      <div className='w-2/3 h-full bg-red-200 sm:flex items-center justify-center hidden ' ></div>
    </div>
  )
}

export default HomeHero
