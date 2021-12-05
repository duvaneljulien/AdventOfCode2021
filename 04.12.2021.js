var fs = require('fs');
var csv = require('csv-parser');
const { exit } = require('process');

var csvData = [];
fs.createReadStream('04.12.2021.csv')
    .pipe(csv({
        separator: ' '
    }))
    .on('data', function (csvrow) {
        csvData.push(csvrow);
    })
    .on('end', function () {
        const picked_numbers = [17,11,37,7,89,48,99,28,56,55,57,27,83,59,53,72,6,87,33,82,13,23,35,40,71,47,78,2,39,4,51,1,67,31,79,69,15,73,80,22,92,95,91,43,26,97,36,34,12,96,86,52,66,94,61,76,64,77,85,98,42,68,84,63,60,30,65,19,54,58,24,20,25,75,93,16,18,44,14,88,45,10,9,3,70,74,81,90,46,38,21,49,29,50,0,5,8,32,62,41]
        const bingo_size = 5

        let is_winner_found = false

        for(let k = 0; k < picked_numbers.length; k++) {
            for(let i = 0; i < csvData.length; i++) {
                if(check_row(csvData[i], picked_numbers.slice(0, k)) === 5) {
                    is_winner_found = true;
                    console.log('row i: ' + i)
                    console.log(csvData[i])
                    console.log(picked_numbers.slice(0, k))
                }
            }
    
            for(let i = 0; i < csvData.length / bingo_size; i++) {
                for(let j = 1; j <= bingo_size; j++) {
                    let temp_row = {
                        '1': csvData[i]['' + j],
                        '2': csvData[i+1]['' + j],
                        '3': csvData[i+2]['' + j],
                        '4': csvData[i+3]['' + j],
                        '5': csvData[i+4]['' + j]
                    }
    
                    if(check_row(temp_row, picked_numbers.slice(0, k)) === 5) {
                        console.log('col i: ' + i)
                        is_winner_found = true;
                    }
                }
            }

            if(is_winner_found) break;
        }
    });

var check_row = function(row, numbers) {
    const winning_number = Object.keys(row)
    let found_numbers = 0

    for(let j = 0; j < numbers.length; j++) {
        for(let i = 0; i < winning_number.length; i++) {
            if(numbers[j] == row[winning_number[i]]) {
                found_numbers++;
            }
        }
    }
    return found_numbers;
}

// 16 + 62 + 3 + 75 +   84 + 54 + 10 + 1 + 2 + 44 + 21 + 42 + 0 + 64 + 91 + 45 + 67 + 34   
// 715
// dernier numéro = 78
// donc résultat = 55770


// 17, 11, 37,  7, 89, 48, 99, 28,
// 56, 55, 57, 27, 83, 59, 53, 72,
//  6, 87, 33, 82, 13, 23, 35, 40,
// 71, 47, 78