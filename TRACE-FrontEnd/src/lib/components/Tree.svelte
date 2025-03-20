<script>
    import { onMount } from "svelte";
    import TreeNode from './TreeNode.svelte';
    import Tree from './Tree.svelte';

    let props = $props()
    let localNetworkMap = props.networkMap;
    let networkMap = $state();
    networkMap = localNetworkMap;
    console.log(networkMap)
</script>

<div class="network-tree">
    {#if !networkMap || networkMap.length > 0}
        {#each networkMap as node}
            <div class="tree-branch">
                <TreeNode ip={node.ip} path={node.path}/>
                {#if node.children.length > 0}
                    <div class="children">
                        <svg class="tree-line">
                            <line x1="50%" y1="0" x2="50%" y2="4%" stroke="black" stroke-width="2" />
                        </svg>
                        <svg class="horizontal-line">
                            <line x1="5%" y1="4%" x2="125%" y2="4%" stroke="black" stroke-width="2" />
                        </svg>
                        <Tree networkMap={node.children} />
                    </div>
                {/if}
            </div>
        {/each}
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<style>
    .network-tree {
        display: flex;
        justify-content: center;
        position: relative;
        width: 100%;
    }
    .tree-line {
        position: absolute;
        left: 50%;
        width: 2px;
        height: 100%;
        pointer-events: none;
    }
    .horizontal-line{
        position: absolute;
        width: fit-content;
        height: 2px;
        top: 4%;
        pointer-events: none;
    }

    .children {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-top: 10px;
    }
    .tree-branch{
        margin-top: 1vw;
        margin-left: 1vw;
        margin-right: 1vw;
    }


</style>
