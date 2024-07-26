import React from 'react'
import "../index.css"
import ResponsiveVideo from "../assets/Images/RepsonsiveVideo.mp4"

function LandingResponsive() {
  return (
    <div className='w-full sm:mt-4 mt-0  sm:h-[90vh] h-[70vh]  flex sm:flex-row  flex-col sm:gap-0 sm:justify-between justify-center text-white ' >
      <div className='demoVideo sm:w-1/2 w-full h-full flex items-center justify-center '>
      <div className='sm:w-[500px] sm:h-[500px] w-[400px] h-[400px] flex items-center justify-center rounded-2xl  '>
        <video src={ResponsiveVideo} className='w-full h-full object-cover ' autoPlay loop muted ></video>
      </div>
      </div>
      <div className='Info sm:w-1/2 w-full sm:h-full h-[140%] flex flex-col justify-center sm:gap-0 gap-4 px-10 '>
      <h1 className='sm:text-7xl text-4xl sm:mb-20 mb-7' >Lorem</h1>
      <p className='sm:mb-6 mb-2 sm:text-3xl ' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium incidunt, hic nesciunt dignissimos, tenetur omnis minima laborum reprehenderit doloremque exercitationem quae ratione deserunt velit blanditiis excepturi fugit voluptates dolore debitis.</p>
      <h4 className='sm:mb-4 mb-2 sm:text-2xl' >How can It help You?</h4>
      <ul className='helping' >
        <li className='text-xl' >help1</li>
        <li className='text-xl' >help2</li>
        <li className='text-xl' >help3</li>
        <li className='text-xl' >help4</li>
      </ul>
      </div>
    </div>
  )
}

export default LandingResponsive

