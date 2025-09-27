'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PageLoader() {
    const [loading, setLoading] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true)
            setTimeout(() => setLoading(false), 100)
        }, 200)

        return () => clearTimeout(timer)
    }, [])

    if (!loading) return null

    return (
        <div className={`bg-secondary fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
        }`}>
            <div className="text-center">
                <div
                    aria-label="Orange and tan hamster running in a metal wheel"
                    role="img"
                    className="wheel-and-hamster mx-auto mb-6"
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

                <p className="mt-4 text-white/80">Hamster is getting things ready...</p>
            </div>
        </div>
    )
}