import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from '@/components/ThemeProvider';

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Amirhossein Allami | Front-End Developer & UI Designer",
    description: "Amirhossein Allami - Front-End Developer & UI Designer. Crafting modern, user-friendly web experiences with React & TypeScript. Based in Shiraz, with 3+ years of design expertise.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={clsx(dmSans.className, "antialiased bg-background")}>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}