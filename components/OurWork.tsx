import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

// Temporary placeholder data
const categories = [
  {
    id: 'paint-exterior',
    title: 'Paint & Exterior',
    description: 'Ceramic coating, scratch removal, and paint correction',
    items: [
      {
        id: 1,
        title: 'Ceramic Coating',
        before: {
          src: '/gallery/ceramic.mp4',
          type: 'video'
        },
        after: {
          src: '/gallery/ceramic.mp4',
          type: 'video'
        }
      },
      {
        id: 2,
        title: 'Paint Correction',
        before: {
          src: '/gallery/scratchbefore.mp4',
          type: 'video'
        },
        after: {
          src: '/gallery/scratchafter.mp4',
          type: 'video'
        }
      },
    ]
  },
  {
    id: 'interior',
    title: 'Interior Detailing',
    description: 'Seat cleaning, stain removal, and interior restoration',
    items: [
      {
        id: 3,
        title: 'Interior Deep Clean',
        before: {
          src: '/gallery/interiorbefore.mp4',
          type: 'video'
        },
        after: {
          src: '/gallery/interiorafter.jpg',
          type: 'image'
        }
      },
      {
        id: 4,
        title: 'Seat Restoration',
        before: {
          src: '/gallery/seatbefore.jpg',
          type: 'image'
        },
        after: {
          src: '/gallery/seatafter.jpg',
          type: 'image'
        }
      },
    ]
  },
  {
    id: 'special',
    title: 'Special Services',
    description: 'Window tinting, headlight restoration, and more',
    items: [
      {
        id: 5,
        title: 'Headlight Restoration',
        before: {
          src: '/gallery/headbefore.jpg',
          type: 'image'
        },
        after: {
          src: '/gallery/headafter.jpg',
          type: 'image'
        }
      },
      {
        id: 6,
        title: 'Window Tinting',
        before: {
          src: '/gallery/tintbefore.jpg',
          type: 'image'
        },
        after: {
          src: '/gallery/tintafter.jpg',
          type: 'image'
        }
      },
    ]
  }
]

interface MediaProps {
  title: string
  before: {
    src: string
    type: 'image' | 'video'
  }
  after: {
    src: string
    type: 'image' | 'video'
  }
}

const BeforeAfterMedia = ({ title, before, after }: MediaProps) => {
  const [showAfter, setShowAfter] = useState(false)
  const [isSwiping, setIsSwiping] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
    setIsSwiping(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return
    
    const currentX = e.touches[0].clientX
    const diff = touchStart - currentX

    if (Math.abs(diff) > 50) {
      setShowAfter(diff > 0)
    }
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)
  }

  const renderMedia = (media: { src: string, type: 'image' | 'video' }, alt: string) => {
    if (media.type === 'video') {
      return (
        <video
          src={media.src}
          className="object-contain w-full h-full"
          autoPlay
          loop
          muted
          playsInline
        />
      )
    }
    return (
      <Image
        src={media.src}
        alt={`${title} ${alt}`}
        fill
        className="object-contain"
      />
    )
  }

  return (
    <div className="relative rounded-xl overflow-hidden group cursor-pointer h-[400px] lg:h-[500px]"
         onClick={() => setShowAfter(!showAfter)}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}>
      <motion.div
        initial={false}
        animate={{ rotateY: showAfter ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full bg-gray-900 preserve-3d"
      >
        <div className={`absolute inset-0 backface-hidden ${showAfter ? 'invisible' : 'visible'}`}>
          {renderMedia(before, 'Before')}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors">
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Click to see After
            </div>
          </div>
        </div>
        <div className={`absolute inset-0 backface-hidden rotate-y-180 ${showAfter ? 'visible' : 'invisible'}`}>
          {renderMedia(after, 'After')}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors">
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Click to see Before
            </div>
          </div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-semibold">{title}</h3>
        <div className="text-white/80 text-sm">
          Viewing: {showAfter ? 'After' : 'Before'}
        </div>
      </div>
    </div>
  )
}

export default function OurWork() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  return (
    <section id="our-work" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Work</h2>
          <p className="text-lg text-gray-300">
            Explore our portfolio of premium detailing transformations
          </p>
        </motion.div>

        <div className="space-y-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedCategory(
                  expandedCategory === category.id ? null : category.id
                )}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/10 transition-colors"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  <p className="text-gray-400 mt-1">{category.description}</p>
                </div>
                <ChevronDownIcon 
                  className={`w-6 h-6 text-white transition-transform ${
                    expandedCategory === category.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedCategory === category.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                      {category.items.map((item) => (
                        <BeforeAfterMedia
                          key={item.id}
                          title={item.title}
                          before={item.before}
                          after={item.after}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 