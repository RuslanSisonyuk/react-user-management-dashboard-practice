import { useEffect, useRef } from "react"


function useClickOutside<T extends HTMLElement = HTMLElement>(handler: () => void) {
  // Create a ref with the correct type
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handler])

  return ref
}

export default useClickOutside
