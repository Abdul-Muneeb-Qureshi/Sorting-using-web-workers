export function selectionSort(arr) {
    var len = arr.length;

    for (var i = 0; i < len - 1; i++) {
        var minIndex = i;

        for (var j = i + 1; j < len; j++) {
            // Compare the fourth index (year) of elements
            if (parseInt(arr[j][3]) < parseInt(arr[minIndex][3])) {
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

export function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1; j++) {
            // Compare the fourth index (year) of adjacent elements
            if (parseFloat(arr[j][3]) > parseFloat(arr[j + 1][3])) {
                // Swap the elements if they are in the wrong order
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
  }



