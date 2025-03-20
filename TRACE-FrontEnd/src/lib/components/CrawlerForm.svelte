<script>
    import { goto } from "$app/navigation";
    let crawling = $state(false)
    let  urls = [];
    async function startCrawl(event) {
        event.preventDefault();
        crawling = true;

        const data = new FormData(event.currentTarget);

        const response = await fetch("http://127.0.0.1:5000/crawler", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({TargetURL: data.get("TargetURL"), CrawlDepth: data.get("CrawlDepth"),
                PageNumberLimit: data.get("PageNumberLimit"), UserAgent: data.get("UserAgent"), RequestDelay: data.get("RequestDelay")}),
        })
        urls = await response.json();
        crawling = false;
        await goto(`/treeGraph`);
    }
</script>

<form class="crawler-config-form" onsubmit={startCrawl}>
    <div class="form-item">
        <label for="Target URL">Target URL</label>
        <input class="form-field" id="TargetURL" type="text" name="TargetURL"/>
    </div>
    <div class="form-item">
        <label for="Crawl depth"> Crawl Depth</label>
        <input class="form-field" id="CrawlDepth" type="text" name="CrawlDepth"/>
    </div>
    <div class="form-item">
        <label for="Max number of pages">Limit on Number of Pages</label>
        <input class="form-field" id="PageNumberLimit" type="text" name="PageNumberLimit"/>
    </div>
    <div class="form-item">
        <label for="User agent string">User Agent String</label>
        <input class="form-field" id="UserAgent" type="text" name="UserAgent"/>
    </div>
    <div class="form-item">
        <label for="Request delay">Request Delay</label>
        <input class="form-field" id="RequestDelay" type="text" name="RequestDelay"/>
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