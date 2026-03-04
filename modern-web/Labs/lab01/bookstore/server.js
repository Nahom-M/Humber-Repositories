// Import the HTTP module to create a server
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Test Homepage</title>
</head>
<body>

    <header>
        <h1>Welcome to the Test Homepage</h1>
    </header>

    <section id="home">
        <h2>Home</h2>
        <p>This is the homepage of the website.</p>
    </section>

    <footer>
        <p>&copy; 2024 Test Homepage. All rights reserved.</p>
    </footer>

</body>
</html>`);
    res.end();
  } else if (req.url === "/login") {
    if (req.method === "POST") {
      res.write("Login received");
      res.end();
    } else {
      res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Test Login</title>
</head>
<body>

    <header>
        <h1>Form</h1>
        <form method="POST">
            <label>username</label>
            <input>
            <label>password</label>
            <input>
            <button>Submit</button>
        </form>
    </header>

    <footer>
        <p>&copy; 2024 Test Login. All rights reserved.</p>
    </footer>

</body>
</html>`);
      res.end();
    }
  } else if (req.url === "/contact") {
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Test Contact</title>
</head>
<body>

    <header>
        <h1>Contact</h1>
        <p>Contact us via 416-xxx-xxxx or bookstore@gmail.com</p>
    </header>

    <footer>
        <p>&copy; 2024 Test Contact. All rights reserved.</p>
    </footer>

</body>
</html>`);
    res.end();
  }

  // For any other URL, return 'page not found'
  else {
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Error</title>
</head>
<body>

    <header>
        <h1>Error 404 Page Not Found</h1>
    </header>

</body>
</html>`);
    res.end();
  }
});

server.listen(4444);
