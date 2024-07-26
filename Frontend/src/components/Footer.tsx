import React from 'react'

function Footer() {
    return (
        <div className='pt-10 pb-10 h-[60vh] w-full text-white max-w-screen-xl mx-auto flex justify-around text-xl items-center gap-32 '>
            <div className='flex flex-col gap-20 justify-center '>
                <h1 className='sm:text-7xl text-white font-bold select-none'>Responsee.</h1>
                <div>
                    {['Primart Policy', "Cookie Policy", "Impressum", "Terms"].map((e, index) => (<a href='#' className='text-xl capitalize mr-10 opacity-50 text-zinc-100 ' key={index}>{e}</a>))}
                </div>
            </div>
            <div className='sm:flex gap-14 hidden '>
            <div >
                <h1 className='mb-12 opacity-55'>Socials</h1>
                <div className='flex gap-4 flex-col items-start justify-center '>
                    {['Facebook', 'Instagram', 'Twitter','GitHub'].map((e, index) => (<a href='#' className='text-xl capitalize mr-10 opacity-50 text-zinc-100 ' key={index}>{e}</a>))}
                </div>
            </div>
            <div>
                <h1 className='mb-12 opacity-55 '>SiteMap</h1>
                <div className='flex gap-4 flex-col'>
                    {['Home', 'About', 'FeedBack',"Contact"].map((e, index) => (<a href='#' className='text-xl capitalize mr-10 opacity-50 text-zinc-100 ' key={index}>{e}</a>))}
                </div>
            </div>
            <div className='flex text-white items-end gap-4 flex-col justify-center  '>
                <h1 className='w-3/4 text-end'>
                 This was Officially developed by Suraj and SathyaNarayana
                </h1>
                <button className='px-3 py-2 bg-violet-600 text-white'>Expertise Partner</button>
            </div>
            </div>
            
        </div>
    )
}

export default Footer
