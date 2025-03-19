<script>
    import TreeNode from './TreeNode.svelte';
    import Tree from './Tree.svelte';

    let props = $props();
    let networkMap = props.networkMap;
</script>

<div class="network-tree">
    {#each networkMap as node}
        <div class="tree-branch">
            <TreeNode url={node.url} path={node.path}/>
            {#if node.children.length > 0}
                <div class="children">
                    <Tree networkMap={node.children} />

                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .network-tree {
        display: flex;
        justify-content: center;
        position: relative;
        width: 100%;
    }

    .children {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-top: 10px;
    }

</style>
