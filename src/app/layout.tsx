import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageLoader from "@/components/PageLoader";
import { WebVitalsReporter } from "@/components/WebVitalsReporter";

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    preload: true,
    weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://amirallami.com'),
    title: "Amirhossein Allami | Front-End Developer & UI Designer",
    description:
        "Amirhossein Allami - Front-End Developer & UI Designer. Crafting modern, user-friendly web experiences with React & TypeScript. Based in Shiraz, with 3+ years of design expertise.",
    keywords: [
        "Amirhossein Allami",
        "Front-End Developer",
        "UI Designer",
        "React",
        "TypeScript",
        "Portfolio",
        "Web Development",
    ],
    authors: [{ name: "Amirhossein Allami", url: "https://amirallami.com" }],
    creator: "Amirhossein Allami",
    publisher: "Amirhossein Allami",
    openGraph: {
        title: "Amirhossein Allami | Front-End Developer & UI Designer",
        description:
            "Crafting modern, user-friendly web experiences with React & TypeScript. Based in Shiraz, with 3+ years of design expertise.",
        url: "https://amirallami.com",
        siteName: "Amirhossein Allami Portfolio",
        images: [
            {
                url: "https://amirallami.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Amirhossein Allami Portfolio",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Amirhossein Allami | Front-End Developer & UI Designer",
        description:
            "Crafting modern, user-friendly web experiences with React & TypeScript. Based in Shiraz, with 3+ years of design expertise.",
        images: ["https://amirallami.com/og-image.jpg"],
        site: "@amirallami",
        creator: "@amirallami",
    },
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            data-scroll-behavior="smooth"
            className="dark"
        >
            <head>
                <meta
                    name="description"
                    content="Amirhossein Allami - Front-End Developer & UI Designer. Crafting modern, user-friendly web experiences with React & TypeScript. Based in Shiraz, with 3+ years of design expertise."
                />
            </head>
            <body className={clsx(montserrat.className, "antialiased bg-background")}>
                <ThemeProvider>
                    <PageLoader />
                    {children}
                    <WebVitalsReporter />
                </ThemeProvider>
            </body>
        </html>
    );
}
