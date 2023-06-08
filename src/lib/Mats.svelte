<script>
    import {Popover, Spinner} from "sveltestrap";
    import {calc, sum_values} from "./gw2";

    export let api_key;
</script>

{#await calc(api_key)}
    <Spinner color="black"/>
{:then {pieces, individual}}
    <div class="component">
        {#each Object.entries(individual) as [name, {base, per, extra, extraone, count}]}
            <div style="display: flex; gap: 10px; height: 36px; padding: 2px;" class={(count >= 6) ? 'success' : (count < 1) ? 'failure' : ''}>
                <a style="width: 160px; display: flex; justify-content: flex-end; align-items: center; height: 30px;" href="https://wiki.guildwars2.com/wiki/{name.replaceAll(' ', '_')}" target=”_blank”><span>{name}</span></a>
                <Popover trigger="hover" target="{name.replaceAll(' ', '_')}-icons">
                    <div style="width: 100%; display: flex; flex-direction: column; gap: 3px; align-items: flex-start;">
                        {#if pieces > 0}
                            <b class="pieces-text">{pieces} pieces of legendary armor</b>
                        {/if}
                        {#each Object.entries(extra) as [extra_name, extra_count]}
                            {#if extra_count > 0}
                                <div style="display: flex; align-items: center; gap: 3px;">
                                    <img src="/icons/{extra_name.replaceAll(' ', '_')}.png" style="width: 30px; height: 30px; object-fit: cover;" alt="">
                                    <span>{extra_count}x <b>{extra_name}</b></span>
                                </div>
                            {/if}
                        {/each}
                        <div style="display: flex; align-items: center; gap: 3px;">
                            <img src="/icons/{name.replaceAll(' ', '_')}.png" style="width: 30px; height: 30px; object-fit: cover;" alt="">
                            <span>{base}x <b>{name}</b></span>
                        </div>
                        {#each Object.entries(extraone) as [extra_name, extra_count]}
                        {#if extra_count > 0}
                            <div style="display: flex; align-items: center; gap: 3px;">
                                <img src="/icons/{extra_name.replaceAll(' ', '_')}.png" style="width: 30px; height: 30px; object-fit: cover;" alt="">
                                <span>{extra_count}x <b>{extra_name}</b></span>
                            </div>
                        {/if}
                    {/each}
                        <span><b>{(pieces >= 6 || Object.values(extra).some(e => e > 0)) ? 0 : Math.max(per - base - sum_values(extraone), 0)}</b> missing for next piece</span>
                        <span><b>{Math.max((6 - pieces) * per - (sum_values(extra) * per + base + sum_values(extraone)), 0)}</b> missing for all pieces</span>
                    </div>
                </Popover>
                <div id="{name.replaceAll(' ', '_')}-icons" style="width: 190px; display: flex; gap: 2px;" class="hoverable">
                    {#each [...Array(Math.floor(Math.min(count, 6))).keys()] as _}
                        <img src="/icons/{name.replaceAll(' ', '_')}.png" style="width: 30px; height: 30px;" alt="">
                    {/each}
                    {#if count < 6}
                        <div style="width: {(count - Math.floor(count)) * 30}px; height: 30px; overflow: hidden;">
                            <img src="/icons/{name.replaceAll(' ', '_')}.png" style="width: 30px; height: 30px; object-fit: cover;" alt="">
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
        <div style="position: absolute; left: 0px; top: 0px; opacity: 0.45; width: 100%; height: 100%; z-index: -1;">
            <div style="background-color: lightgray; width: 100%; height: 100%;"/>
        </div>
    </div>
{/await}

<style>
    .component {
        position: relative;
        padding: 4px;
        display: flex;
        flex-direction: column;
        gap: 3px;
        border-radius: 12px;
        border: 1px solid black;
        overflow: hidden;
    }

    .success {
        border: 1px solid green;
        background-color: rgb(190, 223, 141);
    }

    .failure {
        border: 1px solid red;
        background-color: rgb(221, 159, 159);
    }

    .hoverable:hover {
        filter: brightness(80%);
    }

    .pieces-text {
        font-size: 11px;
        color: rgb(102, 29, 102);
    }
</style>