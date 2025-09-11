import { Certificate, CERTIFICATE_TAGS, CertificateProvider, CertificateTag } from '@/types/certificates';

export const certificatesData: Certificate[] = [
    {
        title: "Introduction to Front-end Development",
        provider: "Meta",
        platform: "Coursera",
        earnedOn: 20240707, // YYYYMMDD format
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/HF7Y6KJLLGK9",
        downloadPath: "/certificates/pdf/cer-IFD.pdf",
        imagePath: "/certificates/png/cer-IFD.jpg",
        imageAlt: "Coursera Certificate - Introduction to Front-end Development",
        providerLogo: "/certificates/provider/meta-logo.webp",
        tags: [
            CERTIFICATE_TAGS.FRONTEND,
            CERTIFICATE_TAGS.HTML_CSS,
            CERTIFICATE_TAGS.WEB_DEVELOPMENT
        ]
    },
    {
        title: "Programming with JavaScript",
        provider: "Meta",
        platform: "Coursera",
        earnedOn: 20250125,
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/C8G31UOCMO46",
        downloadPath: "/certificates/pdf/cer-JS.pdf",
        imagePath: "/certificates/png/cer-JS.jpg",
        imageAlt: "Coursera Certificate - Programming with JavaScript",
        providerLogo: "/certificates/provider/meta-logo.webp",
        tags: [
            CERTIFICATE_TAGS.JAVASCRIPT,
            CERTIFICATE_TAGS.PROGRAMMING,
            CERTIFICATE_TAGS.WEB_DEVELOPMENT
        ]
    },
    {
        title: "Version Control",
        provider: "Meta",
        platform: "Coursera",
        earnedOn: 20250303,
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/0XEJ04PVV5ZW",
        downloadPath: "/certificates/pdf/cer-VC.pdf",
        imagePath: "/certificates/png/cer-VC.jpg",
        imageAlt: "Coursera Certificate - Version Control",
        providerLogo: "/certificates/provider/meta-logo.webp",
        tags: [
            CERTIFICATE_TAGS.VERSION_CONTROL,
            CERTIFICATE_TAGS.GIT,
            CERTIFICATE_TAGS.WEB_DEVELOPMENT
        ]
    },
    {
        title: "React Basics",
        provider: "Meta",
        platform: "Coursera",
        earnedOn: 20250720,
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/PNL7SL4GUPPR",
        downloadPath: "/certificates/pdf/cer-RB.pdf",
        imagePath: "/certificates/png/cer-RB.png",
        imageAlt: "Coursera Certificate - React Basics",
        providerLogo: "/certificates/provider/meta-logo.webp",
        tags: [
            CERTIFICATE_TAGS.REACT,
            CERTIFICATE_TAGS.JAVASCRIPT,
            CERTIFICATE_TAGS.FRONTEND
        ]
    },
];

// Helper functions
export const formatCertificateDate = (dateNumber: number): string => {
    const dateStr = dateNumber.toString();
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);

    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const getCertificatesByProvider = (provider: CertificateProvider): Certificate[] => {
    return certificatesData.filter(cert => cert.provider === provider);
};

export const getCertificatesByTag = (tagName: string): Certificate[] => {
    return certificatesData.filter(cert =>
        cert.tags.some(tag => tag.name === tagName)
    );
};

export const getAllUniqueTags = (): CertificateTag[] => {
    const tagSet = new Set<string>();
    const uniqueTags: CertificateTag[] = [];

    certificatesData.forEach(cert => {
        cert.tags.forEach(tag => {
            if (!tagSet.has(tag.name)) {
                tagSet.add(tag.name);
                uniqueTags.push(tag);
            }
        });
    });

    return uniqueTags;
};

export const sortCertificatesByDate = (ascending = false): Certificate[] => {
    return [...certificatesData].sort((a, b) =>
        ascending ? a.earnedOn - b.earnedOn : b.earnedOn - a.earnedOn
    );
};

export const getTimeAgo = (dateNumber: number): string => {
    const dateStr = dateNumber.toString();
    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4, 6)) - 1; // Month is 0-indexed
    const day = parseInt(dateStr.slice(6, 8));

    const certificateDate = new Date(year, month, day);
    const today = new Date();

    const diffInMs = today.getTime() - certificateDate.getTime();

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30.44);
    const diffInYears = Math.floor(diffInDays / 365.25);

    if (diffInDays < 1) {
        return "today";
    } else if (diffInDays === 1) {
        return "1 day ago";
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    } else if (diffInWeeks === 1) {
        return "1 week ago";
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks} weeks ago`;
    } else if (diffInMonths === 1) {
        return "1 month ago";
    } else if (diffInMonths < 12) {
        return `${diffInMonths} months ago`;
    } else if (diffInYears === 1) {
        return "1 year ago";
    } else {
        return `${diffInYears} years ago`;
    }
};

export const getTimeAgoPrecise = (dateNumber: number): string => {
    const dateStr = dateNumber.toString();
    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4, 6)) - 1;
    const day = parseInt(dateStr.slice(6, 8));

    const certificateDate = new Date(year, month, day);
    const today = new Date();

    const yearsDiff = today.getFullYear() - certificateDate.getFullYear();
    const monthsDiff = today.getMonth() - certificateDate.getMonth();
    const daysDiff = today.getDate() - certificateDate.getDate();

    // Calculate total months difference
    let totalMonths = yearsDiff * 12 + monthsDiff;
    if (daysDiff < 0) {
        totalMonths--;
    }

    if (totalMonths < 1) {
        const diffInMs = today.getTime() - certificateDate.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays < 1) return "today";
        if (diffInDays === 1) return "1 day ago";
        if (diffInDays < 7) return `${diffInDays} days ago`;

        const weeks = Math.floor(diffInDays / 7);
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (totalMonths < 12) {
        return totalMonths === 1 ? "1 month ago" : `${totalMonths} months ago`;
    } else {
        const years = Math.floor(totalMonths / 12);
        return years === 1 ? "1 year ago" : `${years} years ago`;
    }
};