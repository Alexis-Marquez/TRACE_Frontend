<script>
	import { goto } from "$app/navigation";

	let crawling = false;
	// @ts-ignore
	/**
     * @type {null}
     */
	let res = null;
	let advancedOptions = false;

	// @ts-ignore
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

			if (!response.ok) throw new Error(`Server error: ${response.status}`);

			res = await response.json();
			await goto(`/treeGraph?pageLimit=${data.get("PageNumberLimit")}&delay=${data.get("RequestDelay")}`);
		} catch (error) {
			console.error("Error starting crawler:", error);
			crawling = false;
		}
	}
</script>

{#if !crawling}
	<div class="page-wrapper">
		<div class="form-header">
			<h3>Configuration</h3>
			<div class="stepper">
				<div class="step active">
					<div class="circle"></div>
					<span>Configuration</span>
				</div>
				<div class="line"></div>
				<div class="step">
					<div class="circle"></div>
					<span>Running</span>
				</div>
				<div class="line"></div>
				<div class="step">
					<div class="circle"></div>
					<span>Results</span>
				</div>
			</div>
		</div>

		<div class="crawler-container">
			<form class="crawler-form" on:submit={startCrawl}>
				<div class="form-group">
					<label for="TargetURL">Target URL *</label>
					<input type="url" id="TargetURL" name="TargetURL" required />
				</div>

				{#if advancedOptions}
					<div class="form-group">
						<label for="CrawlDepth">Crawl Depth</label>
						<input type="number" id="CrawlDepth" name="CrawlDepth" value="2" />
					</div>

					<div class="form-group">
						<label for="PageNumberLimit">Limit on Number of Pages</label>
						<input type="number" id="PageNumberLimit" name="PageNumberLimit" value="50" />
					</div>

					<div class="form-group">
						<label for="UserAgent">User-Agent String</label>
						<select id="UserAgent" name="UserAgent">
							<option value="Mozilla/3.0">Mozilla/3.0</option>
							<option value="AppleWebKit/537.36">AppleWebKit/537.36</option>
							<option value="Chrome/112.0.0.0">Chrome/112.0.0.0</option>
							<option value="Mobile Safari/537.36">Mobile Safari/537.36</option>
						</select>
					</div>

					<div class="form-group">
						<label for="RequestDelay">Request Delay (ms)</label>
						<input type="number" id="RequestDelay" name="RequestDelay" value="1000" />
					</div>
				{/if}

				<button type="submit" class="start-btn">Start</button>
			</form>

			<button class="toggle-btn" on:click={() => (advancedOptions = !advancedOptions)}>
				{advancedOptions ? "Hide Advanced Options ⌃" : "Show Advanced Options ⌵"}
			</button>
		</div>
	</div>
{:else}
	{#if res}
		<h1>Crawling complete</h1>
		<button on:click={() => goto(`/treeGraph`)}> Show Tree Graph</button>
	{:else}
		<h1>Crawling...</h1>
	{/if}
{/if}

<style>
	:global(body) {
		background: white;
	}

	.page-wrapper {
		width: 100%;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: white;
	}

	.form-header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 700px;
		margin-bottom: 1rem;
	}

	.stepper {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.step {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 0.75rem;
		color: #999;
	}

	.step.active {
		color: #0077cc;
		font-weight: bold;
	}

	.circle {
		width: 12px;
		height: 12px;
		border: 2px solid #ccc;
		border-radius: 50%;
		background: white;
	}

	.step.active .circle {
		border-color: #0077cc;
		background: #0077cc;
	}

	.line {
		width: 30px;
		height: 2px;
		background: #ccc;
        margin: 0 4px;
	    align-self: center;
	}

	.crawler-container {
		width: 100%;
		max-width: 700px;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		background: #f9f9f9;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	label {
		font-size: 0.9rem;
		margin-bottom: 0.25rem;
		color: #333;
	}

	input,
	select {
		padding: 0.6rem;
		font-size: 1rem;
		border-radius: 6px;
		border: 1px solid #ccc;
	}

	.start-btn {
		background-color: #cce5ff;
		color: #000;
		border: none;
		border-radius: 6px;
		padding: 0.75rem;
		font-size: 1rem;
		cursor: pointer;
		width: 100%;
	}

	.toggle-btn {
		margin-top: 1rem;
		background: none;
		border: none;
		color: #0077cc;
		cursor: pointer;
		font-weight: bold;
	}
</style>

