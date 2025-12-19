"use client"

import { useEffect, useRef } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

// Lightweight HTML editor using contentEditable to avoid ReactQuill / findDOMNode issues
export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInternalChange = useRef(false)
  const lastValueRef = useRef<string>(value)

  useEffect(() => {
    if (!ref.current) return
    // Only update if value changed from outside (not from user input)
    if (value !== lastValueRef.current && !isInternalChange.current) {
      ref.current.innerHTML = value || ""
      lastValueRef.current = value
    }
  }, [value])

  const handleInput = () => {
    if (!ref.current) return
    isInternalChange.current = true
    const newValue = ref.current.innerHTML
    lastValueRef.current = newValue
    onChange(newValue)
    // Reset flag after a brief delay
    setTimeout(() => {
      isInternalChange.current = false
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle undo (Ctrl/Cmd + Z)
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault()
      if (document.execCommand) {
        document.execCommand('undo', false)
        // Update value after undo
        setTimeout(() => {
          if (ref.current) {
            handleInput()
          }
        }, 0)
      }
      return
    }

    // Handle redo (Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y)
    if (
      ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) ||
      ((e.ctrlKey || e.metaKey) && e.key === 'y')
    ) {
      e.preventDefault()
      if (document.execCommand) {
        document.execCommand('redo', false)
        // Update value after redo
        setTimeout(() => {
          if (ref.current) {
            handleInput()
          }
        }, 0)
      }
      return
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!ref.current) return

    // Get plain text from clipboard, preserving whitespace
    const text = e.clipboardData.getData('text/plain')
    
    // Get current selection
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    range.deleteContents()

    // Create a text node with the pasted text (preserves whitespace)
    const textNode = document.createTextNode(text)
    range.insertNode(textNode)

    // Move cursor to end of inserted text
    range.setStartAfter(textNode)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)

    // Trigger input event to update the value
    handleInput()
  }

  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-900">
      <div
        ref={ref}
        contentEditable
        className="min-h-[120px] w-full cursor-text whitespace-pre-wrap px-3 py-2 text-sm text-neutral-100 outline-none"
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
      />
      <div className="border-t border-neutral-800 px-3 py-1 text-[11px] text-neutral-500">
        Basic rich text editor – use your browser shortcuts (Ctrl/Cmd+B, I, Ctrl/Cmd+Z for undo, Ctrl/Cmd+Shift+Z or Ctrl/Cmd+Y for redo, etc.)
      </div>
    </div>
  )
}



