import * as dataImportServices from '~/server/services/dataImportServices';


export default defineEventHandler(async (event) => {

    const encoder = new TextEncoder();
    
    console.log('request received');

    try {

        // stream the data back, as it takes a long time to process; 
        // see: https://h3.unjs.io/examples/stream-response

        setResponseHeader(event, 'Content-Type', 'text/html');
        setResponseHeader(event, 'Cache-Control', 'no-cache');
        setResponseHeader(event, 'Transfer-Encoding', 'chunked');

        const stream = new ReadableStream({
            start(controller) {
                // NOTE intentionally does not await here
                doEvent(controller, encoder);
            }
        });

        return sendStream(event, stream);

    } catch (error) {
        console.error(error);
        return String(error);
    }

})

async function doEvent(controller, encoder) {

    const write = (chunk: string) => {
        controller.enqueue(encoder.encode(chunk));
      };

      write( `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Nitro Streaming Demo</title>
            <body>`);

    for (let i = 0; i < 180; i++) {
        write(`importing event ${i}...<br>\n`);
        console.log(`importing event ${i}...<br>\n`);
        await sleep(1000);
    }
    write( `</body></html>`);
    controller.close();
}

function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}