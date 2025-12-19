"use client"

import { useEffect, useRef, useState } from "react"

interface LazyVideoProps {
  src: string
  className?: string
  controls?: boolean
}

export function LazyVideo({
  src,
  className = "",
  controls = false,
}: LazyVideoProps) {
  const [isInView, setIsInView] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            setShouldLoad(true)
            // Autoplay when in view
            if (videoRef.current) {
              videoRef.current.play().catch((err) => {
                // Autoplay may fail due to browser policies (usually requires muted)
                console.log("Autoplay prevented:", err)
              })
            }
          } else {
            // Pause when out of view
            if (videoRef.current) {
              videoRef.current.pause()
            }
            setIsInView(false)
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Video must be at least 50% visible
      },
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Handle visibility change (tab switching, window minimize, etc.)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause()
      } else if (!document.hidden && isInView && videoRef.current) {
        // Check if video is still in view using IntersectionObserver
        // This will be handled by the observer above
        videoRef.current.play().catch((err) => {
          console.log("Resume play prevented:", err)
        })
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isInView])

  // Prevent right-click context menu and disable controls
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    const handleClick = (e: MouseEvent) => {
      e.preventDefault()
      // Prevent any default video controls from showing
    }

    video.addEventListener("contextmenu", handleContextMenu)
    video.addEventListener("click", handleClick)

    return () => {
      video.removeEventListener("contextmenu", handleContextMenu)
      video.removeEventListener("click", handleClick)
    }
  }, [shouldLoad])

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          controls={false}
          className={className}
          playsInline
          muted={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className={`${className} bg-neutral-900 animate-pulse flex items-center justify-center`}
          style={{ minHeight: 200 }}
        >
          <span className="text-neutral-500 text-sm">Loading video...</span>
        </div>
      )}
    </div>
  )
}

