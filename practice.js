// function generateRandomArray(size) {
//     const randomArray = [];
//     for (let i = 0; i < size; i++) {
//       randomArray.push(Math.floor(Math.random() * 1000000)); 
//     }
//     return randomArray;
//   }

//   const worker1 = new Worker('worker.js');
//   const worker2 = new Worker('worker.js');

//   const randomArray = generateRandomArray(50000);

//   const startTime = performance.now();

//   let sortedFirstHalf, sortedSecondHalf;

//   worker1.onmessage = function(event) {
//     sortedFirstHalf = event.data;

//     if (sortedFirstHalf && sortedSecondHalf) {
//       const sortedArray = sortedFirstHalf.concat(sortedSecondHalf);
//       const endTime = performance.now();
//       const totalTime = endTime - startTime;
//       console.log("Sorted Array:", sortedArray);
//       console.log("Total Time Taken:", totalTime, "milliseconds");
//     }
//   };

//   worker2.onmessage = function(event) {
//     sortedSecondHalf = event.data;

//     if (sortedFirstHalf && sortedSecondHalf) {
//       const sortedArray = sortedFirstHalf.concat(sortedSecondHalf);
//       const endTime = performance.now();
//       const totalTime = endTime - startTime;
//       console.log("Sorted Array:", sortedArray);
//       console.log("Total Time Taken:", totalTime, "milliseconds");
//     }
//   };

//   const middle = Math.floor(randomArray.length / 2);
//   const firstHalf = randomArray.slice(0, middle);
//   const secondHalf = randomArray.slice(middle);

//   worker1.postMessage(firstHalf);
//   worker2.postMessage(secondHalf);


var data = [
    ['211131', 'complete', '7/1/2016', '1960', '1', "Women's Fashion", 'cod', '201'],
    ['211131', 'complete', '7/1/2016', '1950', '1', "Women's Fashion", 'cod', '201'],
    ['211131', 'complete', '7/1/2016', '1980', '1', "Women's Fashion", 'cod', '201']
  ];
  
  function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1; j++) {
            // Compare the fourth index (year) of adjacent elements
            if (parseInt(arr[j][3]) > parseInt(arr[j + 1][3])) {
                // Swap the elements if they are in the wrong order
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
  }
console.log(bubbleSort(data))
  
