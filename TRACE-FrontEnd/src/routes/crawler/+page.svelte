<script>
    import { goto } from "$app/navigation";
    let crawling = $state(false)
    let  urls = [];
    async function startCrawl(event) {
        event.preventDefault();
        crawling = true;

        const data = new FormData(event.currentTarget);

        const response = await fetch("/api/crawl", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({url: data.get(baseUrl), max_depth: data.get(depth)}),
        })
        urls = await response.json();
        crawling = false;
        await goto(`/results?urls=${encodeURIComponent(JSON.stringify(urls))}`);
    }
</script>

<h1 class="page-header">Crawler</h1>
<div class="page-content">
<h3 class="page-subtitle">
    Configuration
</h3>
    <form class="crawler-config-form" onsubmit={startCrawl}>
        <label for="Target URL">Target URL</label>
        <input id="Target URL" type="text" name="Target URL"/>
        <label for="Crawl depth"> Crawl Depth</label>
        <input id="Crawl depth" type="text" name="Crawl depth"/>
        <label for="Max number of pages">Limit on Number of Pages</label>
        <input id="Max number of pages" type="text" name="Max number of pages"/>
        <label for="User agent string">User Agent String</label>
        <input id="User agent string" type="text" name="User agent string"/>
        <label for="Request delay">Request Delay</label>
        <input id="Request delay" type="text" name="RequestDelay"/>
        <button type="submit">Start</button>
    </form>
</div>
<style>
    .page-header {
        margin-left: 2.5vw;
    }
    .page-content{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .crawler-config-form{
        display: flex;
        flex-direction: column;
    }
</style>