<script>
    import Tree from "$lib/components/Tree.svelte";
    import {onMount} from "svelte";
    import { page } from "$app/state";
    // let networkMap = [
    //     {
    //         ip: "192.168.1.34:8080",
    //         path: "www.google.com",
    //         children: [
    //             {
    //                 ip: "192.168.1.34:8080",
    //                 path: "www.google.com/search",
    //                 children: [
    //                     {
    //                         ip: "192.168.1.34:8080",
    //                         path: "www.google.com/search/search",
    //                         children: [
    //                             {
    //                                 ip: "192.168.1.34:8080",
    //                                 path: "www.google.com/search/search/s",
    //                                 children:[]
    //                             },
    //                             {
    //                                 ip: "192.168.1.34:8080",
    //                                 path: "www.google.com/search/search/search/s",
    //                                 children: []
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 ip: "192.168.1.34:8080",
    //                 path: "www.google.com/gmail",
    //                 children: []
    //             }
    //         ]
    //     }
    // ];

    let networkMap = [];

    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/crawler/data");
            const data = await response.json();
            if (data.error) {
                console.error("Error:", data.error);
            } else {
                networkMap = data;
            }
        } catch (err) {
            console.error("Failed to fetch crawler daa:", err);
        }
    });
</script>
<h1 class="page-header">Tree graph</h1>
<Tree networkMap={networkMap}></Tree>

<style>
    .page-header {
        margin-left: 2.5vw;
    }

</style>