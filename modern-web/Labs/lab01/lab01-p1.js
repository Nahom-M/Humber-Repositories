
const lodash = require('lodash');

//step 1
const holidays = [
    {name: 'Christmas', date: new Date('2024-12-25')},
    {name: 'Canada Day', date: new Date('2025-07-01')},
    {name: 'Birthday', date: new Date('2025-01-29')}
];

const today = new Date()

//step 2
holidays.forEach(holiday => {
    console.log((holiday.date - today) / (1000*60*60*24))
})

//step 3
console.log(lodash.sample(holidays))

//step 4
console.log(lodash.findIndex(holidays, {name: 'Canada Day'}))