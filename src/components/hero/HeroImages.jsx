"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

function HeroImages() {
  return (    
    <motion.div 
        
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
    >
    <Image
      src="/images/blog/blog-01.jpg"
      alt="Main Hero"
      layout="fill"
      objectFit="cover"
      className="rounded-lg shadow-lg"
    />
    <Image
      src="/images/blog/blog-02.jpg"
      alt="Extra"
      layout="fill"
      objectFit="cover"
      className="absolute bottom-0 left-0 w-24 h-24 rounded-lg shadow-md transform -translate-x-20 translate-y-8"
    />
  </motion.div>
  )
}

export default HeroImages