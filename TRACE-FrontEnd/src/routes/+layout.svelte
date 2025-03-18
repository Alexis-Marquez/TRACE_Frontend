<script>
    let { children } = $props();
</script>

<nav class="side-bar">
    <div class="side-bar-section">

    </div>
    <div class="side-bar-section">
    <button class="side-bar-button" aria-label="crawler button"></button>
    <button class="side-bar-button" aria-label="network tree button"></button>
    <button class="side-bar-button" aria-label="wordlist button"></button>
    </div>
    <div class="side-bar-section">
    <button class="side-bar-button" aria-label="config-button"></button>
    </div>
</nav>
<main class="container">
    {@render children?.()}
</main>

<style>
    .side-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 4%;
        background: #e1e1e1;
        display: flex;
        flex-direction: column;
    }
    .side-bar-button{
        border-radius: 50%;
        width: 5vh;
        height: 5vh;
    }
    .side-bar-section{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: space-evenly;
        align-items: center;
    }
    .container{
         width: 96%;
         margin-left: 4%;
    }
</style>