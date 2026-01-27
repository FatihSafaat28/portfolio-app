import Link from 'next/link'
import React from 'react'
interface project {
  tittle : string
  image : string
  fullTech : string
  description : string
  link : string
}
export default function ProjectActive({
  tittle,
  image,
  fullTech,
  description,
  link
}: project) {
  return (
    <div id='container' className='flex flex-col h-full w-full p-4 gap-2'>
        <div id='title' className='flex items-center justify-center text-white text-xl font-bold'>
            {tittle}
        </div>
        <div 
          id='image' 
          className='flex-1 flex items-center justify-center bg-slate-700 rounded-lg overflow-hidden bg-cover bg-center'
          style={{
            backgroundImage: image ? `url(${image})` : 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80)'
          }}
        >
        </div>
        <div id='info' className='flex flex-col justify-start gap-1'>
            <div id='fullTech' className='flex items-start justify-start text-slate-300 text-sm'>
                {fullTech}
            </div>
            <div id='description' className='flex items-start justify-start text-start text-slate-400 text-xs'>
                {description}
            </div>
            <Link href={link}>
            <div id='link' className='flex items-start justify-start text-blue-400 text-xs hover:text-blue-300 cursor-pointer transition-colors'>
                View Project →
            </div>
            </Link>
        </div>
    </div>
  )
}
