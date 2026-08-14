import { useEffect, useRef, useState } from 'react'
import { RotateCcw, X } from 'lucide-react'

// Files in /public are served from the site root, so this must be a plain
// absolute path rather than an import (Vite does not bundle /public assets).
const INTRO_VIDEO_URL = '/videos/kiniedxintro.mp4'

const floatingControlClass =
  "flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"

// `variant="floating"` renders the same video asset as a small autoplaying
// corner card (used after Get In Touch closes/succeeds) instead of the
// original large centered modal, without touching the default modal path.
export default function VideoIntro({ onSkip, onEnded, variant = 'modal' }) {
  const videoRef = useRef(null)
  const [ended, setEnded] = useState(false)

  // Floating video starts with audio on, played imperatively (rather than
  // the `autoPlay` attribute) so a browser block surfaces as a catchable
  // rejection instead of silently doing nothing. The element itself is only
  // ever mounted once the Get In Touch modal closes/succeeds (see Home.jsx),
  // so `preload="none"` plus this effect means the video is never fetched
  // during the initial page load — only once it's actually shown. No manual
  // teardown is needed on close: React unmounts the <video> node itself
  // (Home.jsx stops rendering it), and browsers already abort the fetch and
  // stop playback as soon as a media element leaves the document.
  useEffect(() => {
    if (variant !== 'floating') return
    const el = videoRef.current
    if (!el) return

    el.muted = false
    const playPromise = el.play()
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Video autoplay with sound was blocked by the browser:', error)
      })
    }
  }, [variant])

  const handleEnded = () => {
    setEnded(true)
    onEnded?.()
  }

  const handleReplay = () => {
    const el = videoRef.current
    if (!el) return
    el.currentTime = 0
    el.play().catch((error) => {
      console.warn('Video replay with sound was blocked by the browser:', error)
    })
    setEnded(false)
  }

  if (variant === 'floating') {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-black shadow-2xl dark:border-white/10">
        <video
          ref={videoRef}
          src={INTRO_VIDEO_URL}
          preload="none"
          playsInline
          onEnded={handleEnded}
          className="aspect-video w-full object-cover"
        />

        <button
          type="button"
          onClick={onSkip}
          aria-label="Close promotional video"
          className={`absolute right-2 top-2 ${floatingControlClass}`}
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        {ended && (
          <button
            type="button"
            onClick={handleReplay}
            aria-label="Replay video"
            className={`absolute bottom-2 right-2 ${floatingControlClass}`}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <video
        src={INTRO_VIDEO_URL}
        autoPlay
        muted
        playsInline
        controls
        onEnded={onEnded}
        className="aspect-video w-full object-cover"
      />

      <button
        type="button"
        onClick={onSkip}
        className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg"
      >
        Skip Video
      </button>
    </div>
  )
}