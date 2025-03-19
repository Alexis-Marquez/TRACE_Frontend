<script>
    let props = $props();
    let ip = props.ip || "Unknown IP";
    let path = props.path || "Unknown Path";
</script>

<div class="tree-node {props.root ? 'root' : ''}">
    <div class="tree-node-title">
        {ip}
    </div>
    <div class="dividing-line">

    </div>
    <div class="tree-node-content">
        {path}
    </div>
</div>

<style>
    .tree-node {
        display: flex;
        flex-direction: column;
        font-size: 1.5vh;
        background: white;
        border: 2px solid #006699;
        border-radius: 10px;
        padding: 10px;
        margin: 10px auto;
        text-align: center;
        height: 10vh;
        width: clamp(10vw, 15vw, 20vw);
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
