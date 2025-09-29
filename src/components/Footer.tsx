"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import CreattieAnimation from './animation/CreattieAnimation';

const Footer = () => {
    const [version, setVersion] = useState("Loading...");

    const contactLinks = [
        {
            label: "EMAIL",
            href: "mailto:amirallami.dev@gmail.com",
            text: "amirallami.dev@gmail.com"
        },
        {
            label: "GITHUB",
            href: "https://github.com/amirallami-code",
            text: "@amirallami-code"
        },
        {
            label: "TELEGRAM",
            href: "https://t.me/amirhosseinallami",
            text: "t.me/@amirhosseinallami"
        },
        {
            label: "LINKEDIN",
            href: "https://www.linkedin.com/in/amirhosseinallami",
            text: "in/amirhosseinallami"
        }
    ];

    const getLatestVersion = async () => {
        try {
            const owner = "amirallami-code";
            const repo = "amirallami.com";

            // Try to get latest release first
            const releaseResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);

            if (releaseResponse.ok) {
                const release = await releaseResponse.json();
                return release.tag_name;
            }

            // Fallback to latest tag if no releases
            const tagsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/tags`);

            if (tagsResponse.ok) {
                const tags = await tagsResponse.json();
                return tags.length > 0 ? tags[0].name : 'v2.0';
            }

            return 'v2.0';
        } catch (error) {
            console.error('Error fetching version:', error);
            return 'v2.0';
        }
    };

    useEffect(() => {
        getLatestVersion().then(latestVersion => {
            setVersion(latestVersion);
        });
    }, []);

    return (
        <footer id="stay-in-touch" className="section">
            <div className="container section-padding flex flex-col lg:flex-row gap-10">
                <div className="flex-1 flex items-center justify-center">
                    <CreattieAnimation
                        animationURL={'/animations/creattie-footer.json'}
                        className={"max-w-96"}
                        autoplay={true}
                        loop={true}
                        speed={0.75}
                    />
                </div>

                <div className="flex-1">
                    <h2 className='section-title'>Stay in touch</h2>

                    <ul className="stay-in-touch-item-wrapper">
                        {contactLinks.map((contact, index) => (
                            <li key={index}>
                                <b>{contact.label}</b>
                                <Link href={contact.href} target={"_blank"}>
                                    {contact.text}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="w-full flex flex-col items-end justify-start gap-5 mt-10">
                        <p className="font-serif font-medium tracking-wide text-secondary dark:text-chart-3">Sincerely, Amirhossein Allami.</p>
                        <Image src={"/signature/blue.webp"} alt="Signature" width="0"
                               height="0"
                               sizes="200px"
                               className="w-auto h-auto"/>
                    </div>
                </div>
            </div>

            <div className="container border-t border-github-border pt-4 pb-4">
                <div className="flex flex-wrap justify-center md:justify-between items-center text-center gap-4 text-xs text-muted-foreground/90">
                    <p>© {new Date().getFullYear()} Amirhossein Allami. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        build {version}
                        <span>•</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="link" size="sm" className="text-xs !p-0 text-secondary dark:text-chart-3">
                                    Switch version
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className={"border-github-border"}>
                                <DropdownMenuItem asChild className={"!text-xs"}>
                                    <p>{version} <span className="text-muted-foreground/90">(current)</span></p>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className={"!text-xs"}>
                                    <Link href="https://v1.amirallami.com">v1.4.2</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer