<script>
    import { goto } from "$app/navigation";
    let crawling = $state(false)
    let  urls = [];
    async function startCrawl(event) {
        event.preventDefault();
        crawling = true;

        const data = new FormData(event.currentTarget);

        const response = await fetch("./api/sitemap", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({url: data.get("Target URL"), max_depth: data.get("Crawl depth")}),
        })
        urls = await response.json();
        crawling = false;
        await goto(`/treeGraph?urls=${encodeURIComponent(JSON.stringify(urls))}`);
    }
</script>

<form class="crawler-config-form" onsubmit={startCrawl}>
    <div class="form-item">
        <label for="Target URL">Target URL</label>
        <input class="form-field" id="Target URL" type="text" name="Target URL"/>
    </div>
    <div class="form-item">
        <label for="Crawl depth"> Crawl Depth</label>
        <input class="form-field" id="Crawl depth" type="text" name="Crawl depth"/>
    </div>
    <div class="form-item">
        <label for="Max number of pages">Limit on Number of Pages</label>
        <input class="form-field" id="Max number of pages" type="text" name="Max number of pages"/>
    </div>
    <div class="form-item">
        <label for="User agent string">User Agent String</label>
        <input class="form-field" id="User agent string" type="text" name="User agent string"/>
    </div>
    <div class="form-item">
        <label for="Request delay">Request Delay</label>
        <input class="form-field" id="Request delay" type="text" name="RequestDelay"/>
    </div>
    <button type="submit">Start</button>
</form>

<style>
    .crawler-config-form{
        display: flex;
        flex-direction: column;
        width: 70%;
        align-items: center;
    }
    .form-field{
        width: 50%;
        font-size: large;
    }
    .form-item{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-content: space-around;
        flex-wrap: wrap;
        margin: 1vh auto;
    }
</style>