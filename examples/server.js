import { createServer } from 'http';
import { writeFileSync } from 'fs';
import { join } from 'path';

const cwd = process.cwd();

const server = createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
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
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'success',
          message: 'File uploaded successfully',
        })
      );
    });

    req.on('error', (err) => {
      console.error('Error receiving data:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'error', message: err.message }));
    });

    req.on('close', () => {
      console.log('Request closed');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
