"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Menu, X } from "lucide-react"
import { ScrollControls } from "./scroll-controls"
import { CollapsibleHtml } from "./collapsible-html"
import { LazyImage } from "./lazy-image"
import { LazyVideo } from "./lazy-video"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"

export interface Feature {
  title: string
  description: string
  image_url?: string | null
  video_url?: string | null
}

export interface Release {
  id: string
  version_title: string
  release_date: string
  features: Feature[]
  is_published: boolean
  created_at?: string
  updated_at?: string
}

interface ReleasesClientProps {
  releases: Release[]
}

// Parse version_title in "DD Month YYYY" format to Date
function parseVersionTitle(versionTitle: string): Date {
  if (!versionTitle) return new Date(0)
  
  // Try to parse common date formats
  // Formats: "2 Dec 2025", "2 Dec, 2025", "Dec 2, 2025", "December 2, 2025"
  const dateStr = versionTitle.trim()
  
  // Try direct Date parsing first
  const parsed = new Date(dateStr)
  if (!isNaN(parsed.getTime())) {
    return parsed
  }
  
  // Try parsing with common patterns
  // Pattern: "DD Month YYYY" or "DD Month, YYYY"
  const pattern1 = /(\d{1,2})\s+([A-Za-z]+)\s*,?\s*(\d{4})/
  const match1 = dateStr.match(pattern1)
  if (match1) {
    const [, day, month, year] = match1
    const date = new Date(`${month} ${day}, ${year}`)
    if (!isNaN(date.getTime())) {
      return date
    }
  }
  
  // Pattern: "Month DD, YYYY" or "Month DD YYYY"
  const pattern2 = /([A-Za-z]+)\s+(\d{1,2})\s*,?\s*(\d{4})/
  const match2 = dateStr.match(pattern2)
  if (match2) {
    const [, month, day, year] = match2
    const date = new Date(`${month} ${day}, ${year}`)
    if (!isNaN(date.getTime())) {
      return date
    }
  }
  
  // If all parsing fails, return epoch date (will sort to end)
  return new Date(0)
}

export function ReleasesClient({ releases }: ReleasesClientProps) {
  // Sort releases by version_title (latest to oldest)
  const sortedReleases = useMemo(() => {
    return [...releases].sort((a, b) => {
      const aDate = parseVersionTitle(a.version_title)
      const bDate = parseVersionTitle(b.version_title)
      return bDate.getTime() - aDate.getTime();
    })
  }, [releases])

  const [activeReleaseId, setActiveReleaseId] = useState<string | null>(
    sortedReleases[0]?.id ?? null,
  )
  const articleRefs = useRef<Record<string, HTMLElement | null>>({})
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    if (!sortedReleases.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Don't update activeReleaseId if we're programmatically scrolling
        if (isScrollingRef.current) return

        // Find the entry with the largest intersection ratio
        let best: IntersectionObserverEntry | null = null
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry
          }
        }
        if (best?.target) {
          const id = best.target.getAttribute("data-release-id")
          if (id && id !== activeReleaseId) {
            setActiveReleaseId(id)
          }
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
      },
    )

    sortedReleases.forEach((release) => {
      const el = articleRefs.current[release.id]
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedReleases])

  const handleHistoryClick = (releaseId: string) => {
    const el = articleRefs.current[releaseId]
    if (el) {
      // Set flag to prevent IntersectionObserver from updating during scroll
      isScrollingRef.current = true
      setActiveReleaseId(releaseId)
      setIsHistoryOpen(false)
      
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      
      // Re-enable IntersectionObserver after scroll completes
      // Use scrollend event if available (modern browsers), otherwise use timeout
      const reEnableObserver = () => {
        isScrollingRef.current = false
      }
      
      if (typeof window !== 'undefined' && 'onscrollend' in window) {
        const scrollEndHandler = () => {
          reEnableObserver()
          window.removeEventListener('scrollend', scrollEndHandler)
        }
        window.addEventListener('scrollend', scrollEndHandler, { once: true })
      } else {
        // Fallback: use timeout (smooth scroll typically takes ~500-1000ms)
        setTimeout(reEnableObserver, 1500)
      }
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Header with logo and title */}
        <header className="mb-4 bg-neutral-950 px-4 md:px-0 fixed md:relative top-0 left-0 right-0 z-50 flex items-center justify-between">
          {/* Logo on the left */}
          <div className="relative w-24 h-16">
            <Image
              src="/Assets/Icons/LogoIcon.png"
              alt="Logo"
              fill
              objectFit="contain"
              unoptimized
            />
          </div>
          {/* "Release Notes" text centered */}
          <h1 className="absolute hidden md:block left-1/2 transform -translate-x-1/2 text-xl font-semibold text-white sm:text-2xl">
            Release Notes
          </h1>
          <button
          type="button"
          onClick={() => setIsHistoryOpen(true)}
          className={`fixed top-7.5/100 right-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-100 shadow-sm transition-opacity duration-300 lg:hidden ${
            isHistoryOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
          aria-label="Open history"
        >
          <Menu className="h-5 w-5" />
        </button>
          {/* Spacer to balance the layout */}
          {/* <div className="w-[120px] sm:w-[160px]" /> */}
        </header>

        <h1 className="md:hidden mt-15 text-center mb-4 text-xl font-semibold text-white sm:text-2xl">
          Release Notes
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content - Release Feed */}
          <main className="lg:col-span-9">
            <div className="mx-auto max-w-4xl space-y-12">
              {sortedReleases.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-neutral-500">No releases yet.</p>
                </div>
              ) : (
                sortedReleases.map((release, releaseIndex) => (
                  <article
                    key={release.id}
                    id={release.id}
                    data-release-id={release.id}
                    ref={(el) => {
                      articleRefs.current[release.id] = el
                    }}
                    className="space-y-6 scroll-mt-24"
                  >
                    <div className="space-y-2">
                      <h1 className="text-3xl font-semibold text-white">
                        {release.version_title}
                      </h1>
                      {/* <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={release.release_date}>
                          {new Date(release.release_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </time>
                      </div> */}
                    </div>

                    <div className="space-y-8">
                      {release.features.map((feature, index) => (
                        <div key={index} className="space-y-3">
                          <h2 className="text-xl font-semibold text-white">
                            {feature.title}
                          </h2>
                          <CollapsibleHtml html={feature.description} />
                          {feature.image_url && (
                            <div className="mt-4 overflow-hidden rounded-lg border border-neutral-800">
                              <LazyImage
                                src={feature.image_url}
                                alt={feature.title}
                                width={800}
                                height={400}
                                className="h-auto w-full object-cover"
                                unoptimized={true}
                              />
                            </div>
                          )}
                          {feature.video_url && (
                            <div className="mt-4 overflow-hidden rounded-lg border border-neutral-800">
                              <LazyVideo
                                src={feature.video_url}
                                className="h-auto w-full"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {releaseIndex < sortedReleases.length - 1 && (
                      <div className="border-t border-neutral-800 pt-8" />
                    )}
                  </article>
                ))
              )}
            </div>
          </main>

          {/* Right Sidebar - History */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-4 h-[calc(100vh-4rem)]">
              <Card className="flex h-full flex-col">
                <CardContent className="flex h-full flex-col p-6">
                  <h3 className="mb-4 text-sm font-semibold text-white">
                    History
                  </h3>
                  <ScrollArea className="h-full">
                    <div className="space-y-2">
                      {sortedReleases.map((release) => (
                        <button
                          key={release.id}
                          type="button"
                          onClick={() => handleHistoryClick(release.id)}
                          className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                            activeReleaseId === release.id
                              ? "bg-neutral-800 text-white"
                              : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                          }`}
                        >
                          {release.version_title}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile slide-over history panel */}
      <div
        className={`fixed inset-0 z-50 flex justify-end lg:hidden transition-opacity duration-300 ${
          isHistoryOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={() => setIsHistoryOpen(false)}
          className="absolute inset-0 h-full w-full bg-black/60"
          aria-label="Close history"
        />

        {/* Panel */}
        <div
          className={`relative h-full w-72 max-w-[80%] bg-neutral-900 shadow-xl transition-transform duration-300 ${
            isHistoryOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
            <h3 className="text-sm font-semibold text-white">History</h3>
            <button
              type="button"
              onClick={() => setIsHistoryOpen(false)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800"
              aria-label="Close history"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="h-[calc(100%-3rem)] overflow-y-auto px-2 py-3">
            <div className="space-y-1">
              {sortedReleases.map((release) => (
                <button
                  key={release.id}
                  type="button"
                  onClick={() => handleHistoryClick(release.id)}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeReleaseId === release.id
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {release.version_title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ScrollControls />
    </div>
  )
}


