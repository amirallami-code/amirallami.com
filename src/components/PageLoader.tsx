'use client'

import { useEffect, useState } from 'react'

export default function PageLoader() {
    const [loading, setLoading] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true)
            setTimeout(() => setLoading(false), 100)
        }, 200)

        return () => clearTimeout(timer)
    }, [])

    if (!loading) return null

    return (
        <div className={`bg-gradient-to-tl from-secondary to-primary fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
        }`}>
            <div className="flex flex-col items-center justify-center gap-1">
                <div
                    aria-label="Orange and tan hamster running in a metal wheel"
                    role="img"
                    className="wheel-and-hamster m-auto"
                >
                    <div className="wheel"></div>
                    <div className="hamster">
                        <div className="hamster__body">
                            <div className="hamster__head">
                                <div className="hamster__ear"></div>
                                <div className="hamster__eye"></div>
                                <div className="hamster__nose"></div>
                            </div>
                            <div className="hamster__limb hamster__limb--fr"></div>
                            <div className="hamster__limb hamster__limb--fl"></div>
                            <div className="hamster__limb hamster__limb--br"></div>
                            <div className="hamster__limb hamster__limb--bl"></div>
                            <div className="hamster__tail"></div>
                        </div>
                    </div>
                    <div className="spoke"></div>
                </div>

                <p className="text-sm text-white/80 tracking-wide animate-pulse">Hamster is getting things ready...</p>
            </div>
        </div>
    )
}