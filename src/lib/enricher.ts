// address enricher

export type LocationEnrichmentData = { coordinates?: { lat: number; lng: number; }; address?: string };

export async function addressEnricher(name: string): Promise<LocationEnrichmentData> {
    let api = '&key=' + process.env.GOOGLE_MAPS_API_KEY;

    let params = new URLSearchParams({
        input: name,
        inputtype: 'textquery',
    });

    const response = await fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Cgeometry&' + params + api);

    const res = await response.json();

    if (res.candidates.length == 0) {
        return {
            coordinates: undefined,
            address: undefined
        };
    }

    const coords = res.candidates[0].geometry?.location;
    const addr = res.candidates[0].formatted_address;
    return {
        coordinates: coords, // lat, lng
        address: addr
    }
} 