<script>
    import { goto } from "$app/navigation";

    let crawling = $state(false);
    let res = $state();

    async function startCrawl(event) {
        event.preventDefault();
        crawling = true;

        const data = new FormData(event.currentTarget);

        try {
            const response = await fetch("http://127.0.0.1:8000/crawler", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    TargetURL: data.get("TargetURL"),
                    CrawlDepth: data.get("CrawlDepth"),
                    PageNumberLimit: data.get("PageNumberLimit"),
                    UserAgent: data.get("UserAgent"),
                    RequestDelay: data.get("RequestDelay"),
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            res = await response.json();
        } catch (error) {
            console.error("Error starting crawler:", error);
            crawling = false;
        }
    }
</script>

{#if !crawling}
    <h3 class="page-subtitle">Configuration</h3>
    <form class="crawler-config-form" onsubmit={startCrawl}>
        <div class="form-item">
            <label for="TargetURL">Target URL</label>
            <input class="form-field" id="TargetURL" type="text" name="TargetURL" required />
        </div>
        <div class="form-item">
            <label for="CrawlDepth">Crawl Depth</label>
            <input class="form-field" id="CrawlDepth" type="number" name="CrawlDepth" required />
        </div>
        <div class="form-item">
            <label for="PageNumberLimit">Limit on Number of Pages</label>
            <input class="form-field" id="PageNumberLimit" type="number" name="PageNumberLimit" required />
        </div>
        <div class="form-item">
            <label for="UserAgent">User Agent String</label>
            <input class="form-field" id="UserAgent" type="text" name="UserAgent" required />
        </div>
        <div class="form-item">
            <label for="RequestDelay">Request Delay</label>
            <input class="form-field" id="RequestDelay" type="number" name="RequestDelay" required />
        </div>
        <button type="submit">Start</button>
    </form>
{:else}
    {#if res}
        <h1>Crawling complete</h1>
        <button onclick={() => goto(`/treeGraph`)}> Show Tree Graph</button>
    {:else}
        <h1>Crawling...</h1>
    {/if}
{/if}

<style>
    .crawler-config-form {
        display: flex;
        flex-direction: column;
        width: 70%;
        align-items: center;
    }
    .form-field {
        width: 50%;
        font-size: large;
    }
    .form-item {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-content: space-around;
        flex-wrap: wrap;
        margin: 1vh auto;
    }
</style>
