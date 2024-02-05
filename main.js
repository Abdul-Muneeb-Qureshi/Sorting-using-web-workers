// Importing the selectionSort function from an external file
import { selectionSort } from './sortFunctions.js';

// DOM elements
const nextButton = document.getElementById('nextPage');
const prevButton = document.getElementById('prevPage');
const sortWebWorkersButton = document.getElementById('sortWebWorkers');
const timeDurationLabel = document.getElementById('timeDuration');
const simpleSortButton = document.getElementById("simpleSort")
const progressBar = document.getElementById("progress-bar");
const resetButton = document.getElementById('resetPage');

// Event listeners
sortWebWorkersButton.addEventListener('click', handleSortWebWorkers);
simpleSortButton.addEventListener('click', handleSimpleSort);
resetButton.addEventListener('click', handleReset);

// Web worker for CSV fetching
const csvWorker = new Worker('csvWorker.js');
csvWorker.addEventListener('message', handleCsvWorkerMessage);
csvWorker.postMessage({ type: 'fetchCSV', data: 'Pakistan Largest Ecommerce Dataset.csv' });

// Global Variable to store the dataset
var dataSet = []

// Handle messages from the CSV worker
function handleCsvWorkerMessage(event) {
  const { type, progress, data, message } = event.data;

  switch (type) {
    case 'progress':
      // Log and update progress in the UI
      console.log(`Progress: ${progress.toFixed(2)}%`);
      updateProgress(progress)
      break;
    case 'complete':
      // Log completion and generate table with pagination
      console.log('Data fetching complete:', data);
      hideProgressBar()
      dataSet = data;
      generateTableWithPagination(data);
      break;
    case 'error':
      // Log and handle errors
      console.error('Error:', message);
      break;
    default:
      break;
  }
};

// Generate table with pagination based on the provided data
function generateTableWithPagination(data) {
  const tableBody = document.getElementById('table-body');
  const rowsPerPage = 10;
  let currentPage = 1;

  // Function to generate table for a given data subset
  function generateTable(dataSubset) {
    tableBody.innerHTML = ''; // Clear the table

    dataSubset.forEach(function (rowData) {
      const row = document.createElement('tr');

      rowData.forEach(function (cellData) {
        const cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });
  }

  // Function to paginate and display data for a given page number
  function paginateData(pageNumber) {
    const startIndex = (pageNumber - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const dataSubset = data.slice(startIndex, endIndex);
    generateTable(dataSubset);
  }

  // Initial pagination and event listeners for navigation
  paginateData(currentPage);

  nextButton.addEventListener('click', () => {
    currentPage++;
    paginateData(currentPage);
  });
  
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      paginateData(currentPage);
    }
  });
}

// Update the progress bar based on the provided percentage
function updateProgress(progress) {
  progressBar.style.width = `${progress}%`;
  console.log(`Progress: ${progress.toFixed(2)}%`);
}

// Hide the progress bar
function hideProgressBar() {
  progressBar.style.width = '0%';
}

// Handle sorting using web workers
function handleSortWebWorkers() {
  const startTime = performance.now();
  timeDurationLabel.innerHTML = "Web Worker Sort start Wait few Seconds......"

  // Create a new worker for sorting
  const sortWorker = new Worker('sortWorker.js');
  var selectElement = document.getElementById("dataSetAmount");

  var selectedValue = selectElement.value;
  const data = dataSet.slice(0, selectedValue);
  sortWorker.postMessage(data);

  // Handle the message received from the sorting worker
  sortWorker.onmessage = function (event) {
    const endTime = performance.now();
    const totalTime = endTime - startTime;

    timeDurationLabel.innerHTML = "";
    timeDurationLabel.innerHTML = `Total Time Taken: ${totalTime} milliseconds with a web worker, which performs better than a simple sort. This improvement is particularly noticeable when increasing the data set. The algorithm employed is the selection sort, ensuring that the UI remains unblocked.`;

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    generateTableWithPagination(event.data);
  };
};

// Handle sorting using the simple (non-web worker) method
function handleSimpleSort() {
  const startTime = performance.now();
  timeDurationLabel.innerHTML = "Simple Sort start Wait few Seconds......."

  var selectElement = document.getElementById("dataSetAmount");

  var selectedValue = parseInt(selectElement.value);
  var data = dataSet.slice(0, selectedValue)
  data = selectionSort(data)
  const endTime = performance.now();
  const totalTime = endTime - startTime;
  timeDurationLabel.innerHTML = "";
  timeDurationLabel.innerHTML = `Total Time Taken: ${totalTime} milliseconds. The performance is not better than the web worker sort, and it runs with a blocking UI problem. The algorithm used is selection sort.`;
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  generateTableWithPagination(data);
}

// Handle resetting the table and time duration label
function handleReset() {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  generateTableWithPagination(dataSet);
  const timeDurationLabel = document.getElementById('timeDuration');
  timeDurationLabel.innerHTML = "";
}
