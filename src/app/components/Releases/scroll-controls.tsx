"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "./ui/button"

export function ScrollControls() {
  const scrollToTop = () => {
    if (typeof window === "undefined") return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToBottom = () => {
    if (typeof window === "undefined") return
    const height =
      document.documentElement.scrollHeight || document.body.scrollHeight
    window.scrollTo({ top: height, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full border-neutral-700 bg-neutral-900/80 text-neutral-100 backdrop-blur hover:bg-neutral-800"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full border-neutral-700 bg-neutral-900/80 text-neutral-100 backdrop-blur hover:bg-neutral-800"
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  )
}



