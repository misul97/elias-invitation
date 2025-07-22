"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function AnimatedInvitation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const [audioPlayed, setAudioPlayed] = useState(false)

  useEffect(() => {
    // Auto-open after 2 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        handleOpenEnvelope()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [isOpen])

  const handleOpenEnvelope = () => {
    setIsOpen(true)

    // Show invitation after envelope opens
    setTimeout(() => {
      setShowInvitation(true)
      playMusic()
    }, 800)
  }

  const playMusic = () => {
    if (!audioPlayed) {
      const audio = new Audio("/birthday-music.mp3")
      audio.volume = 0.3
      audio.loop = true
      audio.play().catch((e) => console.log("Audio play failed:", e))
      setAudioPlayed(true)
    }
  }

  const handleClick = () => {
    if (!isOpen) {
      handleOpenEnvelope()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-md mx-auto">
        {/* Envelope */}
        <motion.div
          className="relative cursor-pointer"
          onClick={handleClick}
          whileHover={!isOpen ? { scale: 1.02 } : {}}
          whileTap={!isOpen ? { scale: 0.98 } : {}}
        >
          {/* Envelope Back */}
          <div className="relative w-80 h-56 mx-auto">
            <div
              className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-lg"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.1) 0%, transparent 50%),
                  linear-gradient(45deg, rgba(222, 184, 135, 0.3) 25%, transparent 25%),
                  linear-gradient(-45deg, rgba(222, 184, 135, 0.3) 25%, transparent 25%)
                `,
                backgroundSize: "20px 20px, 20px 20px, 40px 40px, 40px 40px",
              }}
            />

            {/* Envelope Flap */}
            <motion.div
              className="absolute top-0 left-0 w-full h-32 origin-top"
              style={{
                background: "linear-gradient(135deg, #f3e5ab 0%, #e6d690 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backgroundImage: `
                  radial-gradient(circle at 30% 30%, rgba(139, 69, 19, 0.15) 0%, transparent 60%),
                  linear-gradient(45deg, rgba(222, 184, 135, 0.2) 25%, transparent 25%)
                `,
                backgroundSize: "15px 15px, 30px 30px",
              }}
              animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2,
              }}
            />

            {/* Envelope Seal */}
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-md flex items-center justify-center"
              animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-3 h-3 bg-green-200 rounded-full" />
            </motion.div>
          </div>

          {/* Click hint */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-green-700 text-sm font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 1 }}
              >
                Toca para abrir / Click to open
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Invitation */}
        <AnimatePresence>
          {showInvitation && (
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 z-10"
              initial={{ y: 100, opacity: 0, scale: 0.8 }}
              animate={{ y: -120, opacity: 1, scale: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2,
              }}
            >
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <Image
                  src="/invitation.png"
                  alt="Invitación de cumpleaños de Elias"
                  width={400}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Sparkle effects */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-300 rounded-full opacity-60"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
