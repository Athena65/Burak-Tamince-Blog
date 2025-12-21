import { useEffect, useRef, useState } from 'react'

const MouseTrail = () => {
    const dotIdRef = useRef(0)
    const lastPosRef = useRef({ x: 0, y: 0 })
    const [trail, setTrail] = useState([])

    useEffect(() => {
        const handleMouseMove = (e) => {
            setTrail((prev) => {
                const newDot = {
                    x: e.clientX,
                    y: e.clientY,
                    id: `${Date.now()}-${dotIdRef.current++}`
                }
                return [...prev.slice(-80), newDot]
            })
            lastPosRef.current = { x: e.clientX, y: e.clientY }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTrail((prev) => {
                if (prev.length === 0) return prev
                return prev.slice(1)
            })
        }, 40)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="mouse-trail-container pointer-events-none fixed inset-0 z-[5] overflow-hidden ">
            {trail.map((dot, i) => (
                <div
                    key={dot.id}
                    className="absolute rounded-full bg-accent-400"
                    style={{
                        left: dot.x,
                        top: dot.y,
                        width: `${(i / trail.length) * 6 + 3.5}px`,
                        height: `${(i / trail.length) * 6 + 3.5}px`,
                        opacity: (i / trail.length) * 1,
                        transform: 'translate(-50%, -50%)',
                        transition: 'opacity 0.1s linear',
                    }}
                />
            ))}
        </div>
    )
}

export default MouseTrail
