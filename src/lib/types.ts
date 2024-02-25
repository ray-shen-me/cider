type Person = {
    name?: string;
    /** Do not include if not directly specified. */
    email?: string;
}

type Attendee = Person & {
    cutype?: "INDIVIDUAL" | "GROUP",
    // xNumGuests?: number
}

// JSON schema: 
export type CalendarEvent = {
    /** Time at which event starts. Format: year, month, day, hour, minute. If a time is not specified, make event last the whole day. */
    start: number[],
    /** How long the event lasts. Either end or duration is required, but not both. */
    duration?: { weeks?: number; days?: number; hours?: number; minutes?: number; seconds?: number };
    /** Time at which event ends. Format: year, month, day, hour, minute. Either end or duration is required, but not both. */
    end?: number[];
    title?: string;
    description?: string;
    location?: {
        /** Do not include address in placeName. */
        placeName?: string;
        /** Do not include if not directly specified, will be enriched with API later. */
        address?: string;
    }
    /** Do not include if not directly specified, will be enriched with API later. */
    geo?: { lat: number; long: number };
    /** Do not include if not directly specified. */
    url?: string;
    /** Determine appropriate status based on event. */
    busyStatus?: "FREE" | "BUSY" | "TENTATIVE";
    /**
     * Specifies event transparency (does event consume actual time of an individual). 
     * Used by Google Calendar to determine if event should change attendees availability to 'Busy' or not.
     */
    transp?: "TRANSPARENT" | "OPAQUE";
    attendees?: Attendee[];
    // exclusionDates?: Date[];
};
