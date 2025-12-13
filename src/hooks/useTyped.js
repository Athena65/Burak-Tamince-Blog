import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

export const useTyped = (strings, options = {}) => {
  const el = useRef(null)
  const typed = useRef(null)

  useEffect(() => {
    const typedOptions = {
      strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      ...options,
    }

    if (el.current) {
      typed.current = new Typed(el.current, typedOptions)
    }

    return () => {
      if (typed.current) {
        typed.current.destroy()
      }
    }
  }, [strings, options])

  return el
}

