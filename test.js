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


for (var p in obj) {
    console.log('New Object')
    console.log(p + ": " + obj[p]); //if you have installed Firebug.
}

console.log(testmetrics(
    // [test1, test2], // , 'test3'
    [], [{
        min: 0,
        max: 100,
        decimals: 0,
        // type: argumentTypes.NUMBER_TYPE
    }]
));


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
console.log(formatByteSize(sizeofExecutedObject(generatedObject)))

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