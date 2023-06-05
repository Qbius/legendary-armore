export async function POST({request}) {
    const {key} = await request.json();
    const res_bank = await fetch(
        `https://api.guildwars2.com/v2/account/bank`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
            },
        }
    );
    const res_wallet = await fetch(
        `https://api.guildwars2.com/v2/account/wallet`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
            },
        }
    );
    const res_materials = await fetch(
        `https://api.guildwars2.com/v2/account/materials`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
            },
        }
    );
    const res_legendaryarmory = await fetch(
        `https://api.guildwars2.com/v2/account/legendaryarmory`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
            },
        }
    );
    if (res_bank.ok && res_wallet.ok && res_materials.ok && res_legendaryarmory.ok) {
        const bank = await res_bank.json();
        const wallet = await res_wallet.json();
        const materials = await res_materials.json();
        const legendaryarmory = await res_legendaryarmory.json();
        return new Response(JSON.stringify({bank, wallet, materials, legendaryarmory}), {status: 200});
    }
    else {
        return new Response('', {status: 401});
    }
}