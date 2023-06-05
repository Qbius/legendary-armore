

async function get_endpoint(endpoint, key, method='GET') {
    const res = await fetch(
        `/api/${endpoint}`, 
        {
            method: 'POST',
            body: JSON.stringify({method, key}),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    if (res.ok) {
        return await res.json();
    }
}

const ids = {
    wallet: {
        "19": "Airship Part",
        "20": "Ley Line Crystal",
        "22": "Lump of Aurillium",
        "23": "Spirit Shard",
        "29": "Provisional Token",
        "70": "Legendary Insight"
    },
    materials: {
        "19675": "Mystic Clover",
        "19925": "Obsidian Shard",
        "73537": "Auric Ingot",
        "72205": "Chak Egg",
        "74356": "Reclaimed Metal Plate",
        "73248": "Stabilizing Matrix",
        "71994": "Ball of Dark Energy",
        "73137": "Cube of Stabilized Dark Energy",
        "69432": "Pile of Auric Dust",
        "68944": "Auric Sliver",
    },
    legendaryarmory: {
        "80111": "Perfected Envoy Gloves",
        "80384": "Perfected Envoy Helmet",
        "80254": "Perfected Envoy Breastplate",
        "80252": "Perfected Envoy Leggings",
        "80161": "Perfected Envoy Vambraces",
        "80248": "Perfected Envoy Cowl",
        "80557": "Perfected Envoy Greaves",
        "80131": "Perfected Envoy Mantle",
        "80281": "Perfected Envoy Boots",
        "80435": "Perfected Envoy Pauldrons",
        "80145": "Perfected Envoy Shoulderpads",
        "80296": "Perfected Envoy Mask",
        "80190": "Perfected Envoy Vestments",
        "80277": "Perfected Envoy Tassets",
        "80205": "Perfected Envoy Gauntlets",
        "80578": "Perfected Envoy Jerkin",
        "80356": "Perfected Envoy Pants",
        "80399": "Perfected Envoy Shoes"
    },
    bank: {
        "78866": "Gift of Prosperity",
        "78989": "Gift of Prowess",
        "78936": "Gift of Dedication",
        "77451": 'Gift of Craftsmanship',
        "78793": "Gift of the Pact",
        "20852": "Eldritch Scroll",
    }
}

async function get_info(key) {
    const res = await Promise.all(Object.entries(ids).map(([category, mapped]) => (async () => {
        const payload = await get_endpoint(`account/${category}`, key);
        const counts = Object.fromEntries(payload.filter(o => o?.id && o.id in mapped).map(o => [mapped[o.id], o.count ?? o.value]));
        return [category, Object.fromEntries(Object.values(mapped).map(name => [name, counts[name] ?? 0]))];
    })()));
    return Object.fromEntries(res);
}

export async function calc(key) {
    const {wallet, materials, bank, legendaryarmory} = await get_info(key);
    const pieces = Object.values(legendaryarmory).filter(count => count > 0).length;
    const individual = Object.fromEntries(Object.entries({
        'Provisioner Token': {base: wallet['Provisional Token'], per: 50, extra: {'Gift of Prosperity': bank['Gift of Prosperity'], 'Gift of Craftsmanship': bank['Gift of Craftsmanship']}},
        'Mystic Clover': {base: materials['Mystic Clover'], per: 15, extra: {'Gift of Prosperity': bank['Gift of Prosperity']}},
        'Legendary Insight': {base: wallet['Legendary Insight'], per: 25, extra: {'Gift of Prowess': bank['Gift of Prowess']}},
        'Spirit Shard': {base: wallet['Spirit Shard'], per: 50, extra: {'Gift of Prowess': bank['Gift of Prowess'], 'Eldritch Scroll': bank['Eldritch Scroll']}},
        'Obsidian Shard': {base: materials['Obsidian Shard'], per: 50, extra: {'Gift of Prowess': bank['Gift of Prowess']}},
        'Ball of Dark Energy': {base: materials['Ball of Dark Energy'], per: 1, extra: {'Gift of Prowess': bank['Gift of Prowess'], 'Cube of Stabilized Dark Energy': materials['Cube of Stabilized Dark Energy']}},
        'Stabilizing Matrix': {base: materials['Stabilizing Matrix'], per: 75, extra: {'Gift of Prowess': bank['Gift of Prowess'], 'Cube of Stabilized Dark Energy': materials['Cube of Stabilized Dark Energy']}},
        'Auric Ingot': {base: materials['Auric Ingot'], per: 5, extra: {'Gift of Dedication': bank['Gift of Dedication']}},
        'Chak Egg': {base: materials['Chak Egg'], per: 5, extra: {'Gift of Dedication': bank['Gift of Dedication']}},
        'Reclaimed Metal Plate': {base: materials['Reclaimed Metal Plate'], per: 5, extra: {'Gift of Dedication': bank['Gift of Dedication']}},
        'Airship Part': {base: wallet['Airship Part'], per: 250, extra: {'Gift of Dedication': bank['Gift of Dedication'], 'Gift of the Pact': bank['Gift of the Pact']}},
        'Lump of Aurillium': {base: wallet['Lump of Aurillium'], per: 250, extra: {'Gift of Dedication': bank['Gift of Dedication'], 'Gift of the Pact': bank['Gift of the Pact']}},
        'Ley Line Crystal': {base: wallet['Ley Line Crystal'], per: 250, extra: {'Gift of Dedication': bank['Gift of Dedication'], 'Gift of the Pact': bank['Gift of the Pact']}},
    }).map(([name, {base, per, extra}]) => [name, {base, per, extra, count: base / per + pieces + Object.values(extra).reduce((a, b) => a + b)}]));
    return {pieces, individual};
}