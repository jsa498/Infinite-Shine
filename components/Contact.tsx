import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPinIcon, PhoneIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="py-16 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-3">Visit Our Luxurious Location</h2>
          <p className="text-base text-gray-300">
            Explore our state-of-the-art facility where your car receives the royal treatment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 lg:sticky lg:top-24"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Hours of Operation</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ClockIcon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-base">AVAILABLE 24/7</p>
                    <p className="text-gray-300 text-sm">Always ready to serve you</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-base">Our Address</p>
                    <p className="text-gray-300 text-sm">373 Fenton Street</p>
                    <p className="text-gray-300 text-sm">New Westminster, V3M5J1</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <PhoneIcon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-base">Contact Number</p>
                    <a href="tel:+16047258010" className="text-gray-300 text-sm hover:text-primary transition-all duration-300">
                      +1 (604) 725-8010
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-4 mt-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-400 text-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-400 text-sm"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-400 resize-none text-sm"
                />
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 text-sm">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[400px] lg:h-[500px] rounded-xl overflow-hidden bg-white/5 p-3"
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <div className="absolute top-3 left-3 z-10 bg-secondary/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs">
                Use ⌘ + scroll to zoom the map
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex flex-col space-y-2">
                <button className="bg-secondary/90 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white/20 transition-all duration-300 text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button className="bg-secondary/90 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white/20 transition-all duration-300 text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83435.3436943006!2d-123.08258056640624!3d49.193834452334684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d96d1ddc9db9%3A0xd58598c5e4700c81!2sExotic%20Auto%20Detailing!5e0!3m2!1sen!2sca!4v1734147729111!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 