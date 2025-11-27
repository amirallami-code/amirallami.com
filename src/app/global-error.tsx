"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";

export default function GlobalError({error}: { error: Error & { digest?: string } }) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    const handleReset = () => {
        window.location.href = '/';
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <html>
            <body>
                <div className="bg-gradient-to-tl from-secondary to-primary fixed inset-0 z-50 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="hamster-404">
                            <div
                                aria-label="Orange and tan hamster that fell off the wheel"
                                role="img"
                                className="wheel-and-hamster m-auto"
                            >
                                <div className="wheel wheel-broken"></div>
                                <div className="hamster hamster-dizzy">
                                    <div className="hamster__body">
                                        <div className="hamster__head">
                                            <div className="hamster__ear"></div>
                                            <div className="hamster__eye hamster__eye--dizzy"></div>
                                            <div className="hamster__nose"></div>
                                        </div>
                                        <div className="hamster__limb hamster__limb--fr"></div>
                                        <div className="hamster__limb hamster__limb--fl"></div>
                                        <div className="hamster__limb hamster__limb--br"></div>
                                        <div className="hamster__limb hamster__limb--bl"></div>
                                        <div className="hamster__tail"></div>
                                    </div>
                                </div>
                                <div className="spoke"></div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2 mx-3 text-center tracking-wide font-black text-background">
                            <h1 className="text-4xl">Oops!</h1>
                            <h2 className="text-xl">The hamster wheel broke</h2>
                            <p className="font-medium text-sm text-background/80 max-w-md">
                                Something went wrong and our hamster fell off. <br/>
                                Don&#39;t worry, he&#39;s okay (just a bit dizzy).
                            </p>

                            <div className="flex items-center gap-3 mt-5">
                                <button
                                    onClick={handleReload}
                                    className="flex items-center justify-center gap-1.5 font-semibold text-sm text-background px-4 py-2 rounded-3xl bg-secondary hover:bg-secondary/90 transition-colors cursor-pointer"
                                >
                                    <RefreshCw width={15} height={15}/>
                                    Try Again
                                </button>

                                <button
                                    onClick={handleReset}
                                    className="flex items-center justify-center gap-1.5 font-semibold text-sm text-background px-4 py-2 rounded-3xl border-[1px] border-background/30 hover:bg-background/10 transition-colors cursor-pointer"
                                >
                                    <Home width={15} height={15}/>
                                    Go Home
                                </button>
                            </div>

                            {process.env.NODE_ENV === 'development' && (
                                <details className="mt-6 text-left max-w-md">
                                    <summary className="cursor-pointer font-medium text-xs text-background/70 hover:text-background/90">
                                        Error Details
                                    </summary>
                                    <pre className="mt-2 p-3 bg-background/10 rounded-lg text-xs text-background/80 overflow-auto max-h-40">
                            {error.message}
                                        {error.digest && `\nDigest: ${error.digest}`}
                          </pre>
                                </details>
                            )}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}