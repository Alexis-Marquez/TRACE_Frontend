<script>
	import ToolsDashboard from "$lib/components/ToolsDashboard.svelte";
</script>

<h1 class="page-header">Tools</h1>
<div class="page-content">
	<ToolsDashboard />
</div>

<style>
	.page-header {
		margin-left: 2.5vw;
		margin-bottom: 0;
	}

	.page-content {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		max-height: 90vh;
	}
</style>