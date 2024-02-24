// address enricher

export async function addressEnricher(name: string) {
    let api = '&key=' + process.env.GOOGLE_MAPS_API_KEY;
    console.log(api)
    /*
    const response = await fetch(`https://addressvalidation.googleapis.com/v1:validateAddress?key=` + key, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "address": {
                "regionCode": "US",
                "addressLines": [address]
            }
        })
    })
    */

    let params = new URLSearchParams({
        input: name,
        inputtype: 'textquery',
    });

    const response = await fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Cgeometry&' + params + api);

    const res = await response.json();

    const coords = res.candidates[0].geometry.location;
    const addr = res.candidates[0].formatted_address;
    return {
        coordinates: coords, // lat, lng
        address: addr 
    }
} 