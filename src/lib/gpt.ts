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
                    Please output in the following JSON schema: 
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