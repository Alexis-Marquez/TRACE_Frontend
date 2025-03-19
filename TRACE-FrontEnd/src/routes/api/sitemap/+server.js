import { execFile } from "child_process";

export async function POST({ request }) {
    const config = await request.json();

    return new Response(
        new ReadableStream({
            async start(controller) {
                try {
                    const process = execFile("python3", ["crawler.py", JSON.stringify(config)], (error, stdout) => {
                        if (error) {
                            controller.enqueue(`Error: ${error.message}\n`);
                        } else {
                            controller.enqueue(stdout);
                        }
                        controller.close();
                    });

                    process.stderr.on("data", (data) => {
                        controller.enqueue(`Error: ${data}\n`);
                    });

                } catch (err) {
                    controller.enqueue(`Server error: ${err.message}\n`);
                    controller.close();
                }
            },
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
