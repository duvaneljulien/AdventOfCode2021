var fs = require('fs');
var csv = require('csv-parser');

var csvData = [];
fs.createReadStream('02.12.2021.csv')
    .pipe(csv({
        separator: ' '
    }))
    .on('data', function (csvrow) {
        //onsole.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);
    })
    .on('end', function () {
        //do something with csvData
        let horizontal_position = 0
        let depth_position = 0
        let aim = 0
        for (let i = 0; i < csvData.length; i++) {
            if (csvData[i].DIRECTION === 'forward') {
                horizontal_position = +horizontal_position + +csvData[i].VALUE
            }

            if (csvData[i].DIRECTION === 'down') {
                depth_position = +depth_position + +csvData[i].VALUE
            }

            if (csvData[i].DIRECTION === 'up') {
                depth_position = +depth_position - +csvData[i].VALUE
            }
        }

        console.log(depth_position * horizontal_position)
    });