# Web Workers Sorting Project Overview

This project demonstrates the performance benefits of using Web Workers in sorting large datasets in a web application. The application imports half a million ecommerce data entries from an Excel CSV file and provides two sorting methods: one using Web Workers and the other without. It allows users to choose the amount of data to sort (e.g., 5000, 25000, 50000, 500000) and evaluates the time taken for each sorting method.

## Instructions for Running Locally

1. **Clone the repository:**

    ```bash
    git clone  https://github.com/Abdul-Muneeb-Qureshi/Sorting-using-web-workers.git
    cd web-workers-sorting
    ```

2. **Open the `index.html` file in your browser to view the application.**

## Performance Findings

Using Web Workers for sorting large datasets provides significant performance improvements. The application compares two sorting methods: one using Web Workers and another without. Results demonstrate that Web Worker sorting is faster, and the UI remains responsive even when handling a large amount of data (500000 entries). This ensures a smoother user experience compared to the traditional sorting method, which can cause UI blocking.

## Challenges Faced and Solutions

1. **Web Worker Communication Issue:**
    - **Challenge:** Communicating between the main thread and Web Workers.
    - **Solution:** Utilized the postMessage API for communication and structured data passing to ensure seamless interaction.

2. **UI Responsiveness Issue:**
    - **Challenge:** Preventing the UI from freezing during the sorting process.
    - **Solution:** Implemented Web Workers to offload sorting tasks, allowing users to perform other operations without experiencing UI blockage.

3. **Algorithm Optimization Issue:**
    - **Challenge:** Ensuring the sorting algorithm is efficient for large datasets.
    - **Solution:** Selected the selection sort algorithm for simplicity and parallelization in Web Workers, optimizing its performance.

## References and Resources

- [MDN Web Docs - Web Workers API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [W3C - W3C specification for Web Workers](https://www.w3schools.com/html/html5_webworkers.asp)
- [Stack Overflow - Community-driven Q&A for programming-related questions](https://stackoverflow.com/)
