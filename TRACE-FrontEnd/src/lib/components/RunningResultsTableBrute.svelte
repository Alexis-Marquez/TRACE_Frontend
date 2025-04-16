<script>
    let props = $props();
    let networkLinks = $state([]);
    networkLinks = props.networkLinks;

    import { slide } from "svelte/transition";
</script>

<table class="running-results-table">
    <thead>
        <tr>
            <th class="running-results-table-header">ID</th>
            <th class="running-results-table-header">Response</th>
            <th class="running-results-table-header">Lines</th>
            <th class="running-results-table-header">Word</th>
            <th class="running-results-table-header">Chars</th>
            <th class="running-results-table-header">Payload</th>
            <th class="running-results-table-header">Length</th>
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(networkLinks) as [link, values], i}
            <tr class="running-result" transition:slide>
                <td>{i}</td>
                <td>{values[1]}</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>{link}</td>
                <td>--</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    thead {
        background: rgba(74, 166, 176, 0.6);
    }

    table {
        margin-top: 1.5vh;
        border-collapse: collapse;
        font-size: 0.6rem;
        letter-spacing: 1px;
        width: 85%;
    }

    th:first-child, td:first-child {
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
    }

    th:last-child, td:last-child {
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
    }

    td, th {
        text-align: justify;
    }

    tbody tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    tbody tr:nth-child(odd) {
        background-color: #ffffff;
    }
</style>
