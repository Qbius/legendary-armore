export async function POST({request, params}) {
    const {endpoint} = params;
    const {method, key, ...rest_body} = await request.json();
    const url = `https://api.guildwars2.com/v2/${endpoint}`;
    const body = (method === 'POST') ? JSON.stringify(rest_body) : undefined;
    const res = await fetch(
        url, 
        {
            method,
            body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
            },
        }
    );
    if (res.ok) {
        const result = await res.json();
        return new Response(JSON.stringify(result), {status: 200});
    }
    else {
        return new Response('', {status: 401});
    }
}