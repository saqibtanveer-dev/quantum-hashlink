"use client"
import React from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../Common/SectionTitle'

function Testimonial() {
  return (
    <section
      className='py-16'
    >
    <SectionTitle
        title="What Other Say"
        paragraph="Don't take our words, take their's"
        center
        mb='30px'
     />
    <div style={{ perspective: "1000px" }} className="flex justify-center gap-8 px-4 lg:px-12 text-gray-200">
      {/* Left Card - Tilted Left */}
      <motion.div
        className="h-96 w-80 p-4 shadow-md bg-pink-500 rounded-xl"
        initial={{ rotateY: 40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        scale={1.05}
      > 
      <div className='absolute w-full h-full top-0 left-0 rounded-xl bg-gradient-to-r from-transparent to-gray-800 opacity-25'/>
      <img src="/images/testimonials/auth-02.png" alt="img" className="w-16 rounded-full mb-4 shadow-md" />
      <h3 className="text-xl font-semibold">John Doe</h3>
      <p className="text-xs">CTO Filra</p>
      <p className="mt-4">As artificial intelligence is getting better with each passing day, it is supercharging audio deepfakes and causing robocall scams, financial f</p>
      </motion.div>

      {/* Center Card - Facing Forward */}
      <motion.div
        className="h-96 w-96 shadow-gray-500 shadow-lg bg-pink-500 rounded-xl p-4"
        initial={{ rotateY: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img src="/images/testimonials/auth-02.png" alt="img" className="w-16 rounded-full mb-4 shadow-md" />
      <h3 className="text-xl font-semibold">Kelvin</h3>
      <p className="text-sm">CEO Filra</p>
      <p className="mt-4">As artificial intelligence is getting better with each passing day, it is supercharging audio deepfakes and causing robocall scams, financial f</p>
      </motion.div>

      {/* Right Card - Tilted Right */}
      <motion.div
        className="h-96 w-80 shadow-md bg-pink-500 rounded-xl p-4"
        initial={{ rotateY: -40 }}
        transition=
        {{ duration: 0.5, ease: "easeOut" }}
        scale={1.05}
      >
        
      <div className='absolute w-full h-full top-0 left-0 rounded-xl bg-gradient-to-l from-transparent to-gray-800 opacity-25'/>
        <img src="/images/testimonials/auth-02.png" alt="img" className="w-16 rounded-full mb-4 shadow-md" />
      <h3 className="text-xl font-semibold">Peter</h3>
      <p className="text-sm">HR Filra</p>
      <p className="mt-4">As artificial intelligence is getting better with each passing day, it is supercharging audio deepfakes and causing robocall scams, financial frauds, voice cloning, and more</p>
      </motion.div>
    </div>
    </section>
  )
}

export default Testimonial
// style="width: 330px; transition-duration: 0ms; transform: translate3d(0px, 0px, -106.061px) rotateX(0deg) rotateY(53.0303deg) scale(1); z-index: 0; margin-right: 20px;"
// style="width: 330px; transition-duration: 0ms; transform: translate3d(0px, 0px, -106.061px) rotateX(0deg) rotateY(53.0303deg) scale(1); z-index: 0; margin-right: 20px;"