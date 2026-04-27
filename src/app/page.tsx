'use client'

import React, { useState, useEffect, useCallback, useRef, type CSSProperties, type TouchEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ───────────────────────────────────────────────────────────────────
type Screen = 'opening' | 'message' | 'gallery' | 'memories' | 'final'

// ─── Data ────────────────────────────────────────────────────────────────────
const birthdayMessage = `Hey Rani... 💕

Aaj tera birthday hai, and I just want you to know ki you're really special. 💫

17 saal... wow! Time itna fast gaya yaar. It feels like kal hi ki baat hai jab pehli baar baat hui thi, and aaj tu 17 ki ho gayi.

You know what I love about you? Tera smile... wo smile jo dil khush kar de. Jab tu hasti hai na, lagta hai saari duniya roshan ho gayi. 🌸

I might not be there with you today physically, but believe me, tu mere dil mein hamesha hai. Har wo moment, har wo baat, har wo laugh... sab yaad hai mujhe.

Tum ek aisi ladki ho jaise khud ek sunshine ho. Positive, caring, and itni pyaari ki koi bhi tumse baat kare toh khush hi ho jaaye. ✨

I wish I could give you the biggest hug right now. I wish I could see that beautiful smile in person. Par jab tak wo din nahi aata, this is my small little surprise for you.

Happy 17th Birthday, Rani. 🎂

You deserve all the happiness in this world. Always keep smiling, always keep shining. Because when you smile, the whole world smiles with you.

And remember... you mean a lot to me. Hamesha. ❤️`

const galleryPhotos = [
  { id: 1, caption: 'My favorite person 💕', placeholder: 'Photo 1', src: '/R1.png' },
  { id: 2, caption: 'That beautiful smile ✨', placeholder: 'Photo 2', src: '/R2.png' },
  { id: 3, caption: 'Unforgettable moments 🌸', placeholder: 'Photo 3', src: '/R3.png' },
  { id: 4, caption: 'You light up everything 🌟', placeholder: 'Photo 4', src: '/R4.png' },
  { id: 5, caption: 'Always in my heart ❤️', placeholder: 'Photo 5', src: '/R5.png' },
  { id: 6, caption: 'All our sweetest memories 💖', placeholder: 'Photo 6', src: '/R6.png' },
]

const memoryPages = [
  {
    title: 'Page 1',
    message: 'Do you remember the first time we talked? That moment felt so natural, like I had known you forever. Some connections don\'t need time — they just click. And with you, everything just clicked. 💫'
  },
  {
    title: 'Page 2',
    message: 'There\'s something magical about the way you care for people. You never let anyone feel alone. That warmth you have — it\'s rare, Rani. Don\'t ever lose that. The world needs more people like you. 🌸'
  },
  {
    title: 'Page 3',
    message: 'Your laugh is my favorite sound in the whole world. Seriously. Even on my worst days, just hearing you laugh makes everything okay. You have that superpower — you make people happy without even trying. ✨'
  },
  {
    title: 'Page 4',
    message: 'Distance means nothing when someone means everything. I might be far, but you\'re always right here — in my thoughts, in my prayers, in my heart. Always. No matter what. ❤️'
  },
  {
    title: 'Page 5',
    message: 'On this special day, I just want to say — thank you for being you. Thank you for existing. Thank you for coming into my life. You make everything better just by being in it. 🎂'
  }
]

// ─── Floating Hearts Component ───────────────────────────────────────────────
function FloatingHearts({ count = 15 }: { count?: number }) {
  const hearts = ['❤️', '💕', '💖', '💗', '💝', '🩷']
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="floating-heart absolute"
          style={{
            left: `${Math.random() * 100}%`,
            '--duration': `${5 + Math.random() * 6}s`,
            '--delay': `${Math.random() * 8}s`,
            fontSize: `${14 + Math.random() * 20}px`,
          } as CSSProperties}
        >
          {hearts[i % hearts.length]}
        </div>
      ))}
    </div>
  )
}

// ─── Sparkles Component ──────────────────────────────────────────────────────
function Sparkles({ count = 20 }: { count?: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="sparkle absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            '--duration': `${2 + Math.random() * 3}s`,
            '--delay': `${Math.random() * 4}s`,
            fontSize: `${8 + Math.random() * 14}px`,
          } as CSSProperties}
        >
          ✦
        </div>
      ))}
    </div>
  )
}

// ─── Confetti Component ──────────────────────────────────────────────────────
function Confetti({ count = 30 }: { count?: number }) {
  const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#dda0dd', '#e6e6fa', '#ffd700', '#ff85a2', '#c9b1ff']
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="confetti absolute"
          style={{
            left: `${Math.random() * 100}%`,
            '--duration': `${3 + Math.random() * 4}s`,
            '--delay': `${Math.random() * 6}s`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            backgroundColor: colors[i % colors.length],
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          } as CSSProperties}
        />
      ))}
    </div>
  )
}

// ─── Music Toggle Button ─────────────────────────────────────────────────────
function MusicToggle({ isMuted, onToggle }: { isMuted: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm 
                 flex items-center justify-center text-lg shadow-lg border border-pink-200/50
                 hover:bg-white/50 active:scale-95 transition-all duration-200"
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? '🔇' : '🎵'}
    </button>
  )
}

// ─── Opening Screen ──────────────────────────────────────────────────────────
function OpeningScreen({ onStart }: { onStart: () => void; key?: string }) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fff0f5 0%, #fce4ec 25%, #f8bbd0 50%, #e8d5f5 75%, #f3e5f5 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingHearts count={12} />
      <Sparkles count={15} />

      {/* Teddy Bear */}
      <motion.div
        className="teddy-wiggle mb-6"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <img
          src="/teddy-bear.png"
          alt="Cute teddy bear holding a heart"
          className="w-52 h-52 sm:w-64 sm:h-64 object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center px-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h1
          className="text-4xl sm:text-5xl font-bold glow-text mb-2"
          style={{ color: '#e91e8c' }}
        >
          Happy Birthday
        </h1>
        <h2
          className="text-3xl sm:text-4xl font-bold mb-1"
          style={{ color: '#c2185b' }}
        >
          Rani ❤️
        </h2>
        <p className="text-lg sm:text-xl mt-2" style={{ color: '#ad1457' }}>
          Turning 17 today! 🎂
        </p>
      </motion.div>

      {/* Tap to Start */}
      <motion.button
        onClick={onStart}
        className="mt-10 px-8 py-4 rounded-full text-white font-semibold text-lg
                   shadow-xl pulse-glow transition-all duration-300 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #e91e8c, #ff5ca8)',
          letterSpacing: '0.5px',
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ✨ Tap to Start ✨
      </motion.button>

      {/* Small hint */}
      <motion.p
        className="absolute bottom-8 text-sm opacity-50"
        style={{ color: '#ad1457' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      >
        Made with ❤️ just for you
      </motion.p>
    </motion.div>
  )
}

// ─── Message Screen ──────────────────────────────────────────────────────────
function MessageScreen({ onContinue }: { onContinue: () => void; key?: string }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingDone, setIsTypingDone] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let index = 0
    const speed = 30 // ms per character

    const timer = setInterval(() => {
      if (index < birthdayMessage.length) {
        setDisplayedText(birthdayMessage.slice(0, index + 1))
        index++
        // Auto scroll
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
      } else {
        clearInterval(timer)
        setIsTypingDone(true)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [])

  // Allow skip typing by tapping
  const handleSkip = useCallback(() => {
    if (!isTypingDone) {
      setDisplayedText(birthdayMessage)
      setIsTypingDone(true)
    }
  }, [isTypingDone])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #fff0f5 0%, #fce4ec 40%, #f8bbd0 100%)'
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <Sparkles count={10} />

      {/* Header */}
      <motion.div
        className="text-center pt-6 pb-3 px-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold" style={{ color: '#c2185b' }}>
          A Letter For You 💌
        </h2>
        <p className="text-xs mt-1 opacity-50" style={{ color: '#ad1457' }}>
          tap anywhere to skip typing
        </p>
      </motion.div>

      {/* Message area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 pb-4"
        onClick={handleSkip}
        style={{ scrollBehavior: 'smooth' }}
      >
        <div
          className={`text-base sm:text-lg leading-relaxed whitespace-pre-wrap ${!isTypingDone ? 'typing-cursor' : ''}`}
          style={{ color: '#5c2040' }}
        >
          {displayedText}
        </div>
      </div>

      {/* Continue button */}
      <AnimatePresence>
        {isTypingDone && (
          <motion.div
            className="px-6 pb-8 pt-3"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={onContinue}
              className="w-full py-4 rounded-2xl text-white font-semibold text-lg shadow-lg
                         active:scale-95 transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #e91e8c, #ff5ca8)',
              }}
            >
              See Your Memories 📸
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Gallery Screen ──────────────────────────────────────────────────────────
function GalleryScreen({ onContinue }: { onContinue: () => void; key?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < galleryPhotos.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const currentPhoto = galleryPhotos[currentIndex]

  return (
    <motion.div
      className="fixed inset-0 flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #f8bbd0 0%, #fce4ec 50%, #f3e5f5 100%)'
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <Sparkles count={8} />

      {/* Header */}
      <motion.div
        className="text-center pt-6 pb-3 px-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold" style={{ color: '#c2185b' }}>
          Your Gallery 📸
        </h2>
        <p className="text-xs mt-1 opacity-50" style={{ color: '#ad1457' }}>
          swipe left to see more
        </p>
      </motion.div>

      {/* Photo card */}
      <div
        className="flex-1 flex items-center justify-center px-5"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id}
            className="w-full max-w-sm"
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60"
              style={{ background: 'linear-gradient(135deg, #fff0f5, #fce4ec)' }}
            >
              {/* Photo placeholder */}
              <div
                className="w-full aspect-[3/4] flex flex-col items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #f8bbd0 0%, #e8d5f5 50%, #fce4ec 100%)'
                }}
              >
                {/* Placeholder for real photo - user can replace */}
                {currentPhoto.src ? (
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.caption}
                    className="w-full h-full object-cover"
                    style={{ minHeight: '280px' }}
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-3">📷</div>
                    <p className="text-sm font-medium px-4" style={{ color: '#ad1457' }}>
                      {currentPhoto.placeholder}
                    </p>
                    <p className="text-xs mt-1 opacity-50 px-4" style={{ color: '#c2185b' }}>
                      Replace with Rani&apos;s photo
                    </p>
                  </div>
                )}
                {/* Decorative elements */}
                <div className="absolute top-3 right-3 text-2xl twinkle" style={{ '--duration': '2s', '--delay': '0s' } as CSSProperties}>✦</div>
                <div className="absolute bottom-3 left-3 text-2xl twinkle" style={{ '--duration': '3s', '--delay': '1s' } as CSSProperties}>✦</div>
              </div>

              {/* Caption */}
              <div className="p-4 text-center">
                <p className="text-lg font-semibold" style={{ color: '#c2185b' }}>
                  {currentPhoto.caption}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 py-3">
        {galleryPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'scale-125 shadow-md'
                : 'opacity-40'
            }`}
            style={{
              backgroundColor: i === currentIndex ? '#e91e8c' : '#f8bbd0',
            }}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint + Continue */}
      <div className="px-6 pb-6">
        {currentIndex < galleryPhotos.length - 1 ? (
          <motion.div
            className="text-center swipe-hint"
            style={{ color: '#ad1457' }}
          >
            <p className="text-sm">← Swipe for more →</p>
          </motion.div>
        ) : (
          <motion.button
            onClick={onContinue}
            className="w-full py-4 rounded-2xl text-white font-semibold text-lg shadow-lg
                       active:scale-95 transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #e91e8c, #ff5ca8)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Open Memory Book 📖
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// ─── Memory Book Screen ──────────────────────────────────────────────────────
function MemoryBookScreen({ onContinue }: { onContinue: () => void; key?: string }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)

  const minSwipeDistance = 50

  const goToPage = (page: number) => {
    if (isFlipping || page < 0 || page >= memoryPages.length) return
    setIsFlipping(true)
    setCurrentPage(page)
    setTimeout(() => setIsFlipping(false), 800)
  }

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) goToPage(currentPage + 1)
    else if (isRightSwipe) goToPage(currentPage - 1)
  }

  const page = memoryPages[currentPage]

  return (
    <motion.div
      className="fixed inset-0 flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #f3e5f5 0%, #fce4ec 50%, #fff0f5 100%)'
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingHearts count={6} />

      {/* Header */}
      <motion.div
        className="text-center pt-6 pb-3 px-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold" style={{ color: '#c2185b' }}>
          Our Memory Book 📖
        </h2>
        <p className="text-xs mt-1 opacity-50" style={{ color: '#ad1457' }}>
          swipe to flip pages
        </p>
      </motion.div>

      {/* Book page */}
      <div
        className="flex-1 flex items-center justify-center px-5"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="w-full max-w-sm"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ perspective: 1200 }}
          >
            <div
              className="rounded-2xl p-6 sm:p-8 shadow-2xl border border-pink-200/50 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fff9fb 0%, #fff0f5 50%, #fce4ec 100%)',
                minHeight: '320px',
              }}
            >
              {/* Book spine effect */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl"
                style={{ background: 'linear-gradient(180deg, #f8bbd0, #e91e8c, #f8bbd0)' }}
              />

              {/* Page number */}
              <div className="text-center mb-4">
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#fce4ec', color: '#c2185b' }}
                >
                  {page.title} · {currentPage + 1} / {memoryPages.length}
                </span>
              </div>

              {/* Decorative top */}
              <div className="text-center mb-4 text-2xl">🌸</div>

              {/* Message */}
              <p
                className="text-base sm:text-lg leading-relaxed text-center"
                style={{ color: '#5c2040' }}
              >
                {page.message}
              </p>

              {/* Decorative bottom */}
              <div className="text-center mt-4 text-2xl">🌸</div>

              {/* Corner decorations */}
              <div className="absolute top-3 right-3 text-xs twinkle" style={{ '--duration': '2s' } as CSSProperties}>✦</div>
              <div className="absolute bottom-3 left-5 text-xs twinkle" style={{ '--duration': '3s', '--delay': '1s' } as CSSProperties}>✦</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page indicator + Continue */}
      <div className="px-6 pb-6">
        {currentPage < memoryPages.length - 1 ? (
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {memoryPages.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentPage ? 'scale-125' : 'opacity-30'
                  }`}
                  style={{ backgroundColor: i === currentPage ? '#e91e8c' : '#f8bbd0' }}
                />
              ))}
            </div>
            <p className="text-sm swipe-hint" style={{ color: '#ad1457' }}>
              Swipe →
            </p>
          </div>
        ) : (
          <motion.button
            onClick={onContinue}
            className="w-full py-4 rounded-2xl text-white font-semibold text-lg shadow-lg
                       active:scale-95 transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #e91e8c, #ff5ca8)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            One Last Thing... 💝
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// ─── Final Screen ────────────────────────────────────────────────────────────
function FinalScreen() {
  const [showForeverButton, setShowForeverButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowForeverButton(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 25%, #e8d5f5 50%, #f3e5f5 75%, #fff0f5 100%)'
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingHearts count={20} />
      <Sparkles count={25} />
      <Confetti count={25} />

      {/* Birthday cake */}
      <motion.div
        className="mb-4"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <img
          src="/birthday-cake.png"
          alt="Birthday cake with 17 candles"
          className="w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Final message */}
      <motion.div
        className="text-center px-6 max-w-sm"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h1
          className="text-3xl sm:text-4xl font-bold mb-3 glow-text"
          style={{ color: '#c2185b' }}
        >
          Happy Birthday Rani ❤️
        </h1>
        <p
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: '#5c2040' }}
        >
          You mean a lot to me. I wish I could be there today, 
          but this is just a small surprise for you. 🎁
        </p>
      </motion.div>

      {/* Glowing heart */}
      <motion.div
        className="my-5 heartbeat"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      >
        <img
          src="/glowing-heart.png"
          alt="Glowing heart"
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Forever Smile button */}
      <AnimatePresence>
        {showForeverButton && (
          <motion.button
            className="px-8 py-4 rounded-full text-white font-semibold text-lg shadow-xl pulse-glow
                       active:scale-95 transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #e91e8c, #ff5ca8, #e91e8c)',
              backgroundSize: '200% 200%',
              animation: 'pulseGlow 2s infinite ease-in-out',
            }}
            initial={{ y: 40, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            onClick={() => {
              // Create a burst of hearts on click
              const container = document.createElement('div')
              container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:100;'
              document.body.appendChild(container)
              for (let i = 0; i < 20; i++) {
                const heart = document.createElement('div')
                heart.textContent = ['❤️', '💕', '💖', '💗', '🩷'][i % 5]
                heart.style.cssText = `
                  position:absolute;
                  left:50%;top:50%;
                  font-size:${16 + Math.random() * 20}px;
                  animation: floatUp ${3 + Math.random() * 3}s ease-out forwards;
                  transform: translate(${(Math.random() - 0.5) * 200}px, 0);
                `
                container.appendChild(heart)
              }
              setTimeout(() => container.remove(), 6000)
            }}
          >
            Forever Smile 😊
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom text */}
      <motion.p
        className="absolute bottom-6 text-sm text-center px-6"
        style={{ color: '#ad1457', opacity: 0.6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3 }}
      >
        Made with all my ❤️ for you, Rani
      </motion.p>
    </motion.div>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('opening')
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element (soft background music)
    // Using a royalty-free happy birthday instrumental
    audioRef.current = new Audio('DHUN.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.3
    audioRef.current.preload = 'auto'

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return
    if (isMuted) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked - will need user interaction
      })
    } else {
      audioRef.current.pause()
    }
    setIsMuted(!isMuted)
  }, [isMuted])

  const goToNextScreen = useCallback((next: Screen) => {
    setCurrentScreen(next)
  }, [])

  return (
    <main className="w-full h-screen overflow-hidden relative" style={{ background: '#fff0f5' }}>
      <MusicToggle isMuted={isMuted} onToggle={toggleMusic} />

      <AnimatePresence mode="wait">
        {currentScreen === 'opening' && (
          <OpeningScreen
            key="opening"
            onStart={() => goToNextScreen('message')}
          />
        )}

        {currentScreen === 'message' && (
          <MessageScreen
            key="message"
            onContinue={() => goToNextScreen('gallery')}
          />
        )}

        {currentScreen === 'gallery' && (
          <GalleryScreen
            key="gallery"
            onContinue={() => goToNextScreen('memories')}
          />
        )}

        {currentScreen === 'memories' && (
          <MemoryBookScreen
            key="memories"
            onContinue={() => goToNextScreen('final')}
          />
        )}

        {currentScreen === 'final' && (
          <FinalScreen key="final" />
        )}
      </AnimatePresence>
    </main>
  )
}
