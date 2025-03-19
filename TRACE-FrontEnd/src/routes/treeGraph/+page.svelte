<script>
    import Tree from "$lib/components/Tree.svelte";
    let networkMap = [
        {
            url: "www.google.com",
            path: "/",
            children: [
                {
                    url: "www.google.com/search",
                    path: "/search",
                    children: [
                        {
                            url: "www.google.com/search/search",
                            path: "/search/search",
                            children: [
                                {
                                    url: "www.google.com/search/search/s",
                                    path: "/search/search/s",
                                    children:[]
                                },
                                {
                                    url: "www.google.com/search/search/search/s",
                                    path: "/search/search/search/s",
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    url: "www.google.com/gmail",
                    path: "/search/search/search",
                    children: []
                }
            ]
        }
    ];

</script>
<h1>Tree graph</h1>
<Tree networkMap={networkMap}></Tree>