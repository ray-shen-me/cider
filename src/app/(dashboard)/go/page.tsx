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

import SiteHeader from "@/components/site-header";
import { useRef, useState } from "react";
import { CalendarEvent } from "@/lib/types";
import { Input } from "@/components/ui/input";
import EventCard from "@/components/event-card";
import pdf from '@cyber2024/pdf-parse-fixed';
import * as ics from 'ics';
import { addressEnricher } from "@/lib/enricher";
const { writeFileSync } = require('fs')


export default function EditorPage() {
    const [docText, setDocText] = useState("");

    // if the generate button hasn't been clicked yet, set to null
    // if there are 0 events returned, set to an empty array
    const [events, setEvents] = useState<CalendarEvent[] | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);


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

    async function convertToICS(event: CalendarEvent) {
        // if (event.location != null && event.location.placeName && !event.location.placeName) {
        //     event = await addressEnricher(event.location.placeName);
        // }
        // @ts-expect-error
        const duration: ics.DurationObject = event.duration ? {
            weeks: event.duration.weeks,
            days: event.duration.days,
            hours: event.duration.hours,
            minutes: event.duration.minutes,
            seconds: event.duration.seconds,
        } : undefined;
        const a = []
        if (event.location?.placeName) a.push(event.location.placeName);
        if (event.location?.address) a.push(event.location.address);
        const details: ics.EventAttributes = {
            start: event.start.toLocaleString(),
            duration: duration,
            title: event.title,
            description: event.description,
            location: a.join(', '),
            url: event.url,
            geo: event.geo ? {
                lat: event.geo.lat,
                lon: event.geo.long
            } : undefined,
            busyStatus: event.busyStatus,
            transp: event.transp,
            attendees: event.attendees
        }
        return ics.createEvent(details)
    }


    const submitInfo = async () => {
        const ICSevents = events?.map(convertToICS);
        console.log(ICSevents);
        
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
                <Button className="text-sm" onClick={generateEvents}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate <span className="xs:hidden">&nbsp;Events</span>
                </Button>

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
                    <div className="flex flex-col gap-4 md:w-64 lg:w-96 items-end">
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
                    </div>

                </div>

            </div>
        </div >
    )
}