import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from '@/components/ThemeProvider';
import PageLoader from '@/components/PageLoader'
import { WebVitalsReporter } from '@/components/WebVitalsReporter';

const montserrat = Montserrat({
    subsets: ["latin"],
    display: 'swap',
    preload: true,
    weight: ['500', '600', '700', '800'],
});

export const metadata: Metadata = {
    title: "Amirhossein Allami | Front-End Developer & UI Designer",
    description: "Amirhossein Allami - Front-End Developer & UI Designer. Crafting modern, user-friendly web experiences with React & TypeScript. Based in Shiraz, with 3+ years of design expertise.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            data-scroll-behavior="smooth"
            className="dark"
        >
            <head>
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={clsx(
                montserrat.className,
                "antialiased bg-background"
            )}>
                <ThemeProvider>
                    <PageLoader />
                    {children}
                    <WebVitalsReporter />
                </ThemeProvider>
            </body>
        </html>
    );
}