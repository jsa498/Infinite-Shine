import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PhoneIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const name = formData.get('user_name')
    const contact = formData.get('user_contact')
    const message = formData.get('message')

    // Format the message for SMS/messaging apps
    const formattedMessage = encodeURIComponent(
      `🚗 New Inquiry from Website\n\n` +
      `From: ${name}\n` +
      `Contact: ${contact}\n\n` +
      `Message:\n${message}\n\n` +
      `Sent from: Infinite Shine Website`
    )

    // Open the message in the default messaging app
    window.location.href = `sms:+16047258010?body=${formattedMessage}`
    
    // Reset form
    if (formRef.current) {
      formRef.current.reset()
    }
    setSubmitStatus('success')
  }

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
          <h2 className="text-3xl font-bold text-white mb-3">Contact <span className="text-primary-light">Us</span></h2>
          <p className="text-base text-gray-300">
            Experience our state-of-the-art facility where your car receives the infinite shine treatment.
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
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-secondary-light/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-glow">
                  <ClockIcon className="h-5 w-5 text-primary-light flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-base">AVAILABLE 24/7</p>
                    <p className="text-gray-300 text-sm">Always ready to serve you</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-secondary-light/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-glow">
                  <PhoneIcon className="h-5 w-5 text-primary-light flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-base">Contact Number</p>
                    <a href="tel:+16047258010" className="text-gray-300 text-sm hover:text-primary-light transition-all duration-300">
                      +1 (604) 725-8010
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-6">Have any questions?</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className="w-full px-3 py-2 bg-secondary-light/50 border border-primary/20 rounded-lg focus:outline-none focus:border-primary-light text-white placeholder-gray-400 text-sm shadow-glow"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="user_contact"
                    placeholder="Preferred Contact Number or Email"
                    required
                    className="w-full px-3 py-2 bg-secondary-light/50 border border-primary/20 rounded-lg focus:outline-none focus:border-primary-light text-white placeholder-gray-400 text-sm shadow-glow"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Your Message"
                    required
                    className="w-full px-3 py-2 bg-secondary-light/50 border border-primary/20 rounded-lg focus:outline-none focus:border-primary-light text-white placeholder-gray-400 resize-none text-sm shadow-glow"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary hover:bg-primary-light text-white font-semibold py-2.5 rounded-lg transition-all duration-300 text-sm flex items-center justify-center shadow-glow hover:shadow-glow-lg ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <p className="text-green-500 text-sm text-center mt-2">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </form>
            </div>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83545.28821581086!2d-122.79036792510357!3d49.128618480897046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e960b640bd79265%3A0xa5fc3774081dad2e!2sInfinite%20Shine%20Exotics%20Car%20Detailing!5e0!3m2!1sen!2sca!4v1736125950601!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 