<script>
    import Tree from "$lib/components/Tree.svelte";
    let networkMap = [
        {
            ip: "192.168.1.34:8080",
            path: "www.google.com",
            children: [
                {
                    ip: "192.168.1.34:8080",
                    path: "www.google.com/search",
                    children: [
                        {
                            ip: "192.168.1.34:8080",
                            path: "www.google.com/search/search",
                            children: [
                                {
                                    ip: "192.168.1.34:8080",
                                    path: "www.google.com/search/search/s",
                                    children:[]
                                },
                                {
                                    ip: "192.168.1.34:8080",
                                    path: "www.google.com/search/search/search/s",
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    ip: "192.168.1.34:8080",
                    path: "www.google.com/gmail",
                    children: []
                }
            ]
        }
    ];

</script>
<h1 class="page-header">Tree graph</h1>
<Tree networkMap={networkMap}></Tree>

<style>
    .page-header {
        margin-left: 2.5vw;
    }

</style>