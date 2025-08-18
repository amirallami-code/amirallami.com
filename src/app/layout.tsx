import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["300", "400", "500", "600", "700", "800"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Amirhossein Allami | Front-End Developer & UI Designer",
    description: "Amirhossein Allami - Front-End Developer & UI Designer. Crafting modern, user-friendly web experiences with React & TypeScript. Based in Shiraz, with 3+ years of design expertise.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className="dark">
            <body className={`${montserrat.variable} antialiased font-sans`}>
                {children}
            </body>
        </html>
    );
}