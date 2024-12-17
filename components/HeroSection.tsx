import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarIcon, UserGroupIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'

const slides = [
  {
    image: '/gallery/luxury-car-1.jpg',
    alt: 'Luxury Car Detailing'
  },
  {
    image: '/gallery/luxury-car-2.jpg',
    alt: 'Professional Car Care'
  },
  {
    image: '/gallery/luxury-car-3.jpg',
    alt: 'Premium Detailing Service'
  },
  {
    image: '/gallery/luxury-car-4.jpg',
    alt: 'Exotic Car Detailing'
  },
  {
    image: '/gallery/luxury-car-5.jpg',
    alt: 'Luxury Vehicle Care'
  },
  {
    image: '/gallery/IMG_05F3E572020C-1.png',
    alt: 'Luxury Car Detailing'
  },
  {
    image: '/gallery/IMG_2434525969D0-1.png',
    alt: 'Professional Car Care'
  },
  {
    image: '/gallery/IMG_3EB58DD25C6A-1.png',
    alt: 'Premium Detailing Service'
  },
  {
    image: '/gallery/IMG_42E09B7AE097-1.png',
    alt: 'Exotic Car Detailing'
  },
  {
    image: '/gallery/IMG_4E7600CC6150-1.png',
    alt: 'Luxury Vehicle Care'
  },
  {
    image: '/gallery/IMG_4E91089CEAA6-1.png',
    alt: 'Luxury Vehicle Care'
  },
  {
    image: '/gallery/IMG_6AB0D65EBCF4-1.png',
    alt: 'Luxury Vehicle Care'
  },
  {
    image: '/gallery/IMG_794DA37856DE-1.png',
    alt: 'Luxury Vehicle Care'
  },
  {
    image: '/gallery/IMG_9FBB0810130B-1.png',
    alt: 'Luxury Vehicle Care'
  },
  {
    image: '/gallery/IMG_B53794057176-1.png',
    alt: 'Luxury Vehicle Care'
  },
  {
    image: '/gallery/IMG_DAD1619AE95C-1.png',
    alt: 'Luxury Vehicle Care'
  },
  {
    image: '/gallery/IMG_DB094C056616-1.png',
    alt: 'Luxury Vehicle Care'
  }
]

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

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isDragging) {
      const timer = setInterval(() => {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length)
          setIsTransitioning(false)
        }, 500)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isDragging])

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = x / rect.width
      const slideIndex = Math.min(
        Math.floor(percentage * slides.length),
        slides.length - 1
      )
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(slideIndex)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const handleProgressBarDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
      const percentage = x / rect.width
      const slideIndex = Math.min(
        Math.floor(percentage * slides.length),
        slides.length - 1
      )
      setCurrentSlide(slideIndex)
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-secondary">
      {/* Content Section */}
      <div className="relative w-full lg:absolute lg:left-0 lg:top-0 lg:w-[45%] min-h-screen z-[1]">
        <div className="h-full flex flex-col justify-center px-4 sm:px-6 lg:px-12 pt-20 sm:pt-20 lg:pt-20 pb-20 lg:pb-0 bg-secondary/90 lg:bg-transparent">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto lg:mx-0"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Experience Luxury Car Detailing
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Discover the epitome of elegance and professionalism with Exotic Detailing.
              Transform your vehicle into a masterpiece of luxury.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 gap-6 mb-12">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="flex items-center space-x-4">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="text-white font-semibold tracking-wider">{feature.title}</span>
                  </div>
                )
              })}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 text-center flex items-center justify-center space-x-2"
              >
                <span>CONTACT US</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#services"
                className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 text-center"
              >
                LEARN MORE
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="relative lg:absolute lg:right-0 lg:top-0 w-full lg:w-[65%] h-[400px] lg:h-screen">
        <div className="relative h-full w-full overflow-hidden">
          <div className="flex lg:block w-full h-full">
            {slides.map((slide, index) => {
              const isNext = (currentSlide + 1) % slides.length === index
              const isPrev = (currentSlide - 1 + slides.length) % slides.length === index
              const isCurrent = currentSlide === index

              return (
                <motion.div
                  key={slide.image}
                  className={`relative w-full h-full flex-shrink-0 lg:block ${
                    isCurrent || isNext || isPrev ? 'block' : 'hidden'
                  } ${isCurrent ? 'z-20' : isNext ? 'z-10' : 'z-0'}`}
                  initial={{ 
                    opacity: 0, 
                    x: isNext ? '100%' : isPrev ? '-100%' : '0%',
                    scale: 1
                  }}
                  animate={{ 
                    opacity: isCurrent ? 1 : isNext ? 0.75 : 0,
                    scale: isCurrent ? 1 : 0.95,
                    x: isCurrent 
                      ? '0%' 
                      : isNext 
                        ? 'calc(100% + 1.5rem)' 
                        : 'calc(-100% - 1.5rem)',
                    zIndex: isCurrent ? 20 : isNext ? 10 : 0
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '1rem',
                    overflow: 'hidden'
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className={`object-cover object-center transition-all duration-500 ${
                      isCurrent ? 'opacity-100 scale-100' : isNext ? 'opacity-75 scale-105' : 'opacity-0 scale-95'
                    }`}
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    quality={90}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r from-secondary via-secondary/50 to-transparent transition-opacity duration-500 ${
                    isCurrent ? 'lg:opacity-100 opacity-50' : isNext ? 'opacity-60' : 'opacity-75'
                  }`} />
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="lg:hidden absolute inset-x-0 bottom-20 flex justify-between items-center px-6 z-30">
            <button
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true)
                  setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
                  setTimeout(() => setIsTransitioning(false), 500)
                }
              }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 -translate-x-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true)
                  setCurrentSlide((prev) => (prev + 1) % slides.length)
                  setTimeout(() => setIsTransitioning(false), 500)
                }
              }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 translate-x-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 lg:left-12 transform lg:transform-none -translate-x-1/2 lg:translate-x-0 z-30">
        <div 
          ref={progressBarRef}
          className="relative w-32 h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer"
          onClick={handleProgressBarClick}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleProgressBarDrag}
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </section>
  )
} 