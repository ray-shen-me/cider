import { generateEvents } from "@/lib/gpt"

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
    try {
        const documentText = await request.text();
        const events = await generateEvents(documentText);
        return Response.json(events);
    } catch (e) {
        return new Response(`Error`, {
            status: 500,
        })
    }

}