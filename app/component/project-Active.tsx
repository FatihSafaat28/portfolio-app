import React from 'react'

export default function ProjectActive() {
  return (
    <div id='container' className='flex flex-col h-full w-full p-4 gap-2'>
        <div id='title' className='flex items-center justify-center text-white text-xl font-bold'>
            Project 1
        </div>
        <div 
          id='image' 
          className='flex-1 flex items-center justify-center bg-slate-700 rounded-lg overflow-hidden bg-cover bg-center'
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80)'
          }}
        >
        </div>
        <div id='info' className='flex flex-col justify-start gap-1'>
            <div id='tech' className='flex items-start justify-start text-slate-300 text-sm'>
                UI
            </div>
            <div id='description' className='flex items-start justify-start text-start text-slate-400 text-xs'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, velit debitis quos est modi corporis reprehenderit provident perspiciatis doloremque ipsa, repudiandae voluptates eos nisi corrupti dolorem nam eaque asperiores molestias.
            </div>
            <div id='link' className='flex items-start justify-start text-blue-400 text-xs'>
                Link
            </div>
        </div>
    </div>
  )
}
