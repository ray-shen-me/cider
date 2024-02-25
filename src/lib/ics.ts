import { CalendarEvent } from "./types";
import * as ics from 'ics';
import * as moment from 'moment';
import 'moment-timezone';

export const convertToICSFormat = (event: CalendarEvent): ics.EventAttributes => {
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
    console.log(event.start);
    // const start = moment.tz(event.start as unknown as string, moment.locale()).toDate();
    // const start = new Date(event.start + "");
    // console.log(new Date().getTimezoneOffset());
    // console.log(start.toLocaleString());

    const details: ics.EventAttributes = {
        start: event.start as [number, number, number, number, number],
        startInputType: "local",
        startOutputType: "local",
        duration: duration || undefined,
        end: event.end ? event.end as [number, number, number, number, number] : undefined,
        title: event.title || undefined,
        description: event.description || undefined,
        location: a.join(', ') || undefined,
        url: event.url || undefined,
        geo: event.geo && event.geo.lat != null && event.geo.long != null ? {
            lat: event.geo.lat,
            lon: event.geo.long
        } : undefined,
        busyStatus: event.busyStatus || undefined,
        transp: event.transp || undefined,
        attendees: event.attendees || undefined
    }
    return details;
}

export const convertEventsToICS = (events: CalendarEvent[]): string => {
    const { error, value } = ics.createEvents(events.map(convertToICSFormat));
    if (error) {
        console.log(error);
        throw new Error('Could not convert to ICS');
    }
    return value || '';
}