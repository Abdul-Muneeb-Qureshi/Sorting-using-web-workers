// Function to sort an array



function sortArray(array) {
  return array.sort(function (a, b) {
    return a[3] - b[3];
  });

}


// Listen for messages from the main thread
onmessage = function (event) {
  const array = event.data;

  // Sort the received half of the array
  const sortedArray = selectionSort(array);



  // Send the sorted half array back to the main thread
  postMessage(sortedArray);
};



function selectionSort(arr) {
  var len = arr.length;

  for (var i = 0; i < len - 1; i++) {
    var minIndex = i;

    for (var j = i + 1; j < len; j++) {
      // Compare the fourth index (year) of elements
      if (parseFloat(arr[j][3]) < parseFloat(arr[minIndex][3])) {
        minIndex = j;
      }
    }

    // Swap the elements if needed
    if (minIndex !== i) {
      var temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }

  return arr;
}



