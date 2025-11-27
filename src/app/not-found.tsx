import type { Metadata } from 'next';
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Page Not Found",
    description: "Unfortunately the page you are looking for can't be found.",
}

export default function NotFound() {
    return (
        <div className={`bg-gradient-to-tl from-secondary to-primary fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300`}>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="hamster-404">
                    <div aria-label="Orange and tan hamster running in a metal wheel"
                         role="img"
                         className="wheel-and-hamster m-auto">
                        <div className="wheel"></div>
                        <div className="hamster">
                            <div className="hamster__body">
                                <div className="hamster__head">
                                    <div className="hamster__ear"></div>
                                    <div className="hamster__eye"></div>
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
                    <h1 className="text-4xl">404</h1>
                    <h2 className="text-xl">Our hamster couldn&#39;t find this page</h2>
                    <p className="font-medium text-sm text-background/80">
                        He&#39;s been running in circles, but your page <br/>
                        seems to have escaped the wheel.
                    </p>

                    <Link href="/"
                          className="flex items-center justify-center gap-1 font-semibold text-sm text-background mt-5 px-3 py-2 rounded-3xl bg-secondary cursor-pointer">
                        Go Home
                        <ArrowRight width={15} height={15}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}