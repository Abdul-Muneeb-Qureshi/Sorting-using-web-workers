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

### 1 Limited Access to the DOM:
Web Workers do not have direct access to the DOM. This means they cannot manipulate the DOM directly or access UI elements. Communication between the main thread and Web Workers is typically done through message passing.

**Solution:** Use message passing to communicate between the main thread and Web Workers. Send only necessary data for processing and receive results through message events. If needed, update the DOM in the main thread based on the processed results.

### 2 Communication Overhead:
Passing data between the main thread and Web Workers involves serialization and deserialization, which can introduce some overhead. It's important to be mindful of the data being transferred and avoid unnecessary communication.

**Solution:** Minimize data transfer between the main thread and Web Workers. Break down tasks into smaller chunks to reduce the amount of data sent. Consider using data structures like SharedArrayBuffer when applicable to avoid unnecessary serialization.

### 3 Immutable Data:
To send data between the main thread and Web Workers, the data must be serializable (e.g., using the structured clone algorithm). This can limit the types of data that can be efficiently shared between threads, and mutable objects may require cloning before being sent.

**Solution:** Design your application with immutability in mind. Avoid modifying data directly and instead create new copies with the necessary changes. Use structured cloneable data types to facilitate efficient data transfer between threads.

### 4 Global State:
Web Workers do not share the same global state as the main thread. If your application relies heavily on shared state, you might need to consider alternative strategies for managing state or use additional tools like SharedArrayBuffer.

**Solution:** Carefully manage shared state by using message passing to synchronize updates. Consider using tools like SharedArrayBuffer or libraries that facilitate shared memory patterns. Keep shared state minimal and well-defined to avoid synchronization issues.

### 5 Debugging Challenges:
Debugging code within a Web Worker can be more challenging compared to debugging code in the main thread. Tools for debugging Web Workers are available, but they may not be as seamless as debugging regular JavaScript.

**Solution:** Use browser developer tools that support debugging Web Workers. Set breakpoints, inspect variables, and use console messages within Web Workers. Consider logging messages to the main thread to facilitate easier debugging.

## References and Resources

- [MDN Web Docs - Web Workers API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [W3C - W3C specification for Web Workers](https://www.w3schools.com/html/html5_webworkers.asp)
- [Stack Overflow - Community-driven Q&A for programming-related questions](https://stackoverflow.com/)
