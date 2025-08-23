'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import { useThemeContext } from '@/components/ThemeProvider';
import { AnimatePresence, motion } from 'motion/react';

// Toast + typing timing configuration
const TIMING_CONFIG = {
    codeTypingSpeed: 30,
    codeDeletionSpeed: 30,
    codeDeleteToTypeDelay: 100,

    mainTypingSpeed: 110,
    mainDeletionSpeed: 15,
    mainDeleteToTypeDelay: 1,

    toastShowDelay: 100,
    toastDuration: 1750,
    toastHideDelay: 300,

    professionDisplayTime: 2500,
    cycleStartDelay: 300,
    initialCycleDelay: 500,
    charAppearDuration: 250,
    charDeleteDuration: 150,
};

type CodeBlockProps = {
    language: string;
    filename: string;
    highlightLines?: number[];
    code?: string;
    tabs?: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
    }>;
};

export const CodeBlock = ({language, filename, code, tabs = [], highlightLines = [],}: CodeBlockProps) => {
    const { theme } = useThemeContext();
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const tabsExist = tabs.length > 0;

    const copyToClipboard = async () => {
        const textToCopy = tabsExist ? tabs[activeTab].code : code;
        if (!textToCopy) return;
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Clipboard copy failed', err);
        }
    };

    const activeCode = tabsExist ? tabs[activeTab].code : code || '';
    const activeLanguage = tabsExist ? tabs[activeTab].language || language : language;
    const activeHighlightLines = tabsExist ? tabs[activeTab].highlightLines || [] : highlightLines;
    const hlColor = theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)';

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
                                    activeTab === index ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
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
                            aria-label="Copy code"
                            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>
                )}
            </div>
            <SyntaxHighlighter
                language={activeLanguage}
                style={theme === 'light' ? oneLight : oneDark}
                customStyle={{
                    margin: 0,
                    padding: 0,
                    background: 'transparent',
                    fontSize: '0.875rem',
                }}
                wrapLines
                showLineNumbers
                lineProps={(lineNumber) => ({
                    style: {
                        backgroundColor: activeHighlightLines.includes(lineNumber) ? hlColor : 'transparent',
                        display: 'block',
                        width: '100%',
                    },
                })}
                PreTag="div"
            >
                {String(activeCode)}
            </SyntaxHighlighter>
        </div>
    );
};

const Hero = () => {
    const roles = ['UI/UX Designer', 'Web Developer', 'Graphic Designer'];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedProfession, setDisplayedProfession] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [codeTypingProfession, setCodeTypingProfession] = useState('Web Developer');
    const timers = useRef<number[]>([]);

    // Clear timers on unmount
    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const queueTimeout = (fn: () => void, ms: number) => {
        const id = window.setTimeout(fn, ms);
        timers.current.push(id);
    };

    const typeCodeProfession = (target: string) =>
        new Promise<void>((resolve) => {
            const current = codeTypingProfession;
            if (current.length > 0) {
                let i = current.length;
                const del = setInterval(() => {
                    if (i > 0) {
                        setCodeTypingProfession(current.slice(0, i - 1));
                        i--;
                    } else {
                        clearInterval(del);
                        let j = 0;
                        const type = setInterval(() => {
                            if (j < target.length) {
                                setCodeTypingProfession(target.slice(0, j + 1));
                                j++;
                            } else {
                                clearInterval(type);
                                resolve();
                            }
                        }, TIMING_CONFIG.codeTypingSpeed);
                    }
                }, TIMING_CONFIG.codeDeletionSpeed);
            } else {
                let j = 0;
                const type = setInterval(() => {
                    if (j < target.length) {
                        setCodeTypingProfession(target.slice(0, j + 1));
                        j++;
                    } else {
                        clearInterval(type);
                        resolve();
                    }
                }, TIMING_CONFIG.codeTypingSpeed);
            }
        });

    const typeProfession = (target: string) =>
        new Promise<void>((resolve) => {
            const current = displayedProfession;
            if (current.length > 0) {
                setIsDeleting(true);
                let i = current.length;
                const del = setInterval(() => {
                    if (i > 0) {
                        setDisplayedProfession(current.slice(0, i - 1));
                        i--;
                    } else {
                        clearInterval(del);
                        setIsDeleting(false);
                        let j = 0;
                        setIsTyping(true);
                        const type = setInterval(() => {
                            if (j < target.length) {
                                setDisplayedProfession(target.slice(0, j + 1));
                                j++;
                            } else {
                                clearInterval(type);
                                setIsTyping(false);
                                resolve();
                            }
                        }, TIMING_CONFIG.mainTypingSpeed);
                    }
                }, TIMING_CONFIG.mainDeletionSpeed);
            } else {
                let j = 0;
                setIsTyping(true);
                const type = setInterval(() => {
                    if (j < target.length) {
                        setDisplayedProfession(target.slice(0, j + 1));
                        j++;
                    } else {
                        clearInterval(type);
                        setIsTyping(false);
                        resolve();
                    }
                }, TIMING_CONFIG.mainTypingSpeed);
            }
        });

    const getCodeForRole = (role: string) => `...
<div className="w-full flex-[55%] flex flex-col items-start justify-start gap-6 md:gap-8">
  <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-wide md:leading-14">
    Hi 👋,<br/>
    My name is Amir. <br/>
    I'm a <span>${role}</span>
  </h1>
  <div className="flex flex-wrap gap-3">
    <Link href="/#about" className="primary-button">Who Am I ?!</Link>
    <Link href="/#contact" className="primary-button">Connect</Link>
  </div>
</div>
...`;

    useEffect(() => {
        if (displayedProfession === '') setDisplayedProfession('Web Developer');
    }, []);

    useEffect(() => {
        const cycle = async () => {
            const role = roles[currentRoleIndex];
            await typeCodeProfession(role);
            await new Promise((res) => {
                queueTimeout(() => {
                    setToastOpen(true);
                    queueTimeout(() => setToastOpen(false), TIMING_CONFIG.toastDuration);
                    res(void 0);
                }, TIMING_CONFIG.toastShowDelay);
            });
            await typeProfession(role);
            queueTimeout(() =>
                    setCurrentRoleIndex((prev) => (prev + 1) % roles.length),
                TIMING_CONFIG.professionDisplayTime
            );
        };

        const id = window.setTimeout(cycle, TIMING_CONFIG.cycleStartDelay);
        timers.current.push(id);
        return () => clearTimeout(id);
    }, [currentRoleIndex]);

    const renderTypedText = () => (
        <span className="relative">
      {displayedProfession.split('').map((char, i) => (
          <span
              key={`${currentRoleIndex}-${i}`}
              className={`${char === ' ' ? 'inline-block w-[0.25em]' : 'inline-block'}`}
              style={{
                  animation:
                      isTyping && i === displayedProfession.length - 1
                          ? `scale-bounce ${TIMING_CONFIG.charAppearDuration}ms ease-out forwards`
                          : isDeleting
                              ? `char-delete ${TIMING_CONFIG.charDeleteDuration}ms ease-out forwards`
                              : 'none',
              }}
          >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
    );

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

    const nextConfigTsFile = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;`;

    return (
        <section id="hero" className="relative reverse-section">
            <div className="container relative h-full w-full flex flex-col lg:flex-row items-center justify-center gap-8 pt-28 md:pt-32 pb-10 md:pb-24 z-10">
                <div className="w-full flex-[55%] flex flex-col items-start justify-start gap-6 md:gap-8">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-wide md:leading-14">
                        Hi 👋,<br />
                        My name is Amir. <br />
                        I&#39;m a {renderTypedText()}
                    </h1>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/#about" className="primary-button">Who Am I ?!</Link>
                        <Link href="/#contact" className="primary-button">Connect</Link>
                    </div>
                </div>

                <div className="flex-[45%] relative flex items-center justify-center h-full w-full min-w-0 overflow-hidden">
                    <AnimatePresence>
                        {toastOpen && (
                            <motion.div
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 80, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="absolute bottom-4 left-4 sm:left-1/5 lg:left-8 z-10 flex flex-row items-center gap-2
                                              bg-background/25 dark:bg-sidebar/25 border border-gray-700/20 text-accent-foreground
                                              font-medium px-2.5 py-1.5 rounded-xl shadow-xl shadow-black/10 backdrop-blur-sm
                                              min-w-[200px] max-w-sm pointer-events-none"
                            >
                                <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-foreground truncate">Document saved</p>
                                    <p className="text-[11px] flex text-muted-foreground/70 tracking-wide mt-0.5 max-w-[150px]">
                                        Changes have been saved successfully
                                    </p>
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-1 text-[11px] text-foreground">
                                    <kbd className="px-2 py-1 bg-background/10 backdrop-blur-md border border-gray-700/30 rounded font-mono shadow-sm">Ctrl</kbd>
                                    <span className="text-gray-300">+</span>
                                    <kbd className="px-2 py-1 bg-background/10 backdrop-blur-md border border-gray-700/30 rounded font-mono shadow-sm">S</kbd>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="code-block">
                        <CodeBlock
                            language="jsx"
                            filename="Portfolio Components"
                            tabs={[
                                {
                                    name: 'Hero.tsx',
                                    code: getCodeForRole(codeTypingProfession),
                                    language: 'tsx',
                                    highlightLines: [6],
                                },
                                {
                                    name: 'package.json',
                                    code: packageJsonFile,
                                    language: 'json',
                                    highlightLines: [2, 4],
                                },
                                {
                                    name: 'next.config.ts',
                                    code: nextConfigTsFile,
                                    language: 'ts',
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
