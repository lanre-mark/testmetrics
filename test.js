"use strict";

// DEVELOPMENT
const {
    testmetrics,
} = require('./testmetrics');

const {
    sizeofExecutedObject,
    formatByteSize,
} = require('./measure');

const {
    thunkify,
    trampolinedFxn
} = require('./helper');

const {
    randomDataSet,
    generateNumber,
    randomizeType,
} = require('./testData');


// // PRODUCTION
// const {testmetrics, argumentTypes} = require('./metrics');



var obj = {
    locaMethod: function() {
        alert("hello");
    },
    a: "b",
    c: 2
};


// for (var p in obj) {
//     console.log('New Object')
//     console.log(p + ": " + obj[p]); //if you have installed Firebug.
// }

// console.log(testmetrics(
//     // [test1, test2], // , 'test3'
//     [], [{
//         min: 0,
//         max: 100,
//         decimals: 0,
//         // type: argumentTypes.NUMBER_TYPE
//     }]
// ));


// let {
//     dataSetSize,
//     minValue = 0,
//     maxValue = dataSetSize,
//     roundup = true,
//     decimalplace = 0,
//     numberIsmultipleOf = -1
// } = options
//minValue, maxValue, roundup, decimalplace, numberIsmultipleOf

// let
//     dataSetSize = 50,
//     minValue = 0,
//     maxValue = dataSetSize,
//     roundup = true,
//     decimalplace = 4,
//     numberIsmultipleOf = 3;
// console.log(generateNumber(minValue, maxValue, roundup, decimalplace, numberIsmultipleOf))


// const typeTemp = ['string', 'number', 'boolean', 'array', 'object'];
// if (typeTemp.includes('object') && typeTemp.includes('array')) {
//     // make sure both of them are not in the dataSetTypes
//     const excludeEither = ['array', 'object'];
//     const excludeIndex = randomizeType(excludeEither.length)
//     const excludedType = typeTemp.filter(item => !excludeEither[excludeIndex].includes(item))
//     console.log(excludedType)
//         // tempTypes[randomizeType(tempTypes.length)]

// }


// console.log(
const generatedObject = randomDataSet({
        returnDataType: 'array',
        dataSetSize: 1000,
        minValue: 0,
        // maxValue: 10,
        roundup: true,
        decimalplace: 4,
        stringCase: 0, //[0- LowerCase...1 UpperCase...2 - TitleCase]
        stringType: '', // '', 'hex' '......' => pattern
        stringLength: 8,
        singleDigitStrings: 1, // or 1 for singleDigits and 0 for more than one digit
        numberIsmultipleOf: 3,
        prefereredKeys: [], //['min', 'max', 'level'],
        objectSizeFixed: 0, // 0 - same as number of keys provided if is more than 1 OROR 1 - could be less than the number of keys provided.
        dataSetTypes: ['string', 'number', 'boolean', 'array', 'object']
    })
    // ) //, 'object'
    // console.log(generatedObject)
    // console.log(formatByteSize(sizeofExecutedObject(generatedObject)))

// console.log(randomDataSet({
//     // returnDataType: 'array',
//     dataSetSize: 50,
//     // minValue: 0,
//     // maxValue: 50,
//     // roundup: true,
//     // decimalplace: 0,
//     // stringCase: 0, [0- LowerCase...1 UpperCase...2 - TitleCase]
//         stringType: '', // '', 'hex' '......' => pattern
//         stringLength: 8, 
//          singleDigitStrings: 1, // or 1 for singleDigits and 0 for more than one digit
//         numberIsmultipleOf: -1,
// prefereredKeys: [],
// objectSizeFixed: 0, // 0 - same as number of keys provided if is more than 1 OROR 1 - could be less than the number of keys provided.
//     // dataSetTypes: [],
//     // defaultData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// }))
function diagonal(n, p) {
    // your code
    if (p === 0) return n + 1;
    // we would have numbers generated from 1 to n + 1
    let pascalsRow = [];
    const pascalTriangleOfRowN = (n, arr) => {
        if (arr.length > n) {
            return arr;
        }
        // start with an empty array and always push 1 to the beginning of the array
        //  using unshift [1], [1, 1], [1, 1, 1], [1, 1, 1, 1], .........
        // arr.unshift(1)

        // COS of the time complexity of unshift, lets use push instead 
        //      which is a O(1) as opposed to O(n)
        arr.push(1);
        //  using push [1], [1, 1], [1, 1, 1], [1, 1, 1, 1], .........

        // console.log("BEFORE ITERATION :: ", arr)
        // from 1 (2nd index) to the end of the array - 1, since the last will also be a 1
        // reassign the addition of current Index and next index to the current Index
        // for (let ii = 1; ii < arr.length - 1; ii++) {
        //     arr[ii] = arr[ii] + arr[ii + 1]
        // }

        // console.log("BEFORE ITERATION :: ", arr)
        // from end of the array - 1 to the 1 (2nd index) , since the first will alread be a 1
        // reassign the addition of current Index and previous index to the current Index
        for (let ii = arr.length - 2; ii > 0; ii--) {
            arr[ii] = arr[ii - 1] + arr[ii]
        }
        // [1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 10, 6, 4, 1]
        // console.log("AFTER ITERATION :: ", arr)
        pascalTriangleOfRowN(n, arr);
    }
    pascalTriangleOfRowN(n, pascalsRow);
    // console.log(pascalsRow);
    // take index p and p + 1 of the returned array and add them as the result to be returned
    return ((pascalsRow[0, p]) ? pascalsRow[0, p] : 0) + ((pascalsRow[0, p + 1]) ? pascalsRow[0, p + 1] : 0);
}

console.log(diagonal(7, 4));

// const getRow = rowIndex => {
//     const res = []
//     while (res.length <= rowIndex) {
//         console.log("Before Unshift ====")
//         console.log(res)
//         res.unshift(1)
//         console.log("After :: ", res)
//         for (let i = 1; i < res.length - 1; i++) {
//             res[i] += res[i + 1]
//         }
//         console.log("Loop Completed :: ", res);
//     }
//     return res
// }
// console.log(getRow(5))