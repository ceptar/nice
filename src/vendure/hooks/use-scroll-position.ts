"use client"

import { useEffect, useState, useRef } from "react"

interface ScrollPosition {
  scrollY: number
  isScrollingDown: boolean
  isAtBottom: boolean
  isAtTop: boolean
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    isScrollingDown: false,
    isAtBottom: false,
    isAtTop: true,
  })

  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      const isAtTop = currentScrollY < 10

      setScrollPosition({
        scrollY: currentScrollY,
        isScrollingDown,
        isAtBottom,
        isAtTop,
      })

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return scrollPosition
}
