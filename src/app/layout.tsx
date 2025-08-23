import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from '@/components/ThemeProvider';

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Amirhossein Allami | Front-End Developer & UI Designer",
    description: "Amirhossein Allami - Front-End Developer & UI Designer. Crafting modern, user-friendly web experiences with React & TypeScript. Based in Shiraz, with 3+ years of design expertise.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className="dark">
            <body className={clsx(montserrat.className, "antialiased bg-background")}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}