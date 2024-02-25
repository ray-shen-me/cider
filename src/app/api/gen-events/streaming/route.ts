import { generateEvents } from "@/lib/gpt"
import OpenAI from "openai";
import schemaString from '@/lib/calendar-event.schema.json.txt';
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
    try {
        const documentText = await request.text();
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content:
                        `You are an event planning assistant helping a user create calendar events from a document they will provide to you.
                        Today is ${new Date().toDateString()}.
                        Make sure to create events each for due date and thing the user should be reminded about, like submitting forms.
                        Events without specified times should last the whole day.
                        Respond with a JSON object with these *exact* properties:
                        - "events": an array of events, each exactly following the JSON schema below, or an empty array if no events are found.
                        For each event in "events", use the following schema: ${schemaString}`
                },
                {
                    role: 'user',
                    content: `Document text: \n${documentText}`,
                }
            ],
            model: 'gpt-3.5-turbo-1106',
            response_format: { type: 'json_object' },
            stream: true,
            temperature: 0
        });

        const stream = OpenAIStream(completion);

        return new StreamingTextResponse(stream);
    } catch (e) {
        return new Response(`Error`, {
            status: 500,
        })
    }

}