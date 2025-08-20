'use client';

import Link from 'next/link';
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    oneLight,
    oneDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import {useThemeContext} from "@/components/ThemeProvider";

type CodeBlockProps = {
    language: string;
    filename: string;
    highlightLines?: number[]; } & ( | { code: string; tabs?: never; } | { code?: never; tabs: Array<{ name: string; code: string; language?: string; highlightLines?: number[]; }>; });

export const CodeBlock = ({language, filename, code, highlightLines = [], tabs = [],}: CodeBlockProps) => {
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
                    <div className="flex  overflow-x-auto">
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
                            {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
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
                    fontSize: "0.875rem", // text-sm equivalent
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

const Hero = () => {

    const heroFile = `...
<div className="w-full flex-[60%] flex flex-col items-start justify-start gap-3 md:gap-6">
    <h1 className="text-2xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 bg-opacity-50">
        Hi, <br/>
        My name is Amir. <br/>
        I'm <span>Front-end Developer</span>
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

    return (
        <section id="hero" className="relative reverse-section min-h-[90dvh]">
            <div className="container relative h-full w-full flex flex-col lg:flex-row items-center justify-center gap-6 pt-28 pb-10 z-10">
                <div className="w-full flex-[55%] flex flex-col items-start justify-start gap-3 md:gap-6">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 bg-opacity-50">
                        Hi, <br/>
                        My name is Amir. <br/>
                        I&#39;m <span>Front-end Developer</span>
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

                <div className="flex-[45%] flex items-center justify-center h-full w-full min-w-0">
                    <div className="code-block">
                        <CodeBlock
                            language="jsx"
                            filename="Portfolio Components"
                            tabs={[
                                {
                                    name: "Hero.tsx",
                                    code: heroFile,
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
