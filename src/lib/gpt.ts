import * as ics from 'ics'
import { datetime, RRule, RRuleSet, rrulestr } from 'rrule'
import OpenAI from 'openai';
import schemaString from './calendar-events.schema.json.txt';
import { CalendarEvents } from './types';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Use OpenAI JSON mode
export async function generateEvents(text: string): Promise<CalendarEvents> {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content:
                    `You are an event planning assistant helping a user create calendar events from a document they will provide to you.
                    Today is ${new Date().toDateString()}.
                    Please list the events described in the document, and respond with a JSON array following the JSON schema below, and if no events are found, respond with an empty array: 
                    ${schemaString}`
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
    const events: CalendarEvents = JSON.parse(msg);
    return events;
}