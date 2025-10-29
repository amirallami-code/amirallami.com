import { track } from '@vercel/analytics';

// Google Analytics event tracking
export const gaEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Vercel Analytics event tracking
export const vercelEvent = (name: string, data?: Record<string, any>) => {
    track(name, data);
};

// Combined tracking for both platforms
export const trackEvent = (
    name: string,
    category: string,
    data?: Record<string, any>
) => {
    // Track in Google Analytics
    gaEvent(name, category, data?.label as string, data?.value as number);

    // Track in Vercel Analytics
    vercelEvent(name, data);
};

export const analytics = {
    // Track page views
    pageView: (url: string) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
                page_path: url,
            });
        }
    },

    // Track button clicks
    clickButton: (buttonName: string, location?: string) => {
        trackEvent('button_click', 'engagement', {
            button_name: buttonName,
            location: location,
        });
    },

    // Track downloads
    downloadFile: (fileName: string, fileType: string) => {
        trackEvent('file_download', 'downloads', {
            file_name: fileName,
            file_type: fileType,
        });
    },

    // Track external link clicks
    clickExternalLink: (url: string, linkText?: string) => {
        trackEvent('external_link_click', 'outbound', {
            url: url,
            link_text: linkText,
        });
    },

    // Track certificate views
    viewCertificate: (certificateName: string) => {
        trackEvent('certificate_view', 'engagement', {
            certificate: certificateName,
        });
    },

    // Track section scrolls
    scrollToSection: (sectionName: string) => {
        trackEvent('scroll_to_section', 'navigation', {
            section: sectionName,
        });
    },

    // Track theme changes
    changeTheme: (theme: 'light' | 'dark') => {
        trackEvent('theme_change', 'settings', {
            theme: theme,
        });
    },

    // Track time spent on page
    timeSpent: (seconds: number, page: string) => {
        trackEvent('time_on_page', 'engagement', {
            seconds: seconds,
            page: page,
        });
    },
};