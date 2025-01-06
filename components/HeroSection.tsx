import React from 'react'
import { motion } from 'framer-motion'
import { StarIcon, UserGroupIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'

const features = [
  {
    icon: StarIcon,
    title: 'PREMIUM QUALITY',
  },
  {
    icon: UserGroupIcon,
    title: 'PROFESSIONAL SERVICE',
  },
  {
    icon: HandThumbUpIcon,
    title: 'CUSTOMER SATISFACTION',
  }
]

// Enhanced shine animations
const textShine = {
  initial: { 
    backgroundPosition: '-200% center',
    opacity: 0.9
  },
  animate: {
    backgroundPosition: '200% center',
    opacity: 1,
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity,
      opacity: {
        duration: 2,
        yoyo: Infinity,
        ease: 'easeInOut',
      }
    }
  }
}

const glowPulse = {
  initial: { 
    textShadow: '0 0 7px rgba(187, 134, 252, 0)',
    scale: 1
  },
  animate: {
    textShadow: [
      '0 0 7px rgba(187, 134, 252, 0)',
      '0 0 10px rgba(187, 134, 252, 0.3)',
      '0 0 21px rgba(187, 134, 252, 0.5)',
      '0 0 42px rgba(187, 134, 252, 0.4)',
      '0 0 82px rgba(187, 134, 252, 0.2)',
      '0 0 92px rgba(187, 134, 252, 0.1)',
      '0 0 7px rgba(187, 134, 252, 0)',
    ],
    scale: [1, 1.01, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-secondary">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full md:object-right"
          style={{ filter: 'brightness(0.7)' }}
        >
          <source src="/gallery/infi.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent lg:via-secondary/60 lg:to-transparent" />
      </div>

      {/* Content Section */}
      <div className="relative w-full lg:w-[50%] min-h-screen z-[1]">
        <div className="h-full flex flex-col justify-center px-6 sm:px-8 lg:px-16 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-[1.1]">
              Infinite{' '}
              <motion.span
                initial="initial"
                animate="animate"
                variants={glowPulse}
                className="relative inline-block"
              >
                <motion.span
                  initial="initial"
                  animate="animate"
                  variants={textShine}
                  className="text-transparent bg-clip-text relative z-10"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #9C27B0, #BB86FC, #BB86FC, #9C27B0)',
                    backgroundSize: '200% auto',
                  }}
                >
                  Shine
                </motion.span>
                <motion.div
                  className="absolute -inset-1 bg-primary/20 rounded-lg blur-lg z-0"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </motion.span>{' '}
              <br className="hidden md:block" /> Exotics
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed">
              Experience the pinnacle of automotive perfection. Where every detail shines infinitely.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={feature.title} 
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-secondary-light/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-glow group"
                  >
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-light group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white font-semibold tracking-wider text-base sm:text-lg">{feature.title}</span>
                  </div>
                )
              })}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <a 
                href="#contact"
                className="bg-primary hover:bg-primary-light text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 text-center flex items-center justify-center space-x-2 shadow-glow hover:shadow-glow-lg"
              >
                <span>CONTACT US</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#services"
                className="border-2 border-primary-light text-white hover:bg-primary-light hover:border-primary-light px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 text-center shadow-glow hover:shadow-glow-lg"
              >
                LEARN MORE
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 