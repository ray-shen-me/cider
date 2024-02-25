"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { EditIcon, Link2Icon, MapPinIcon } from "lucide-react";
import { Label } from "./ui/label";

const formatDay = (date: Date): string => {
    return date.toLocaleDateString('default', { month: "short", day: "numeric", year: "numeric" });
}

const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatStartEnd = (start: Date, end: Date): string => {
    if (start.getDate() == end.getDate()) {
        return formatDay(start) + '\n' + formatTime(start) + ' to ' + formatTime(end);
    }
    return `${formatDay(start)} ${formatTime(start)} - ${formatDay(end)} ${formatTime(end)}`
}

const dateArrayToDate = (dateArray: number[]): Date => {
    return new Date(`${dateArray[1]}-${dateArray[2]}-${dateArray[0]} ${dateArray[3] || 0}:${dateArray[4] || 0}`);
}

export default function EventCard(props: { event: CalendarEvent }) {
    let event = props.event;
    let end = event.end ? dateArrayToDate(event.end) : dateArrayToDate(event.start);
    if (!event.end && event.duration) {
        let time = end.getTime();
        time += (event.duration.weeks || 0) * 1000 * 60 * 60 * 24 * 7;
        time += (event.duration.days || 0) * 1000 * 60 * 60 * 24;
        time += (event.duration.hours || 0) * 1000 * 60 * 60;
        time += (event.duration.minutes || 0) * 1000 * 60;
        time += (event.duration.seconds || 0) * 1000;
        end.setTime(time);
    }
    return (
        <>
            <Dialog>
                <Card className="flex-1 md:w-64 lg:w-96">
                    <CardHeader className="pb-4">
                        <div className="flex flex-row justify-between">
                            <CardTitle>
                                {event.title}
                            </CardTitle>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="mt-[-10px] mr-[-10px]">
                                    <EditIcon className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                        </div>

                        <CardDescription>
                            {event.description}


                        </CardDescription>

                    </CardHeader>

                    <CardContent className="flex flex-col gap-2">
                        <div className="flex flex-row gap-4">
                            {/* <div className="flex flex-col justify-center w-4">
                                <Link2Icon className="w-4 h-4" />
                            </div> */}
                            <p className="text-sm font-medium">{formatStartEnd(dateArrayToDate(event.start), end)}</p>
                        </div>
                        {event.location?.placeName || event.location?.address ?
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col justify-center w-4">
                                    <MapPinIcon className="w-4 h-4" />
                                </div>
                                <p className="text-sm font-medium">{event.location.placeName}
                                    {event.location.address ?
                                        <>
                                            <br />
                                            {event.location.address}
                                        </> : null
                                    }</p>
                            </div> : null}
                        {event.url ?
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col justify-center w-4">
                                    <Link2Icon className="w-4 h-4" />
                                </div>
                                <a className="text-sm font-medium underline underline-offset-4 truncate" target="_blank" href={event.url}>{event.url}</a>
                            </div> : null}
                    </CardContent>
                </Card>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit event</DialogTitle>
                        <DialogDescription>
                            Make changes to your event here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">
                                Title
                            </Label>
                            <Input id="title" value={event.title} className="col-span-3" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="desc">
                                Description
                            </Label>
                            <Input id="desc" value={event.description} className="col-span-3" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="desc">
                                Location
                            </Label>
                            <Input id="desc" value={event.location ? event.location?.placeName + ", " + event.location?.address : ""} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}