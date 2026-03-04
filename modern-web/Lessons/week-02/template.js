const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('home')
});

/*app.post();
app.update();
app.delete();*/

app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
});