// csvWorker.js



// Respond to messages from the main thread
self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'fetchCSV':
      fetchCSVData(data);
      break;
    default:
      break;
  }
});

// Function to fetch and parse CSV data
async function fetchCSVData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    // Handle error
    self.postMessage({ type: 'error', message: 'Failed to fetch CSV data' });
    return;
  }

  const reader = response.body.getReader();
  const contentLength = response.headers.get('Content-Length');
  let receivedLength = 0;
  let chunks = [];

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
    receivedLength += value.length;

    // Calculate progress and send it to the main thread
    const progress = (receivedLength / contentLength) * 100;
    self.postMessage({ type: 'progress', progress });
  }

  // Combine chunks into a Blob
  const blob = new Blob(chunks);

  // Decode the entire blob at once
  const data = await blob.text();

  const rows = data.split('\n');

// Split each row into columns
  const parsedData = rows.map(row => row.split(','));
  parsedData.shift()


  // Send the parsed data to the main thread
  self.postMessage({ type: 'complete', data: parsedData });
}