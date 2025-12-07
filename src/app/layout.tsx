import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import clsx from "clsx";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WebVitalsReporter } from "@/components/WebVitalsReporter";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    preload: true,
    weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://amirallami.com'),
    title: {
        template : "%s | amirallami.com",
        default: "Amirhossein Allami | Front-End Developer & UI Designer,"
    },
    description:
        "Amirhossein Allami - Front-End Developer & UI Designer. Crafting modern, user-friendly web experiences with NextJS & TypeScript. Based in Shiraz, with 3+ years of design expertise.",
    keywords: [
        "Amirhossein Allami",
        "Front-End Developer",
        "Web Development",
        "React",
        "NextJS",
        "TypeScript",
        "Portfolio",
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
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                            page_path: window.location.pathname,
                        });
                    `}
                </Script>
            </head>
            <body className={clsx(montserrat.className, "antialiased bg-background")}>
                <ThemeProvider>
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Footer />
                    <WebVitalsReporter />
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}