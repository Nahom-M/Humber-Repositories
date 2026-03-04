// Import the HTTP module to create a server
const http = require('http');

// Create a server that listens for requests (req) and sends responses (res)
const server = http.createServer((req, res) => {
    // Check if the requested URL is the root '/'
    if (req.url === '/'){
        // Write 'Hello World' to the response
        res.write('Hello World');
        // End the response
        res.end();
    }
    else if (req.url === 'about'){
        res.write('about us');
        res.end();
    }
    else if (req.url === '/login'){
        res.write('login');
        res.end();
    }
    else if (req.url === '/register'){
        res.write('register');
        res.end();
    }
    else if (req.url === '/logout'){
        res.write('logout');
        res.end();
    }

    // For any other URL, return 'page not found'
    else{
        res.write('page not found');
        res.end();
    }
});

// Set the server to listen on port 3000
server.listen(3000);

// Output a message to the console when the server is running
console.log('Listening to on port 3000');