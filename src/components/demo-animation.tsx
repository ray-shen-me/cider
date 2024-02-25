"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DemoAnimation() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, theme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    return <div className="mx-auto relative max-md:max-w-[400px] w-full md:min-w-[400px] lg:flex-1 aspect-square md:max-h-[calc(100vh-170px)] md:max-w-[calc(100vh-170px)]">
        {mounted ? <>
            <img src={`/Frame1${theme === 'dark' ? 'Dark' : ''}.svg`} alt="Frame 1" className="absolute top-0 left-0 anim1 drop-shadow-md" />
            <img src={`/Frame2${theme === 'dark' ? 'Dark' : ''}.svg`} alt="Frame 1" className="absolute top-0 left-0 anim2 drop-shadow-md" />
            <img src={`/Frame3${theme === 'dark' ? 'Dark' : ''}.svg`} alt="Frame 1" className="absolute top-0 left-0 anim3 drop-shadow-md" />
            <img src={`/Frame4${theme === 'dark' ? 'Dark' : ''}.svg`} alt="Frame 1" className="absolute top-0 left-0 anim4 drop-shadow-md" />
        </> : null}
    </div>;
}