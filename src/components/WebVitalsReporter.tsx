'use client';
import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

export function WebVitalsReporter() {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            import('web-vitals').then(({onCLS, onINP, onFCP, onLCP, onTTFB}) => {
                onCLS((metric: Metric) => console.log('CLS:', metric));
                onINP((metric: Metric) => console.log('INP:', metric));
                onFCP((metric: Metric) => console.log('FCP:', metric));
                onLCP((metric: Metric) => console.log('LCP:', metric));
                onTTFB((metric: Metric) => console.log('TTFB:', metric));
            });
        }
    }, []);

    return null;
}