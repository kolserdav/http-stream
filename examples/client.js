const chunks = [
  new Uint8Array([0, 1, 2, 3, 4]),
  new Uint8Array([5, 6, 7, 8, 9]),
  new Uint8Array([10, 11, 12, 13, 14]),
];

/**
 * @param {Uint8Array[]} chunks
 */
const uploadChunks = async (chunks) => {
  const combinedChunks = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    combinedChunks.set(chunk, offset);
    offset += chunk.length;
  }

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: combinedChunks,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Chunks uploaded successfully: ', data.message);
  } catch (error) {
    console.error('Error uploading chunks:', error);
  }
};

uploadChunks(chunks);
