const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to router');
});

router.get('/name', (req, res) => {
    res.send('Nahom');
});

router.get('/greeting', (req, res) => {
    res.send('Hello from Nahom, my student ID is n01522132');
});

router.get('/add/:x/:y', (req, res) => {

    if (parseFloat(req.params.x) && parseFloat(req.params.y)){
        res.send(req.params.x + ' + ' + req.params.y + ' = ' + (parseFloat(req.params.x) + parseFloat(req.params.y)));
    }
    else{
        res.send('Incorrect parameters');
    }

    //res.send(JSON.stringify(parseFloat(req.params.x) + parseFloat(req.params.y)))
});



router.get('/calculate/:a/:b/:operation', (req, res) => {
    let answer = 0;
    let parseA = parseFloat(req.params.a);
    let parseB = parseFloat(req.params.b);

    switch (req.params.operation) {
        case '+':
            answer = parseA + parseB;
            break;
    
        case '-':
            answer = parseA - parseB;
            break;

        case '/':
            answer = parseA / parseB;
            break;

        case '*':
            answer = parseA * parseB;
            break;
        
        case '**':
            answer = parseA ** parseB;
            break;

        default:
            break;
    }

    res.send(req.params.a + ' ' + req.params.operation + ' ' + req.params.b + ' = ' + answer);
})


module.exports = router;