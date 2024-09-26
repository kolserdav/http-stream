import { writeFileSync } from 'fs';
import { join } from 'path';
import HttpStream from '../src/index.js';
import { HEADER, MIME_TYPE, STATUS } from '../src/constants.js';

const server = new HttpStream();

const cwd = process.cwd();

const port = 3000;

/** Query string generic @type {typeof server.get<{test: string}>} */ (server.get)(
  '/test',
  async (req, res) => {
    console.log('Query string', req.query.test, req.headers);
    console.log('Request headers', req.headers);
    const data = 'Hello World!';
    res.writeHead(STATUS.ok, {
      [HEADER.contentType]: MIME_TYPE.textPlain,
      [HEADER.contentLength]: data.length,
    });
    res.end(data);
  }
);

server.post('/upload', async (req, res) => {
  /**
   * @type {Buffer[]}
   */
  const chunks = [];

  req.on('data', (chunk) => {
    chunks.push(chunk);
  });

  req.on('end', () => {
    const buffer = Buffer.concat(chunks);
    writeFileSync(join(cwd, 'dist/uploaded_file'), buffer);
    res.writeHead(200, { [HEADER.contentType]: MIME_TYPE.applicationJSON });
    res.end(
      JSON.stringify({
        status: 'success',
        message: 'File uploaded successfully',
      })
    );
  });

  req.on('error', (err) => {
    console.error('Error receiving data:', err);
    res.writeHead(STATUS.internalServerError, { [HEADER.contentType]: MIME_TYPE.applicationJSON });
    res.end(JSON.stringify({ status: 'error', message: err.message }));
  });

  req.on('close', () => {
    console.log('Request closed');
  });
});

server.listen({ port }, () => {
  console.log('Server listen at port', port);
});
