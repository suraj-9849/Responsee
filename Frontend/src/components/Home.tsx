import React from 'react';
import Navbar from './Navbar'
import LocomotiveScroll from 'locomotive-scroll';
import HomeHero from './HomeHero';
import LandingResponsive from './LandingResponsive';
import Footer from './Footer';

function Home() {
    
const locomotiveScroll = new LocomotiveScroll();
  return (
      <div className="w-full h-full bg-black " >
      <Navbar/>
      <HomeHero/>
      <LandingResponsive/>
      <Footer/>
    </div>
  )
}

export default Home
