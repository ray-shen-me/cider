import { Github } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { PropsWithChildren } from "react";

export default function SiteHeader({ children }: PropsWithChildren) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <a href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">Cider</span>
                    </a>
                    <nav className="flex items-center gap-6 text-sm"></nav>
                </div>
                <div className="margin-auto"></div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        <Link href="https://github.com" target="_blank" rel="noreferrer">
                            <div
                                className={buttonVariants({
                                    size: "icon",
                                    variant: "ghost",
                                })}
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <ThemeToggle></ThemeToggle>
                        {children}
                    </nav>
                </div>
            </div>

        </header>
    );
}