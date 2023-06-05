<script>
    import Login from "$lib/Login.svelte";
    import Mats from "$lib/Mats.svelte";

    export let data;
    const {api_key} = data;
</script>

<main>
    <div class="bg-image"><img style="width: 100%; height: 100%; filter: blur(20px);" alt="" src="/bg.png"></div>
    {#if api_key}
        <Mats {api_key}/>
    {:else}
        <Login/>
    {/if}
</main>

<style>
    main {
        position: relative;
        width: 100%;
        height: 100vh;
        padding: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .bg-image {
        user-select: none;
		z-index: -1;
		position: absolute;
        top: 0px;
        left: 0px;
		width: 100%;
		height: 100%;
		background-color: black;
        overflow: hidden;
	}
</style>