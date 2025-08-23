'use client';

import { useEffect, useState, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

interface CreattieAboutProps {
    className?: string;
    width?: number | string;
    height?: number | string;
    autoplay?: boolean;
    loop?: boolean;
    speed?: number;
}

const CreattieAbout: React.FC<CreattieAboutProps> = ({className = '', width = '100%', height = '100%', autoplay = true, loop = true, speed = 1
                                                     }) => {
    const [animationData, setAnimationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        // Fetch animation data from public folder
        fetch('/animations/creattie-about.json')
            .then(response => response.json())
            .then(data => {
                setAnimationData(data);
                // Add a small delay to make the transition more noticeable
                setTimeout(() => {
                    setLoading(false);
                    // Trigger fade-in after loading is complete
                    setTimeout(() => setIsVisible(true), 50);
                }, 300);
            })
            .catch(error => {
                console.error('Error loading animation:', error);
                setLoading(false);
            });
    }, []);

    // Set animation speed when data loads or speed changes
    useEffect(() => {
        if (lottieRef.current && animationData) {
            lottieRef.current.setSpeed(speed);
        }
    }, [speed, animationData]);

    if (loading) {
        return (
            <div
                className={`${className} bg-gray-600/50 w-full min-h-[50dvh] md:min-h-[75dvh] h-auto 
                rounded-2xl animate-pulse flex items-center justify-center transition-all duration-1000`}>
            </div>
        );
    }

    if (!animationData) {
        return (
            <div
                className={`${className} bg-gray-200 rounded-lg flex items-center justify-center`}
                style={{ width, height }}
            >
                <span className="text-gray-600 text-sm">Animation failed to load</span>
            </div>
        );
    }

    return (
        <div
            className={`${className}`}
            style={{ width, height }}
        >
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={loop}
                autoplay={autoplay}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
};

export default CreattieAbout;