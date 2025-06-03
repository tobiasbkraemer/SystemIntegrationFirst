// Eksempel på en HTTP GET-request med fetch i Node.js
import fetch from 'node-fetch';

const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
const data = await response.json();

console.log(data);
