import React from 'react'

export default function ProjectNotActive() {
  return (
    <div className='relative w-full h-full overflow-hidden rounded-3xl'>
        {/* Background Image */}
        <div 
          id='bg-img' 
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80)',
          }}
        >
          {/* Dark overlay for better text visibility */}
          <div className='absolute inset-0 bg-black/80'></div>
        </div>
        
        {/* Content */}
        <div className='relative z-10 w-full h-full flex flex-col items-center justify-between gap-4 p-4'>
          <div 
            id='title' 
            className='text-white text-2xl font-bold tracking-wider'
            style={{ writingMode: 'vertical-rl' }}
          >
            Project 1
          </div>
          <div 
            id='tech' 
            className='text-slate-300 text-lg font-medium'
          >
            UI
          </div>
        </div>
    </div>
  )
}
