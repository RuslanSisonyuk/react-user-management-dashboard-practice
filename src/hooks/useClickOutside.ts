import { useEffect, useRef } from "react"


function useClickOutside<T extends HTMLElement = HTMLElement>(handler: () => void) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    // Cleanc up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handler])

  return ref
}

export default useClickOutside
