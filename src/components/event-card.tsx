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
import { EditIcon, MapPinIcon } from "lucide-react";
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
                        {event.location ?
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-1 flex-col justify-center w-4">
                                    <MapPinIcon className="w-4 h-4" />
                                </div>
                                <p className="text-sm font-medium">{event.location.placeName}</p>
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
                            <Input id="desc" value={event.location?.placeName} className="col-span-3" />
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