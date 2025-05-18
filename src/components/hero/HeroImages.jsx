"use client"
import React from 'react'
import Image from 'next/image'

function HeroImages() {
  return (    
    <div className="relative w-full h-full animate-fade-in-up flex items-start justify-center lg:justify-end lg:gap-8">
    {/* Main Image */}
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border-4 border-white lg:w-80 lg:h-80 xl:w-[450px] xl:h-[450px]">
        <Image
          src="/images/blog/blog-01.jpg"
          alt="Main Hero"
          fill
          className="object-cover"
        />
      </div>

      {/* Overlay Decorative Image */}
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px] rounded-lg overflow-hidden shadow-xl border-4 border-white transform -translate-x-20 translate-y-8 lg:translate-y-0 lg:-translate-x-5 xl:-translate-x-28 xl:translate-y-24">
        <Image
          src="/images/blog/blog-02.jpg"
          alt="Overlay"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default HeroImages