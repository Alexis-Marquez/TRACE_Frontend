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
    let networkMap = $state()
    onMount(() => {
        const params = new URLSearchParams(page.url.search);
        const urlsParam = params.get("urls");
        if (urlsParam) {
            networkMap = JSON.parse(decodeURIComponent(urlsParam));
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