export interface CertificateTag {
    name: string;
    color: string;
    bgColor: string;
    textColor: string;
}

export const CERTIFICATE_TAGS: Record<string, CertificateTag> = {
    JAVASCRIPT: {
        name: "JavaScript",
        color: "#F7DF1E",
        bgColor: "#FFFBEB",
        textColor: "#92400E"
    },
    REACT: {
        name: "React",
        color: "#61DAFB",
        bgColor: "#EFF6FF",
        textColor: "#1E40AF"
    },
    HTML_CSS: {
        name: "HTML & CSS",
        color: "#E34F26",
        bgColor: "#FFF7ED",
        textColor: "#C2410C"
    },
    FRONTEND: {
        name: "Frontend",
        color: "#06D6A0",
        bgColor: "#ECFDF5",
        textColor: "#065F46"
    },
    VERSION_CONTROL: {
        name: "Version Control",
        color: "#8B5CF6",
        bgColor: "#F5F3FF",
        textColor: "#5B21B6"
    },
    GIT: {
        name: "Git",
        color: "#F1502F",
        bgColor: "#FEF2F2",
        textColor: "#991B1B"
    },
    WEB_DEVELOPMENT: {
        name: "Web Development",
        color: "#2563EB",
        bgColor: "#EFF6FF",
        textColor: "#1D4ED8"
    },
    PROGRAMMING: {
        name: "Programming",
        color: "#7C3AED",
        bgColor: "#EEF2FF",
        textColor: "#4338CA"
    }
};

export type CertificateProvider = "Meta" | "Google";
export type CertificatePlatform = "Coursera";

export interface Certificate {
    title: string;
    provider: CertificateProvider;
    platform: CertificatePlatform;
    earnedOn: number;
    verifyLink: string;
    downloadPath: string;
    imagePath: string;
    imageAlt: string;
    providerLogo: string;
    tags: CertificateTag[];
}