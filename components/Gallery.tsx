import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// Placeholder images - replace with actual image paths later
const images = [
  { src: '/gallery/luxury-car-1.jpg', alt: 'Luxury Car Detail 1' },
  { src: '/gallery/luxury-car-2.jpg', alt: 'Luxury Car Detail 2' },
  { src: '/gallery/luxury-car-3.jpg', alt: 'Luxury Car Detail 3' },
  { src: '/gallery/luxury-car-4.jpg', alt: 'Luxury Car Detail 4' },
  { src: '/gallery/luxury-car-5.jpg', alt: 'Luxury Car Detail 5' },
  { src: '/gallery/IMG_DB094C056616-1.png', alt: 'Luxury Car Detail 6' },
  { src: '/gallery/IMG_DAD1619AE95C-1.png', alt: 'Luxury Car Detail 7' },
  { src: '/gallery/IMG_B53794057176-1.png', alt: 'Luxury Car Detail 8' },
  { src: '/gallery/IMG_2434525969D0-1.png', alt: 'Luxury Car Detail 9' },
  { src: '/gallery/IMG_794DA37856DE-1.png', alt: 'Luxury Car Detail 10' },
  { src: '/gallery/IMG_42E09B7AE097-1.png', alt: 'Luxury Car Detail 11' },
  { src: '/gallery/IMG_9FBB0810130B-1.png', alt: 'Luxury Car Detail 12' },
  { src: '/gallery/IMG_6AB0D65EBCF4-1.png', alt: 'Luxury Car Detail 13' },
  { src: '/gallery/IMG_05F3E572020C-1.png', alt: 'Luxury Car Detail 14' },
  { src: '/gallery/IMG_4E91089CEAA6-1.png', alt: 'Luxury Car Detail 15' },
  { src: '/gallery/IMG_4E7600CC6150-1.png', alt: 'Luxury Car Detail 16' },
  { src: '/gallery/IMG_3EB58DD25C6A-1.png', alt: 'Luxury Car Detail 17' },
]

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length)
  }

  return (
    <section className="relative h-screen bg-secondary overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="absolute w-full h-full"
          >
            <div 
              className="w-full h-full bg-center bg-cover bg-no-repeat"
              style={{ 
                backgroundImage: `url(${images[currentIndex].src})`,
                filter: 'brightness(0.7)'
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          onClick={() => paginate(-1)}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>
        <button
          className="absolute right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          onClick={() => paginate(1)}
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-white/50'
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 