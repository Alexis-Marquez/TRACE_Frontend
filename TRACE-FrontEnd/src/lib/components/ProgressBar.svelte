<script>
    import {onMount} from "svelte";

    let props = $props()
    let currentCount = props.currentCount
    let total = $state()
    onMount(()=>{
        total = sessionStorage.getItem('crawlerPageLimit') ? sessionStorage.getItem('crawlerPageLimit') : 0
    })
</script>
<div class="progress-bar">
    current: {currentCount} / {total}
</div>