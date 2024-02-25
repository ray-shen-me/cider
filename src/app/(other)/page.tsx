import Image from "next/image";
import { Github } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import DemoAnimation from "@/components/demo-animation";

export default function Home() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl">
            Events from Documents
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Quickly create calendar events with Cider! Cider is an AI powered document analyzer that automatically creates .ics files with titles, dates, descriptions, etc.
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              rel="noreferrer"
              href="/go"
              className={buttonVariants({ variant: "default" })}
            >
              Get started
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={buttonVariants({ variant: "outline" })}
            >
              GitHub
            </Link>
          </div>
        </div>
        <DemoAnimation></DemoAnimation>

      </div>

    </section>
  )
}
