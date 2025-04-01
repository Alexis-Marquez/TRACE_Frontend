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

<div class="tree-graph">
{#if !networkMap || networkMap.length === 0}
    <h1>Loading...</h1>
{:else }
    {#if treeMode}

        <h1 class="page-header">Tree graph</h1>
        <div class="display-zone">
        <Tree networkMap={networkMap} scale={scale}></Tree>
        </div>
    {:else}
        <h1 class="page-header"> List View</h1>
        <div class="display-zone">
        <SiteMapList networkMap ={networkMap}></SiteMapList>
        </div>
    {/if}
    <button  onclick={isZoomedOut ? resetZoom : zoomOut}>
        {isZoomedOut ? "Reset Zoom" : "Zoom Out"}
    </button>
    <button onclick={generateWordlist}><b> Wordlist</b></button>
    <button onclick={()=>{treeMode = !treeMode}}><b>Switch View</b></button>
{/if}
</div>
<style>
    .page-header {
        margin-left: 2vw;
        margin-top: 0;
    }
    .display-zone{
        display: flex;
        justify-content: center;
        overflow: scroll;
        width: 100%;
        height: 80vh;
    }
    button {
        background: rgba(74, 166, 176, 0.6);
        border-radius: 5px;
        margin: 7px;
        padding: 1em;
        border: none;
        font-size: 0.8em;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    }
    button:hover{
        background: #4aa6b0;
    }
</style>