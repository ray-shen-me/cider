"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SiteHeader from "@/components/site-header";
import { useState } from "react";
import { CalendarEvent } from "@/lib/types";

export default function EditorPage() {
    const [docText, setDocText] = useState("");

    // if the generate button hasn't been clicked yet, set to null
    // if there are 0 events returned, set to an empty array
    const [events, setEvents] = useState<CalendarEvent[] | null>(null);

    const generateEvents = async () => {
        const res = await fetch('/api/gen-events', {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain'
            },
            body: docText
        });
        setEvents(await res.json());
        console.log(events)
    }

    let eventCards = events?.map((event) => {
        return <Card>
            <CardHeader>{event.title}</CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
        </Card>
    })

    return (
        <div className="container flex-1 flex flex-col items-stretch gap-4 py-6">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold hidden xs:block">Create Events from Doc</h2>
                </div>
                <Button className="text-sm" onClick={generateEvents}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate <span className="xs:hidden">&nbsp;Events</span>
                </Button>
            </div>
            <div className="flex flex-col flex-grow items-start gap-6">
                <div className="flex flex-1 max-md:flex-col lg:flex-row mx-auto w-full min-w-0 gap-4 lg:gap-6">
                    <div className="flex flex-col flex-1 gap-4">
                        <Card className="flex flex-col flex-1 w-full focus-within:ring-1 focus-within:ring-ring">
                            {/* <CardHeader className="flex flex-row justify-between gap-4 pb-0 items-center">
                            <CardTitle className="text-md font-semibold leading-none tracking-tight">
                                Paste or upload document
                            </CardTitle>

                        </CardHeader> */}
                            <CardContent className="p-0 h-full flex flex-1 flex-col">
                                <textarea placeholder="Paste text here or upload document."
                                    className="h-full flex-1 p-4 xl:p-6 flex min-h-[80px] w-full border-radius rounded-lg bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={docText}
                                    onChange={e => setDocText(e.target.value)}
                                ></textarea>

                            </CardContent>


                        </Card>


                    </div>
                    <div className="flex flex-col gap-4 md:min-w-64 lg:min-w-96">
                        {/* <div className="flex flex-row justify-between items-center">
                                <h2 className="text-md font-semibold leading-none tracking-tight flex-1">Events</h2>
                                <Button className="text-sm">
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate
                                </Button>
                            </div> */}

                        <p className="text-sm m-auto">{eventCards}</p>
                    </div>

                </div>

            </div>
        </div>
    )
}