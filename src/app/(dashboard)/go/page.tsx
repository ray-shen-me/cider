"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileTextIcon, Sparkles, UploadIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import doc1 from '/samples/doc1.txt';
import doc2 from '/samples/doc2.txt';
import doc3 from '/samples/doc3.txt';
import SiteHeader from "@/components/site-header";
import { useEffect, useRef, useState } from "react";
import { CalendarEvent } from "@/lib/types";
import { Input } from "@/components/ui/input";
import EventCard from "@/components/event-card";
import pdf from '@cyber2024/pdf-parse-fixed';
import * as ics from 'ics';
import { LocationEnrichmentData, addressEnricher } from "@/lib/enricher";
import { convertEventsToICS } from "@/lib/ics";
import { OpenAIStream, AIStream, StreamingTextResponse } from 'ai'
import { Skeleton } from "@/components/ui/skeleton";


const enrichEvent = async (event: CalendarEvent): Promise<CalendarEvent> => {
    if (event.location?.placeName == null && event.location?.address == null) return event;
    const a = []
    if (event.location?.placeName) a.push(event.location.placeName);
    if (event.location?.address) a.push(event.location.address);
    const query = a.join(', ');

    const res = await fetch('/api/location-enrichment?'
        + new URLSearchParams({ name: query }));
    const data: LocationEnrichmentData = await res.json();
    if (data.coordinates) {
        event.geo = {
            lat: data.coordinates.lat,
            long: data.coordinates.lng
        }
    }
    if (data.address)
        event.location.address = data.address;
    return event;
}

export default function EditorPage() {
    const [docText, setDocText] = useState("");

    // if the generate button hasn't been clicked yet, set to null
    // if there are 0 events returned, set to an empty array
    const [events, setEvents] = useState<CalendarEvent[] | null>(null);

    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log(events);
    }, [events])

    // const generateEvents = async () => {
    //     const res = await fetch('/api/gen-events', {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'text/plain'
    //         },
    //         body: docText
    //     });
    //     const unenriched: CalendarEvent[] = await res.json();
    //     const enrichedEvents = await Promise.all(unenriched.map(enrichEvent));
    //     setEvents(enrichedEvents);
    // }


    const generateEventsStreaming = async () => {
        setLoading(true);
        const res = await fetch('/api/gen-events/streaming', {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain'
            },
            body: docText
        });
        setEvents([]);
        const enriched: CalendarEvent[] = [];
        let currentEventJson = "";
        let parenStack: string[] = [];

        const handleChar = (char: string) => {
            if (parenStack.length >= 2) {
                if (char == "," && currentEventJson == "")
                    return;
                currentEventJson += char;
            }

            if (currentEventJson[currentEventJson.length - 1] != "\\") {
                if (char == "\"") {
                    if (parenStack[parenStack.length - 2] == "\"") {
                        parenStack.pop();
                    }
                }
                if ("[{".includes(char) && parenStack[parenStack.length - 2] != "\"") {
                    parenStack.push(char);
                }
                if ("}]".includes(char) && parenStack[parenStack.length - 2] != "\"") {
                    parenStack.pop();
                    if (parenStack.length == 2 && parenStack[0] == "{" && parenStack[1] == "[") {
                        enrichEvent(JSON.parse(currentEventJson)).then(e => {
                            setEvents(oldEvents => oldEvents ? [...oldEvents, e] : [e]);
                        })
                        currentEventJson = "";
                    }
                }
            }
        }
        const reader = res.body?.getReader();
        if (!reader) return;
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                setLoading(false);
                break;
            }
            const chunk = new TextDecoder().decode(value);
            for (let i = 0; i < chunk.length; i++) {
                const char = chunk[i];
                handleChar(char);
            }
        }

        // const stream = OpenAIStream(res, {
        //     onToken: async token => {
        //         console.log(token)
        //         for (const char of token) {
        //             handleChar(char)
        //         }
        //     }
        // });
        // stream.tee();
    }

    const generateEvents = generateEventsStreaming;

    const submitInfo = async () => {
        if (!events) return;
        const icsText = convertEventsToICS(events);
        const blob = new Blob([icsText], {
            type: "text/calendar"
        });
        const url = window.URL.createObjectURL(blob);;
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = 'events.ics';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    const onFileInputChange = async () => {
        if (!fileInputRef.current) return;
        if (!fileInputRef.current.files || fileInputRef.current.files.length == 0) return;

        const file = fileInputRef.current.files[0];
        const pdfData = await pdf(Buffer.from(await file.arrayBuffer()));
        setDocText(pdfData.text);
        generateEvents();
    }

    return (
        <div className="container flex-1 flex flex-col items-stretch gap-4 py-6">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold hidden xs:block">Create Events from Doc</h2>
                </div>
                <div className="flex flex-row gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="mr-7 !outline-none" asChild>
                            <Button variant="outline" className="!outline-none">
                                Samples
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setDocText(doc1)}>Sample 1</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDocText(doc2)}>Sample 2</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDocText(doc3)}>Sample 3</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="text-sm" onClick={generateEvents}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate <span className="xs:hidden">&nbsp;Events</span>
                    </Button>
                </div>

            </div>
            <div className="flex flex-col flex-grow items-start gap-6">
                <div className="flex flex-1 max-md:flex-col lg:flex-row mx-auto w-full min-w-0 gap-4 lg:gap-6">
                    <div className="flex flex-col flex-1 gap-4">

                        <Card className="flex flex-col flex-1 w-full">
                            <CardContent className="p-0 h-full flex flex-1 flex-col justify-center items-center relative">
                                <Textarea placeholder="Paste text here or upload document."
                                    className={"rounded-xl h-full flex-1 p-6 flex border-none " + (fileInputRef.current?.files?.length ? "hidden" : "")}
                                    value={docText}
                                    onChange={e => setDocText(e.target.value)}
                                ></Textarea>
                                {
                                    fileInputRef.current?.files?.length ? (
                                        <div className="flex flex-row gap-3 items-center">
                                            <FileTextIcon className="h-10 w-10" />
                                            <div className="flex flex-col space-y-1.5 ">
                                                <CardTitle>Uploaded file</CardTitle>
                                                <p className="text-sm text-muted-foreground">{fileInputRef.current?.files[0].name}</p>
                                            </div>
                                        </div>
                                    ) : null
                                }
                                <input onChange={onFileInputChange} accept="application/pdf" type="file" className="hidden" name="Upload file" id="upload-input" ref={fileInputRef} />
                                <label htmlFor="upload-input" className={"absolute right-4 top-4 transition-opacity " + (docText ? 'hidden' : 'block')}>
                                    <Button type="button" onClick={() => fileInputRef.current?.click()} variant="secondary" size="icon" aria-label="Upload file">
                                        <UploadIcon className="h-4 w-4" />
                                    </Button>
                                </label>


                            </CardContent>


                        </Card>


                    </div>
                    <div className="flex flex-col gap-4 md:w-64 lg:w-96 md:max-w-64 lg:max-w-96 items-end">
                        <div className={"md:hidden " + (!events?.length ? "hidden" : "")}>
                            <Button className="text-sm" onClick={submitInfo}>
                                Export
                            </Button>
                        </div>


                        {events?.map((event, index) => { //Meeting with Ray Shen Tomorrow to work on Project at Oakton High School
                            return <EventCard
                                event={event}
                                key={index}
                            />
                        })}
                        {loading ?
                            <Card className="max-w-full md:w-64 lg:w-96 self-stretch">
                                <CardContent className="flex flex-col space-y-2 p-6">
                                    <Skeleton className="h-4 w-[100%]" />
                                    <Skeleton className="h-4 w-[100%]" />
                                    <Skeleton className="h-4 w-[70%]" />
                                </CardContent>

                            </Card> : null}
                    </div>

                </div>

            </div>
        </div >
    )
}