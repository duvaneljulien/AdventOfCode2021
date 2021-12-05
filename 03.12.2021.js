var fs = require('fs');
var csv = require('csv-parser');

var csvData = [];
fs.createReadStream('03.12.2021.csv')
    .pipe(csv({
        separator: ' '
    }))
    .on('data', function (csvrow) {
        csvData.push(csvrow);
    })
    .on('end', function () {
        const length_one_report = csvData[0].binary_value.length
        let reports = new Array(length_one_report).fill(0);

        for(let i = 0; i < csvData.length; i++) {
            for(let j = 0; j < length_one_report; j++) {
                reports[j] = +reports[j] + +csvData[i].binary_value[j]
            }
        }

        for(let j = 0; j < length_one_report; j++) {
            reports[j] = Math.round(reports[j] / csvData.length)
        }

        var flipbits = str => str.split('').map(b => (1 - b).toString()).join('');

        const most_common = parseInt(reports.join(''), 2)
        const least_common = parseInt(flipbits(reports.join('')), 2)
        console.log(most_common)
        console.log(least_common)
        console.log(most_common*least_common)
    });