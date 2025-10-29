import { track } from '@vercel/analytics';

interface GtagWindow extends Window {
    gtag?: (
        command: string,
        targetId: string,
        config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
}

declare const window: GtagWindow;

interface EventData {
    label?: string;
    value?: number;
    [key: string]: string | number | boolean | undefined;
}

export const gaEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

export const vercelEvent = (name: string, data?: Record<string, string | number | boolean>) => {
    track(name, data);
};

export const trackEvent = (
    name: string,
    category: string,
    data?: EventData
) => {
    gaEvent(name, category, data?.label as string, data?.value as number);

    const vercelData = data ? Object.fromEntries(
        Object.entries(data).filter(([, value]) =>
            typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
        )
    ) as Record<string, string | number | boolean> : undefined;

    vercelEvent(name, vercelData);
};

export const analytics = {
    pageView: (url: string) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
                page_path: url,
            });
        }
    },

    clickButton: (buttonName: string, location?: string) => {
        trackEvent('button_click', 'engagement', {
            button_name: buttonName,
            location: location,
        });
    },

    downloadFile: (fileName: string, fileType: string) => {
        trackEvent('file_download', 'downloads', {
            file_name: fileName,
            file_type: fileType,
        });
    },

    clickExternalLink: (url: string, linkText?: string) => {
        trackEvent('external_link_click', 'outbound', {
            url: url,
            link_text: linkText,
        });
    },

    viewCertificate: (certificateName: string) => {
        trackEvent('certificate_view', 'engagement', {
            certificate: certificateName,
        });
    },

    scrollToSection: (sectionName: string) => {
        trackEvent('scroll_to_section', 'navigation', {
            section: sectionName,
        });
    },

    changeTheme: (theme: 'light' | 'dark') => {
        trackEvent('theme_change', 'settings', {
            theme: theme,
        });
    },

    timeSpent: (seconds: number, page: string) => {
        trackEvent('time_on_page', 'engagement', {
            seconds: seconds,
            page: page,
        });
    },
};