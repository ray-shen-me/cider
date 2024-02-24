import * as ics from 'ics'
import { datetime, RRule, RRuleSet, rrulestr } from 'rrule'
import OpenAI from 'openai';
import schemaString from './calendar-event.schema.json.txt';
import { CalendarEvent } from './types';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Use OpenAI JSON mode
export async function generateEvents(text: string): Promise<CalendarEvent[]> {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content:
                    `You are an event planning assistant helping a user create calendar events from a document they will provide to you.
                    Today is ${new Date().toDateString()}.
                    Make events without specified times last the whole day.
                    Respond with a JSON object with these *exact* properties:
                    - "events": an array of events, each exactly following the JSON schema below, or an empty array if no events are found.
                    For each event in "events", use the following schema: ${schemaString}`
            },
            {
                role: 'user',
                content: `Document text: \n${text}`
            }
        ],
        model: 'gpt-3.5-turbo-1106',
        response_format: { type: 'json_object' }
    });
    const msg = completion.choices[0].message.content;
    if (msg == null) throw new Error("Error communicating with OpenAI API.");
    const json: { events: CalendarEvent[] } = JSON.parse(msg);
    return json.events;
}