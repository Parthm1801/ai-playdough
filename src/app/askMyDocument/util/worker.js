import { pipeline, env } from "@huggingface/transformers";

// Skip local model check
env.allowLocalModels = false;

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
    static task = 'document-question-answering';
    static model = 'Xenova/donut-base-finetuned-docvqa';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    // Retrieve the classification pipeline. When called for the first time,
    // this will load the pipeline and save it for future use.
    let classifier = await PipelineSingleton.getInstance(x => {
        // We also add a progress callback to the pipeline so that we can
        // track model loading.
        console.log("Model loading progress:", x);
        self.postMessage(x);
    });

    const { document, question } = event.data;
    console.log("K K K K K ", document, question)
    // Actually perform the classification
    try {
        console.error("* ** * * * 7777 ");
        let output = await classifier?.('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/invoice.png', 'What is the invoice number?');
        console.log(" & & & & & ", output);
        // Send the output back to the main thread
        self.postMessage({
            status: 'complete',
            output: output,
        });
    } catch (error) {
        console.error("* ** * * * ", error);
    }
});