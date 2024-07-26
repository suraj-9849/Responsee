import React, { useState } from 'react';
import Logo from '../assets/Images/Repsonsee-Logo.png';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='w-full h-[13vh] flex items-center text-white justify-between px-4 lg:px-20 '>
      <div className='logo'>
        <img className='sm:w-16 sm:h-16 cursor-pointer hover:scale-95 transition-transform w-10 h-10 ' src={Logo} alt="Repsonsee Logo" />
      </div>
      <div className='hidden lg:flex items-center gap-10'>
        <ul className='flex items-center max-w-screen-2xl gap-10'>
          <li className='cursor-pointer sm:text-xl hover:scale-95 transition-transform'>Home</li>
          <li className='cursor-pointer sm:text-xl hover:scale-95 transition-transform'>Make Responsive</li>
          <li className='cursor-pointer sm:text-xl hover:scale-95 transition-transform'>AI Website Builder</li>
          <li className='cursor-pointer sm:text-xl hover:scale-95 transition-transform'>Host your Express App!</li>
        </ul>
      </div>
      <div className='hidden lg:flex gap-10'>
        <button className='hover:scale-95 sm:text-xl transition-transform'>Sign In</button>
        <button className='px-4 py-1 bg-purple-500 sm:text-xl hover:bg-purple-700 hover:scale-95 transition-transform rounded-full'>Sign Out</button>
      </div>
      <div className='lg:hidden flex  items-center'>
        <button onClick={toggleMenu} aria-label="Toggle Menu" className='text-2xl text-white'>
          {isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </button>
      </div>
      {isOpen && (
        <div className='lg:hidden absolute top-0 left-0 w-full h-screen bg-green-500 z-10 text-black flex flex-col items-center justify-center'>
          <ul className='flex flex-col items-center gap-10'>
            <li className='cursor-pointer hover:scale-95 transition-transform' onClick={toggleMenu}>Home</li>
            <li className='cursor-pointer hover:scale-95 transition-transform' onClick={toggleMenu}>Make Responsive</li>
            <li className='cursor-pointer hover:scale-95 transition-transform' onClick={toggleMenu}>AI Website Builder</li>
            <li className='cursor-pointer hover:scale-95 transition-transform' onClick={toggleMenu}>Host your Express App!</li>
          </ul>
          <div className='flex flex-col gap-4 mt-10'>
            <button className='hover:scale-95 transition-transform' onClick={toggleMenu}>Sign In</button>
            <button className='px-4 py-1 bg-purple-500 hover:bg-purple-700 hover:scale-95 transition-transform rounded-full' onClick={toggleMenu}>Sign Out</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
