"use client";

import { BookMarked, Star } from 'lucide-react';
import Link from "next/link";

const MyGithub = () => {
    return (
        <section id="github" className="section github-section">
            <div className="container section-padding flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5">
                <div className="flex-1 flex flex-col gap-5">
                    <h2 className="section-title text-github-text">My Github</h2>

                    <div className="flex flex-col items-start justify-center gap-2 font-github-sans font-medium">
                        <div className="w-fit flex flex-col gap-2 border-2 border-github-border p-3 rounded-2xl">
                            <div className="w-full flex flex-row gap-3 items-center">
                                <img
                                    id="github-profile-img"
                                    src="https://avatars.githubusercontent.com/u/123266762?v=4"
                                    alt="Github Profile"
                                    className="max-w-12 max-h-12 rounded-full"
                                />
                                <div className="flex flex-col gap-0 h-full">
                                    <a
                                        href="https://github.com/amirallami-code"
                                        className="font-bold"
                                    >
                                        Amirhossein Allami
                                    </a>

                                    <p className="text-github-muted text-sm">amirallami-code · he/him</p>
                                </div>
                            </div>
                            <p>Front-end enthusiast by day, algorithm adventurer by night.</p>
                            <div className="flex flex-row flex-wrap gap-3 text-sm opacity-75">
                                <p>
                                    <b>10</b> repositories
                                </p>
                                <p>
                                    <b>1217</b> followers
                                </p>
                                <p>
                                    <b>243</b> stars earned
                                </p>
                            </div>
                        </div>

                        <div className="github-repos">

                            <div className="github-repo">
                                <div className="flex flex-row gap-2 items-center">
                                    <BookMarked width={15} height={15} className="w-3.5 h-3.5 opacity-80"/>
                                    <Link href="https://github.com/amirallami-code/ai-resume-analyzer" className="text-sm font-semibold text-github-accent line-clamp-1 hover:underline underline-offset-2">
                                        ai-resume-analyzer
                                    </Link>
                                    <span className="text-xs opacity-75 bg-slate-100 dark:bg-slate-900/10 border-2 border-github-border px-1.5 py-0.5 rounded-full">
                                        Public
                                    </span>
                                </div>
                                <p className="text-xs opacity-75 line-clamp-2">
                                    AI-powered Resume Analyzer built with React & Puter.js. Includes seamless auth, upload and store resumes, and match candidates to jobs using smart AI evaluations. All wrapped in a clean, reusable UI.
                                </p>
                            </div>
                            <div className="github-repo">
                                <div className="flex flex-row gap-2 items-center">
                                    <BookMarked width={15} height={15} className="w-3.5 h-3.5 opacity-80"/>
                                    <Link href="https://github.com/amirallami-code/ai-resume-analyzer" className="text-sm font-semibold text-github-accent hover:underline underline-offset-2">
                                        ai-resume-analyzer
                                    </Link>
                                    <span className="text-xs opacity-75 bg-slate-100 dark:bg-slate-900/10 border-2 border-github-border px-1.5 py-0.5 rounded-full">
                                        Public
                                    </span>
                                </div>
                                <p className="text-xs opacity-75 line-clamp-2">
                                    AI-powered Resume Analyzer built with React & Puter.js. Includes seamless auth, upload and store resumes, and match candidates to jobs using smart AI evaluations. All wrapped in a clean, reusable UI.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full">
                    {/*Github Globe*/}
                </div>
            </div>
        </section>
    )
}
export default MyGithub
