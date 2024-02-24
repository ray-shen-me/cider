import { addressEnricher } from "@/lib/enricher";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);

        const name = url.searchParams.get("name");
        if (name == null)
            return new Response('Error', {
                status: 500,
            });
        return Response.json(await addressEnricher(name));
    }
    catch (e){
        console.log(e)
        return new Response('Error', {
            status: 500,
        })
    }
}