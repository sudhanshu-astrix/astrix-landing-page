"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  unoptimized?: boolean
}

export function LazyImage({
  src,
  alt,
  width = 800,
  height = 400,
  className = "",
  unoptimized = false,
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        root: null,
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      },
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={imgRef} className={className}>
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          unoptimized={unoptimized}
          onLoad={() => setIsLoaded(true)}
        />
      ) : (
        <div
          className={`${className} bg-neutral-900 animate-pulse`}
          style={{ minHeight: height }}
        />
      )}
    </div>
  )
}

