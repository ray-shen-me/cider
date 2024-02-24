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

export default function EventCard({ ...props  }) {
    let title = props.title;
    let desc = props.desc;
    let location = props.location;

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>
                    <Input type='text' defaultValue={title}/>
                </CardTitle>
                </CardHeader>
                <CardDescription>
                    <Input type='text' defaultValue={desc}/>
                </CardDescription>
            <CardContent></CardContent>
            <CardFooter><Input type='text' defaultValue={location}/></CardFooter>
        </Card>
    )
}