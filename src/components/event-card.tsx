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

export default function EventCard(props: { event: CalendarEvent }) {
    let event = props.event;
    return (
        <>
            <Dialog>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            {event.title}
                        </CardTitle>
                        <CardDescription>
                            {event.description}


                        </CardDescription>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <EditIcon className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                    </CardHeader>

                    <CardContent>
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