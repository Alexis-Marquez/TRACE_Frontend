<script>
    import {onMount} from "svelte";
    let credentials = []
    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/webscraper");
            const data = await response.json();
            if (data.error) {
                console.error("Error:", data.error);
            } else {
                credentials = data;
            }
        } catch (err) {
            console.error("Failed to fetch web scraper daa:", err);
        }
    });
</script>
<div>
    <ul>
    {#each credentials as cred}
         <li>
             {cred}
         </li>
        {/each}
    </ul>
</div>