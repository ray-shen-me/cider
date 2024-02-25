import Image from "next/image";
import { Github } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl">
            Events from Documents
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Accessible and customizable components that you can copy and paste
            into your apps. Free. Open Source. And Next.js 13 Ready.
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
        <div className="mx-auto relative max-md:max-w-[400px] w-full md:min-w-[400px] lg:flex-1 aspect-square md:max-h-[calc(100vh-170px)] md:max-w-[calc(100vh-170px)]">
          
          <img src="/Frame1.svg" alt="Frame 1" className="absolute top-0 left-0 anim1 drop-shadow-md" />
          <img src="/Frame2.svg" alt="Frame 1" className="absolute top-0 left-0 anim2 drop-shadow-md" />
          <img src="/Frame3.svg" alt="Frame 1" className="absolute top-0 left-0 anim3 drop-shadow-md" />
          <img src="/Frame4.svg" alt="Frame 1" className="absolute top-0 left-0 anim4 drop-shadow-md" />

        </div>
       
      </div>

    </section>
  )
}
