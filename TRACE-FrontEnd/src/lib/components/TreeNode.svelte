<script>
    let props = $props();
    let url = props.url || "Unknown URL";  // Handle undefined values
    let path = props.path || "Unknown Path";
</script>

<div class="tree-node {props.root ? 'root' : ''}">
    <div class="tree-node-title">
        <strong>URL:</strong> {url}
    </div>
    <div class="dividing-line">

    </div>
    <div class="tree-node-content">
        <strong>Path:</strong> {path}
    </div>
</div>

<style>
    .tree-node {
        display: flex;
        flex-direction: column;
        font-size: 2vh;
        background: white;
        border: 2px solid #006699;
        border-radius: 8px;
        padding: 10px;
        margin: 10px auto;
        text-align: center;
        height: 10vh;
        width: 15vw;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        position: relative;
        justify-content: space-around;
    }
    .dividing-line{
        width: 90%;
        height: 2%;
        background: darkgrey;
    }


</style>
