type Person = {
    name?: string;
    email?: string;
}

type Attendee = Person & {
    cutype?: "INDIVIDUAL" | "GROUP",
    // xNumGuests?: number
}

// JSON schema: 
export type CalendarEvent = {
    start: Date,
    /** Whether the start time is in local or UTC time. */
    startInputType: "local" | "utc";
    /** How long the event lasts. Either end or duration is required, but not both. */
    duration?: { weeks?: number; days?: number; hours?: number; minutes?: number; seconds?: number };
    /** Time at which event ends. Either end or duration is required, but not both. */
    end?: Date;
    title?: string;
    description?: string;
    /** Do not include if not directly specified, will be enriched with API later. */
    geo?: { lat: number; long: number };
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

export type CalendarEvents = CalendarEvent[];