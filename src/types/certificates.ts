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
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800"
    },
    REACT: {
        name: "React",
        color: "#61DAFB",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800"
    },
    HTML_CSS: {
        name: "HTML & CSS",
        color: "#E34F26",
        bgColor: "bg-orange-100",
        textColor: "text-orange-800"
    },
    FRONTEND: {
        name: "Frontend",
        color: "#10B981",
        bgColor: "bg-emerald-100",
        textColor: "text-emerald-800"
    },
    VERSION_CONTROL: {
        name: "Version Control",
        color: "#8B5CF6",
        bgColor: "bg-purple-100",
        textColor: "text-purple-800"
    },
    GIT: {
        name: "Git",
        color: "#F05032",
        bgColor: "bg-red-100",
        textColor: "text-red-800"
    },
    WEB_DEVELOPMENT: {
        name: "Web Development",
        color: "#3B82F6",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800"
    },
    PROGRAMMING: {
        name: "Programming",
        color: "#6366F1",
        bgColor: "bg-indigo-100",
        textColor: "text-indigo-800"
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