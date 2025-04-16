<script>
// @ts-nocheck

	import ToolStatusHeader from "$lib/components/ToolStatusHeader.svelte";
	import ToolButton from "$lib/components/ToolButton.svelte";
	import { onMount, onDestroy } from "svelte";
	import { page } from "$app/state";
	import ProgressBar from "$lib/components/ProgressBar.svelte";
	import RunningResultsTableBrute from "$lib/components/RunningResultsTableBrute.svelte";

	let networkLinks = $state([]);
	let networkLinksSize = $state(0);
	let intervalId;
	let noContentCount = 0;
	let delay = 1000;
	let currTime = $state(0);
	let requestCount = $state(0);
	let reqSec = $state(0);
	let done = $state(false);

	if (page.url.searchParams.get("delay")) {
		delay = page.url.searchParams.get("delay");
	}

	onMount(() => {
		let startTime = performance.now();
		intervalId = setInterval(async () => {
			try {
				const response = await fetch("http://127.0.0.1:8000/bruteforce/data");
				const data = await response.json();
				currTime = performance.now() - startTime;

				if (data.error) {
					console.error("Error:", data.error);
				} else if (response.status === 206) {
					networkLinks = data.data;
					networkLinksSize = networkLinks.length;
					if (page.url.searchParams.get("pageLimit") && networkLinksSize >= parseInt(page.url.searchParams.get("pageLimit"))) {
						clearInterval(intervalId);
						done = true;
					}
				} else if (response.status === 400) {
					noContentCount++;
				}

				if (noContentCount >= 5) {
					clearInterval(intervalId);
					done = true;
				}

				if (response.status === 200) {
					networkLinks = data;
					done = true;
					clearInterval(intervalId);
				}

				requestCount = networkLinksSize;
				reqSec = requestCount / (currTime / 1000);
			} catch (err) {
				console.error("Failed to fetch brute force data:", err);
			}
		}, delay * 1.5);
	});

	$effect(() => {
		networkLinksSize = Object.keys(networkLinks).length;
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<h1 class="page-header">Brute Force</h1>
<div class="page-wrapper">
	{#key networkLinksSize}
		<ProgressBar currentCount={networkLinksSize} />
	{/key}
	{#key done}
		<ToolStatusHeader active={["Configuration", "Running", ...(done ? ["Results"] : [])]} title="Running" />
	{/key}
	<div class="metrics">
		<div class="metric">
			<div class="metric-title">Running Time</div>
			<div class="metric-value">{currTime.toFixed(2)} ms</div>
		</div>
		<div class="metric">
			<div class="metric-title">Processed Requests</div>
			<div class="metric-value">{requestCount}</div>
		</div>
		<div class="metric">
			<div class="metric-title">Filtered Requests</div>
			<div class="metric-value">0</div>
		</div>
		<div class="metric">
			<div class="metric-title">Requests/sec</div>
			<div class="metric-value">{reqSec.toFixed(2)}</div>
		</div>
	</div>
	<div class="table-display-area">
		{#key networkLinks}
			<RunningResultsTableBrute networkLinks={networkLinks} currSize={networkLinksSize} />
		{/key}
	</div>
</div>
<div class="footer-buttons">
	<div class="left-buttons">
		<ToolButton callback={() => {}} content="<b>Pause</b>" />
		<ToolButton callback={() => {}} content="<b>Stop</b>" />
		<ToolButton callback={() => {}} content="<b>Restart</b>" />
	</div>
	<div class="right-button">
		<ToolButton callback={() => {}} content="<b>Show Terminal</b>" />
	</div>
</div>

<style>
	.page-header {
		margin-left: 2.5vw;
	}
	.table-display-area {
		width: 100%;
		display: flex;
		justify-content: center;
		overflow: scroll;
		scrollbar-width: none;
		-ms-overflow-style: none;
		max-height: 50vh;
	}
	.table-display-area::-webkit-scrollbar {
		display: none;
	}
	.page-wrapper {
		width: 90%;
		max-height: 100vh;
		margin-left: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: white;
	}
	.metrics {
		display: flex;
		width: 90%;
		justify-content: space-evenly;
		align-items: center;
	}
	.metric {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.metric-value {
		font-weight: bold;
	}
	.footer-buttons {
		position: absolute;
		display: flex;
		margin-bottom: 1vh;
		bottom: 1vh;
		width: 90%;
		justify-content: space-between;
	}
</style>
