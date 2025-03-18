<script>
    let { children } = $props();
</script>

<nav class="side-bar">
    <div class="side-bar-section top">
        <a class="side-bar-logo-link" href="./" aria-label="Home link">
            <img class="side-bar-logo" src="./favicon.png" alt="TRACE logo">
        </a>
    </div>
    <div class="side-bar-section mid">
    <button class="side-bar-button" aria-label="crawler button"></button>
    <button class="side-bar-button" aria-label="network tree button"></button>
    <button class="side-bar-button" aria-label="wordlist button"></button>
    </div>
    <div class="side-bar-section bottom">
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
        width: 6vh;
        height: 6vh;
        background: #cfcfcf;
        border: none;
    }
    .side-bar-section{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
    }
    .side-bar-section.mid{
       justify-content: center;
    }
    .side-bar-section.mid button{
        margin: 1vh
    }
    .side-bar-section.bottom{
        justify-content: flex-end;
    }
    .side-bar-section.bottom button{
        margin: 3vh;
    }
    .side-bar-logo-link{
        border-radius: 50%;
        width: 8vh;
        height: 8vh;
    }
    .side-bar-logo{
        height: 8vh;
        width: auto;
    }
    .container{
         width: 96%;
         margin-left: 4%;
    }
</style>