"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface CollapsibleHtmlProps {
  html: string
  maxLines?: number
}

export function CollapsibleHtml({ html, maxLines = 5 }: CollapsibleHtmlProps) {
  const [expanded, setExpanded] = useState(false)
  const [isCollapsible, setIsCollapsible] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    // Allow layout to settle before measuring
    const id = window.setTimeout(() => {
      if (el.scrollHeight > el.clientHeight + 4) {
        setIsCollapsible(true)
      } else {
        setIsCollapsible(false)
      }
    }, 0)

    return () => window.clearTimeout(id)
  }, [html, maxLines])

  return (
    <div className="space-y-1">
      <div
        ref={contentRef}
        className={cn(
          "prose prose-invert max-w-none leading-relaxed text-neutral-300",
          !expanded && "max-h-32 overflow-hidden",
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {isCollapsible && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-xs font-medium text-neutral-400 hover:text-neutral-200"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  )
}


