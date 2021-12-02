var fs = require('fs');
var csv = require('csv-parser');

var csvData = [];
fs.createReadStream('01.12.2021.csv')
    .pipe(csv({
        separator: ' '
    }))
    .on('data', function (csvrow) {
        csvData.push(csvrow);
    })
    .on('end', function () {
        console.log('Number of values = ' + csvData.length)
        const sliding_window = 3
        let sliding_values = []
        for (let i = 0; i < csvData.length - sliding_window + 1; i++) {
            sliding_values[i] = +csvData[i].depth + +csvData[i + 1].depth + +csvData[i + 2].depth
        }

        console.log(`Number of sliding values = ${sliding_values.length}`)
        let increased_time = 0;
        for (let i = 0; i < sliding_values.length; i++) {
            if (sliding_values[i] < sliding_values[i + 1]) {
                console.log('Previous sliding : ' + sliding_values[i] + ', new sliding : ' + sliding_values[i + 1])
                increased_time += 1
            }
        }
        console.log(increase_time)
    });