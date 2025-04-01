<script>
    import Tree from "$lib/components/Tree.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import SiteMapList from "$lib/components/SiteMapList.svelte";
    import {fade} from 'svelte/transition';
    // let networkMap = [
    //     {
    //         ip: "192.168.1.34:8080",
    //         path: "www.google.com",
    //         children: [
    //             {
    //                 ip: "192.168.1.34:8080",
    //                 path: "www.google.com/search",
    //                 children: [
    //                     {
    //                         ip: "192.168.1.34:8080",
    //                         path: "www.google.com/search/search",
    //                         children: [
    //                             {
    //                                 ip: "192.168.1.34:8080",
    //                                 path: "www.google.com/search/search/s",
    //                                 children:[]
    //                             },
    //                             {
    //                                 ip: "192.168.1.34:8080",
    //                                 path: "www.google.com/search/search/search/s",
    //                                 children: []
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 ip: "192.168.1.34:8080",
    //                 path: "www.google.com/gmail",
    //                 children: []
    //             }
    //         ]
    //     }
    // ];

    let networkMap = $state([]);

    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/crawler/data");
            const data = await response.json();
            if (data.error) {
                console.error("Error:", data.error);
            } else {
                networkMap = data;
            }
        } catch (err) {
            console.error("Failed to fetch crawler data:", err);
        }
    });

    async function generateWordlist() {
        await goto(`/webScraper`);
    }
    let treeMode = $state(true)


    let scale = $state(1);
    let isZoomedOut = $state(false);
    function zoomOut() {
        scale  -= 0.05;
        console.log(scale)
        if(scale<=0.5) isZoomedOut = true;
    }

    function resetZoom() {
        if(isZoomedOut) {
            scale = 1;
            isZoomedOut = false;
        }
    }
</script>

{#if !networkMap || networkMap.length === 0}
    <h1>Loading...</h1>
{:else }
    {#if treeMode}
        <h1 class="page-header">Tree graph</h1>
        <div class="display-zone" transition:fade>
        <Tree networkMap={networkMap} scale={scale}></Tree>
        </div>
    {:else}
        <h1 class="page-header"> List View</h1>
        <div class="display-zone" transition:fade>
        <SiteMapList networkMap ={networkMap}></SiteMapList>
        </div>
    {/if}
    <button  onclick={isZoomedOut ? resetZoom : zoomOut}>
        {isZoomedOut ? "Reset Zoom" : "Zoom Out"}
    </button>
    <button onclick={generateWordlist}>Generate wordlist</button>
    <button onclick={()=>{treeMode = !treeMode}}>Switch View</button>
{/if}
<style>
    .page-header {
        margin-left: 2vw;
    }
    .display-zone{
        display: flex;
        justify-content: center;
        overflow: scroll;
        width: 100%;
        height: 80vh;
    }
</style>