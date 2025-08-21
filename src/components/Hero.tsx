'use client';

import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    oneLight,
    oneDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Check, Copy, Save } from "lucide-react";
import { useThemeContext } from "@/components/ThemeProvider";

type CodeBlockProps = {
    language: string;
    filename: string;
    highlightLines?: number[];
    showSaveToast?: boolean;
    hideToast?: boolean;
} & (
    | { code: string; tabs?: never; }
    | { code?: never; tabs: Array<{ name: string; code: string; language?: string; highlightLines?: number[]; }>; }
    );


export const CodeBlock = ({
                              language,
                              filename,
                              code,
                              highlightLines = [],
                              tabs = [],
                              showSaveToast = false,
                              hideToast = false,
                          }: CodeBlockProps) => {
    const { theme } = useThemeContext();
    const [copied, setCopied] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState(0);

    const tabsExist = tabs.length > 0;

    const copyToClipboard = async () => {
        const textToCopy = tabsExist ? tabs[activeTab].code : code;
        if (textToCopy) {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const activeCode = tabsExist ? tabs[activeTab].code : code;
    const activeLanguage = tabsExist
        ? tabs[activeTab].language || language
        : language;
    const activeHighlightLines = tabsExist
        ? tabs[activeTab].highlightLines || []
        : highlightLines;

    return (
        <div className="relative w-full rounded-lg p-4 font-mono text-sm">
            <div className="flex flex-col gap-2">
                {tabsExist && (
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`px-3 !py-2 text-xs transition-colors font-sans ${
                                    activeTab === index
                                        ? "text-white"
                                        : "text-zinc-400 hover:text-zinc-200"
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                )}
                {!tabsExist && filename && (
                    <div className="flex justify-between items-center py-2">
                        <div className="text-xs text-zinc-400">{filename}</div>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>
                )}
            </div>
            <SyntaxHighlighter
                language={activeLanguage}
                style={theme === "light" ? (oneLight) : (oneDark)}
                customStyle={{
                    margin: 0,
                    padding: 0,
                    background: "transparent",
                    fontSize: "0.875rem",
                }}
                wrapLines={true}
                showLineNumbers={true}
                lineProps={(lineNumber) => ({
                    style: {
                        backgroundColor: activeHighlightLines.includes(lineNumber)
                            ? "rgba(255,255,255,0.1)"
                            : "transparent",
                        display: "block",
                        width: "100%",
                    },
                })}
                PreTag="div"
            >
                {String(activeCode)}
            </SyntaxHighlighter>
        </div>
    );
};

// Animation and timing configuration
const TIMING_CONFIG = {
    // Code block animations
    codeTypingSpeed: 50, // ms per character
    codeDeletionSpeed: 30, // ms per character
    codeDeleteToTypeDelay: 100, // ms delay between delete and type

    // Main text animations
    mainTypingSpeed: 150, // ms per character
    mainDeletionSpeed: 15, // ms per character
    mainDeleteToTypeDelay: 1, // ms delay between delete and type

    // Toast animations
    toastShowDelay: 300, // ms after code typing completes
    toastDuration: 650, // ms to show toast
    toastHideDelay: 500, // ms for hide animation

    // Profession cycling
    professionDisplayTime: 1500, // ms to display each profession
    cycleStartDelay: 300, // ms between cycles
    initialCycleDelay: 500, // ms for first cycle

    // Character animations
    charAppearDuration: 250, // ms for scale-bounce animation
    charDeleteDuration: 150, // ms for char-delete animation
};

const Hero = () => {
    const roles = [
        "Web Developer",
        "UI/UX Designer",
        "Graphic Designer",
    ];

    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedProfession, setDisplayedProfession] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showSaveToast, setShowSaveToast] = useState(false);
    const [hideToast, setHideToast] = useState(false);
    const [codeTypingProfession, setCodeTypingProfession] = useState("Web Developer");
    const [isCodeDeleting, setIsCodeDeleting] = useState(false);

    // Initialize with first role
    useEffect(() => {
        setDisplayedProfession("Web Developer");
        setCurrentRoleIndex(1);
    }, []);

    // Code templates for each role
    const getCodeForRole = (typingText: string) => {
        const baseCode = `...
<div className="w-full flex-[60%] flex flex-col items-start justify-start gap-3 md:gap-6">
    <h1 className="text-2xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 bg-opacity-50">
        Hi 👋,<br/>
        My name is Amir. <br/>
        I'm a <span>${typingText}</span>
    </h1>
    <div className="flex gap-3">
        <Link href="/#about" className="primary-button">
            Who Am I ?!
        </Link>
        <Link href="/#contact" className="primary-button">
            Connect
        </Link>
    </div>
</div>
...`;
        return baseCode;
    };

    // Improved typewriter effect for code block
    const typeCodeProfession = (targetText: string): Promise<void> => {
        return new Promise((resolve) => {
            const currentText = codeTypingProfession;

            // Delete current text completely
            if (currentText.length > 0) {
                setIsCodeDeleting(true);
                let deleteIndex = currentText.length;

                const deleteInterval = setInterval(() => {
                    if (deleteIndex > 0) {
                        setCodeTypingProfession(currentText.slice(0, deleteIndex - 1));
                        deleteIndex--;
                    } else {
                        clearInterval(deleteInterval);
                        setIsCodeDeleting(false);

                        // Start typing new text after deletion is complete
                        setTimeout(() => {
                            let typeIndex = 0;
                            const typeInterval = setInterval(() => {
                                if (typeIndex < targetText.length) {
                                    setCodeTypingProfession(targetText.slice(0, typeIndex + 1));
                                    typeIndex++;
                                } else {
                                    clearInterval(typeInterval);
                                    resolve();
                                }
                            }, TIMING_CONFIG.codeTypingSpeed);
                        }, TIMING_CONFIG.codeDeleteToTypeDelay); // Small delay between delete and type
                    }
                }, TIMING_CONFIG.codeDeletionSpeed);
            } else {
                // If no current text, just type
                let typeIndex = 0;
                const typeInterval = setInterval(() => {
                    if (typeIndex < targetText.length) {
                        setCodeTypingProfession(targetText.slice(0, typeIndex + 1));
                        typeIndex++;
                    } else {
                        clearInterval(typeInterval);
                        resolve();
                    }
                }, TIMING_CONFIG.codeTypingSpeed);
            }
        });
    };

    // Improved typewriter effect for main text with proper space handling
    const typeProfession = (targetText: string): Promise<void> => {
        return new Promise((resolve) => {
            const currentText = displayedProfession;

            // Delete current text completely
            if (currentText.length > 0) {
                setIsDeleting(true);
                let deleteIndex = currentText.length;

                const deleteInterval = setInterval(() => {
                    if (deleteIndex > 0) {
                        setDisplayedProfession(currentText.slice(0, deleteIndex - 1));
                        deleteIndex--;
                    } else {
                        clearInterval(deleteInterval);
                        setIsDeleting(false);

                        // Start typing new text after deletion is complete
                        setTimeout(() => {
                            setIsTyping(true);
                            let typeIndex = 0;
                            const typeInterval = setInterval(() => {
                                if (typeIndex < targetText.length) {
                                    setDisplayedProfession(targetText.slice(0, typeIndex + 1));
                                    typeIndex++;
                                } else {
                                    clearInterval(typeInterval);
                                    setIsTyping(false);
                                    resolve();
                                }
                            }, TIMING_CONFIG.mainTypingSpeed); // Faster typing
                        }, TIMING_CONFIG.mainDeleteToTypeDelay); // Shorter delay between delete and type
                    }
                }, TIMING_CONFIG.mainDeletionSpeed); // Faster deletion
            } else {
                // If no current text, just type
                setIsTyping(true);
                let typeIndex = 0;
                const typeInterval = setInterval(() => {
                    if (typeIndex < targetText.length) {
                        setDisplayedProfession(targetText.slice(0, typeIndex + 1));
                        typeIndex++;
                    } else {
                        clearInterval(typeInterval);
                        setIsTyping(false);
                        resolve();
                    }
                }, TIMING_CONFIG.mainTypingSpeed); // Faster typing
            }
        });
    };

    const packageJsonFile = `{
  "name": "amirallami.com",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-slot": "^1.2.3",
    "@tabler/icons-react": "^3.34.1",
    "@types/react-syntax-highlighter": "^15.5.13",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.540.0",
    "motion": "^12.23.12",
    "next": "15.4.6",
    "ogl": "^1.0.11",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-syntax-highlighter": "^15.6.1",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.4.6",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.7",
    "typescript": "^5"
  }
}`;

    const configFile = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['images.unsplash.com', 'github.com'],
  },
};

module.exports = nextConfig;`;

    // Main effect to cycle through roles
    useEffect(() => {
        const cycleRoles = async () => {
            const currentRole = roles[currentRoleIndex];

            try {
                // Step 1: Type/delete profession in code block
                await typeCodeProfession(currentRole);

                // Step 2: Show save toast after code typing
                await new Promise(resolve => {
                    setTimeout(() => {
                        setShowSaveToast(true);
                        setHideToast(false);
                        resolve(void 0);
                    }, TIMING_CONFIG.toastShowDelay);
                });

                // Step 3: Hide toast with animation and type main profession
                await new Promise(resolve => {
                    setTimeout(() => {
                        setHideToast(true);

                        // Wait for hide animation to complete, then hide toast
                        setTimeout(() => {
                            setHideToast(false);
                            setShowSaveToast(false);
                            resolve(void 0);
                        }, TIMING_CONFIG.toastHideDelay);
                    }, TIMING_CONFIG.toastDuration);
                });

                // Step 4: Type main profession text
                await typeProfession(currentRole);

                // Step 5: Wait before next cycle
                await new Promise(resolve => {
                    setTimeout(() => {
                        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                        resolve(void 0);
                    }, TIMING_CONFIG.professionDisplayTime); // Reduced from 2500ms to 1500ms
                });
            } catch (error) {
                console.error('Error in role cycling:', error);
            }
        };

        // Start cycling (skip first render to avoid immediate change from Front-end Developer)
        if (currentRoleIndex > 1 || (currentRoleIndex === 0 && displayedProfession !== "Front-end Developer")) {
            const timer = setTimeout(() => cycleRoles(), TIMING_CONFIG.cycleStartDelay); // Faster start
            return () => clearTimeout(timer);
        } else {
            // First cycle starts after initial delay
            const timer = setTimeout(() => cycleRoles(), TIMING_CONFIG.initialCycleDelay);
            return () => clearTimeout(timer);
        }
    }, [currentRoleIndex]);

    // Render characters with proper space handling and deletion animation
    const renderTypedText = () => {
        const text = displayedProfession;

        return (
            <span className="relative">
                {text.split('').map((char, index) => (
                    <span
                        key={`${currentRoleIndex}-${index}`}
                        className={`${char === ' ' ? 'inline-block w-[0.25em]' : 'inline-block'} ${isDeleting && index >= text.length - 1 ? 'char-delete' : ''}`}
                        style={{
                            opacity: isTyping && index === text.length - 1 ? 0 : 1,
                            animation: isTyping && index === text.length - 1 ?
                                `scale-bounce ${TIMING_CONFIG.charAppearDuration}ms ease-out forwards` :
                                isDeleting ? `char-delete ${TIMING_CONFIG.charDeleteDuration}ms ease-out forwards` : 'none'
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
        );
    };

    return (
        <section id="hero" className="relative reverse-section min-h-[90dvh]">
            <div className="container relative h-full w-full flex flex-col lg:flex-row items-center justify-center gap-8 pt-28 pb-10 z-10">
                <div className="w-full flex-[55%] flex flex-col items-start justify-start gap-6 md:gap-8">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-wide md:leading-14">
                        Hi 👋,<br/>
                        My name is Amir. <br/>
                        I&#39;m a {renderTypedText()}
                    </h1>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/#about" className="primary-button">
                            Who Am I ?!
                        </Link>
                        <Link href="/#contact" className="primary-button">
                            Connect
                        </Link>
                    </div>
                </div>

                <div className="flex-[45%] relative flex items-center justify-center h-full w-full min-w-0 overflow-hidden">
                    {showSaveToast && (
                        <div className={`absolute bottom-4 left-4 sm:left-1/5 lg:left-8 z-10 flex !flex-row items-center gap-2 bg-background/25 dark:bg-sidebar/25 border border-gray-700/20 
                        text-accent-foreground font-medium px-2.5 py-1.5 rounded-xl shadow-xl 
                        shadow-black/10 backdrop-blur-sm transform transition-all duration-2500
                        ease-out min-w-[200px] max-w-sm
                        ${hideToast
                            ? 'translate-y-[500%] opacity-0'
                            : showSaveToast
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-[500%] opacity-0'
                        }`}
                        >
                            <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-green-600" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-foreground truncate">
                                            Document saved
                                        </p>
                                        <p className="text-tiny text-muted-foreground/70 tracking-wide mt-0.5 max-w-[150px]">
                                            Changes have been saved successfully
                                        </p>
                                    </div>

                                    {/* Keyboard shortcut */}
                                    <div className="flex-shrink-0 hidden sm:flex items-center gap-1 text-tiny text-foreground">
                                        <kbd className="px-2 py-1 bg-background border border-gray-700/30 rounded font-mono shadow-sm">
                                            Ctrl
                                        </kbd>
                                        <span className="text-gray-300">+</span>
                                        <kbd className="px-2 py-1 bg-background border border-gray-700/30 rounded font-mono shadow-sm">
                                            S
                                        </kbd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="code-block">
                        <CodeBlock
                            language="jsx"
                            filename="Portfolio Components"
                            showSaveToast={showSaveToast}
                            hideToast={hideToast}
                            tabs={[
                                {
                                    name: "Hero.tsx",
                                    code: getCodeForRole(codeTypingProfession),
                                    language: "tsx",
                                    highlightLines: [6],
                                },
                                {
                                    name: "package.json",
                                    code: packageJsonFile,
                                    language: "json",
                                    highlightLines: [2, 4],
                                },
                                {
                                    name: "next.config.js",
                                    code: configFile,
                                    language: "javascript",
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;