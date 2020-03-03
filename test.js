"use strict";

// DEVELOPMENT
const {
    testmetrics,
    argumentTypes,
    sizeofExecutedObject,
    formatByteSize
} = require('./testmetrics');

const {
    adjectives
} = require('./config/adjectives');

const {
    nouns
} = require('./config/nouns');

var origDataTypes, origDataSetSize;
var randstring = nouns.concat(adjectives); //.shuffle()
// // PRODUCTION
// const {testmetrics, argumentTypes} = require('./metrics');

function test1() {
    let xty = [];
    let bb = {};

    function innerM() {
        const ix = []
    }
}

function test2() {
    const ib = {};
    const arr = [];

    function innerMe() {
        let str1 = '';
    }
}
// console.log(test2())
// Object.getOwnPropertyNames(test2()).map(item => console.log(item))

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
    [test1, test2], // , 'test3'
    [{
        min: 0,
        max: 100,
        decimals: 0,
        type: argumentTypes.NUMBER_TYPE
    }]
));


function randomDataSet(options) {
    // destrcuture arguments from options argument
    let {
        returnDataType = 'array', dataSetSize, minValue = 0, maxValue = dataSetSize, roundup = true, decimalplace = 0, stringCase = 0, stringType = '', stringLength = 8, numberIsmultipleOf = -1, singleDigitStrings = 1, dataSetTypes = []
    } = options;
    // STRING
    //  stringCase = 0 - LowerCase, 1 - UpperCase, 2 - TitleCase
    //  stringType = '', 'hex', '.......' => for the pattern string generation
    //  stringLength = 8 //especially for use case with hexadecimals
    //  singleDigitStrings: 1 or 0. 0 is dynamic and can make numbers have more than a size/length of 1 but 1 will be just a digit

    // NUMBER
    //  numberIsmultipleOf = -1 ......

    // OBJECTS

    // avoid mutation data types available in random dataSet
    origDataTypes = (!origDataTypes) ? options.dataSetTypes.slice() : origDataTypes;
    // avoid changes in the main dataset size required when the function was first invoked
    origDataSetSize = (!origDataSetSize) ? options.dataSetSize : origDataSetSize;
    // if numberIsmultipleOf is 0 in options, reset to -1
    options.numberIsmultipleOf = !options.numberIsmultipleOf ? -1 : options.numberIsmultipleOf;

    // console.log('Invoked/Reinvoked Nucleus')
    // console.log(`returnDataType ::: ${returnDataType}`);
    // console.log(`dataSetSize ::: ${dataSetSize}`);
    // console.log(`minValue ::: ${minValue}`);
    // console.log(`maxValue ::: ${maxValue}`);
    // console.log(`roundup ::: ${roundup}`);
    // console.log(`decimalplace ::: ${decimalplace}`);
    // console.log(`stringCase ::: ${stringCase}`);
    // console.log(`stringType ::: ${stringType}`);
    // console.log(`stringLength ::: ${stringLength}`);
    // console.log(`singleDigitStrings ::: ${singleDigitStrings}`);
    // console.log(`numberIsmultipleOf ::: ${numberIsmultipleOf}`);
    // console.log('dataSetTypes ::: ', dataSetTypes);

    // // console.log(`defaultData ::: ${defaultData}`);


    // return default data if provided
    return options.defaultData ? options.defaultData : function() {
        // when there is no default data provided in the options argument
        //  invoke this IIFE in scope

        // initialize accumulator for returnDataType argument using the ternary operation to nest 3 If-Then for array, object and other primitive types
        let initialDataSet = returnDataType === 'array' ? [] : returnDataType === 'object' ? {} : returnDataType === 'string' ? generateString(options) : returnDataType === 'number' ? -1 : returnDataType === 'boolean' ? false : returnDataSet;
        return new Array(dataSetSize).fill(0).map(function(n) {
            // if the data set array in the options argument is empty, then generate numbers as default
            return dataSetTypes.length === 0 ? generateNumber(minValue, maxValue, roundup, decimalplace, numberIsmultipleOf) : (function(dataSetTypes) {
                // invoke magical functions to generate data based on the data set array provided in the options argument randomly using the
                // IIFE in scope
                const typeConst = dataSetTypes[randomizeType(dataSetTypes.length)]
                return (typeConst === 'string') ? generateString(options) : (typeConst === 'number') ? generateNumber(minValue, maxValue, roundup, decimalplace, numberIsmultipleOf) : (typeConst === 'boolean') ? generateBoolean() : (typeConst === 'array' || typeConst === 'object') ? generateObject(options, typeConst, origDataTypes, origDataSetSize) : null;
            })(dataSetTypes);

            // using a reducer, generate return dataSet based returnDataType provided in the options argument
        }).reduce((returnDataSet, currentData, currentIndex) => {
            if (returnDataType === 'number' || returnDataType === 'boolean') {
                returnDataSet = currentData;
            } else if (returnDataType === 'string') {
                returnDataSet = `${returnDataSet} ${currentData}`;
            } else if (returnDataType === 'array') {
                returnDataSet.push(currentData);
            } else if (returnDataType === 'object') {
                returnDataSet[currentIndex] = currentData;
            }
            return returnDataSet;
        }, initialDataSet);
    }()

}

const randomizeType = (rangeSize) => {
    return Number((Math.random() * (Math.floor(rangeSize) - 1)).toFixed(0));
}

function randomizeIndexSelection(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
}

const generateBoolean = () => {
    return randomizeType(2) == 0 ? false : true;
}

const generateNumber = (minValue, maxValue, roundup, decimalplace, numberIsmultipleOf) => {
    let dataRandom,
        keepGenerating = true;
    if (numberIsmultipleOf == -1) {
        if (roundup) {
            dataRandom = Math.round((Math.random() * (maxValue - minValue) + minValue) * Math.pow(10, decimalplace)) / Math.pow(10, decimalplace)
        } else {
            dataRandom = Math.random() * (maxValue - minValue) + minValue;
        }
    } else {
        while (keepGenerating) {
            if (roundup) {
                dataRandom = Math.round((Math.random() * (maxValue - minValue) + minValue) * Math.pow(10, decimalplace)) / Math.pow(10, decimalplace)
            } else {
                dataRandom = Math.random() * (maxValue - minValue) + minValue;
            }
            keepGenerating = !(dataRandom > 0.0 && dataRandom % numberIsmultipleOf === 0.00);
        }
    }
    return dataRandom;
}

const generateString = (options) => {
    let {
        dataSetSize,
        minValue = 0,
        maxValue = dataSetSize,
        roundup = true,
        decimalplace = 0,
        stringType = '',
        stringCase = 0,
        stringLength = 8,
        numberIsmultipleOf = -1,
        singleDigitStrings = 1
    } = options

    if (singleDigitStrings = 1) {
        // dataSetSize && maxValue could be more than 1 digit, 
        //  change based on options argument
        maxValue = 1;
    }
    let [string, setOfChars, numbers, hexChars] = ['', '', '0123456789', 'abcdef'];
    if (stringType == '') {
        return stringCase == 0 ? randstring[randomizeIndexSelection(0, randstring.length + 1)] : stringCase == 1 ? randstring[randomizeIndexSelection(0, randstring.length + 1)].toUpperCase() : stringCase == 2 ? stringTitlecase(randstring[randomizeIndexSelection(0, randstring.length + 1)]) : randstring[randomizeIndexSelection(0, randstring.length + 1)];
    } else if (stringType == 'hex') {
        setOfChars = stringCase == 1 ? numbers + hexChars.toUpperCase() : numbers + hexChars;
        for (let ii = 1; ii <= stringLength; ii++) {
            string += setOfChars.charAt(Math.floor(Math.random() * setOfChars.length));
        }
    } else {
        // must be some pattern
        for (let ii = 0; ii < stringType.length; ii++) {
            if (stringType[ii] == " ") {
                setOfChars = ' ';
            } else if ((stringType[ii] == stringType[ii].toUpperCase()) && (stringType[ii] != stringType[ii].toLowerCase())) {
                setOfChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            } else if ((stringType[ii] == stringType[ii].toLowerCase()) && (stringType[ii] != stringType[ii].toUpperCase())) {
                setOfChars = "abcdefghijklmnopqrstuvwxyz";
            } else if ('0123456789'.indexOf(stringType[ii]) !== -1) {
                setOfChars = "0123456789";
            } else {
                setOfChars = "#!@~$%^&*)-_";
            }
            // invoke generateNumber only if stringType @ ii is numeric
            //  && singleDigitsStrings are not enforced i.e. we could generate numbers that have more than a single digit
            string += ('0123456789'.indexOf(stringType[ii]) !== -1) && (singleDigitStrings === 0) ? generateNumber(minValue, maxValue, roundup, decimalplace, numberIsmultipleOf) : setOfChars.charAt(Math.floor(Math.random() * setOfChars.length));
        }
    }
    return string;
}

const generateObject = (options, returnDataType, origDataTypes, origDataSetSize) => {
    options.dataSetTypes = origDataTypes.filter(item => item !== returnDataType);
    // remove defaultData if its in options
    if (options.defaultData) {
        delete options.defaultData
    }
    options.returnDataType = returnDataType;
    options.dataSetSize = randomizeType(origDataSetSize / (options.dataSetTypes.length + 1)) + 1

    // dataSetSize = randomizeType(dataSetSize / setTypes.length) + 1
    // setTypes = options.dataSetTypes.filter(item => item !== options.returnDataType);
    // options.dataSetTypes = options.dataSetTypes.filter(item => item !== options.returnDataType).slice();
    // dataSetSize / setTypes.length + 1  ::: add one back to the setTypes.length because one was already filterered away
    // // randomizeType(dataSetSize / setTypes.length + 1) + 1 ::: add one back to the evaluated result from randomizetype to avoid zeros
    return randomDataSet(options);
}

function stringTitlecase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const stringGenConcept = (stringType = '', stringCase = 0, stringLength = 8) => {
    let options = {
        returnDataType: 'array',
        dataSetSize: 50,
        minValue: 0,
        maxValue: 50,
        roundup: true,
        decimalplace: 0,
        stringCase: 1, //[0- LowerCase...1 UpperCase...2 - TitleCase]
        stringType: 'A0B0C0D0E0', // '', 'hex' '......' => pattern
        stringLength: 8,
        singleDigitStrings: 1,
        numberIsmultipleOf: -1,
        dataSetTypes: [],
        defaultData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }

    let [string, setOfChars, numbers, hexChars] = ['', '', '0123456789', 'abcdef'];
    if (stringType == '') {
        return stringCase == 0 ? randstring[randomizeIndexSelection(0, randstring.length + 1)] : stringCase == 1 ? randstring[randomizeIndexSelection(0, randstring.length + 1)].toUpperCase() : stringCase == 2 ? stringTitlecase(randstring[randomizeIndexSelection(0, randstring.length + 1)]) : randstring[randomizeIndexSelection(0, randstring.length + 1)];
    } else if (stringType == 'hex') {
        setOfChars = stringCase == 1 ? numbers + hexChars.toUpperCase() : numbers + hexChars;
        for (let ii = 1; ii <= stringLength; ii++) {
            string += setOfChars.charAt(Math.floor(Math.random() * setOfChars.length));
        }
    } else {
        // must be some pattern
        for (let ii = 0; ii < stringType.length; ii++) {
            if (stringType[ii] == " ") {
                setOfChars = ' ';
            } else if ((stringType[ii] == stringType[ii].toUpperCase()) && (stringType[ii] != stringType[ii].toLowerCase())) {
                setOfChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            } else if ((stringType[ii] == stringType[ii].toLowerCase()) && (stringType[ii] != stringType[ii].toUpperCase())) {
                setOfChars = "abcdefghijklmnopqrstuvwxyz";
            } else if ('0123456789'.indexOf(stringType[ii]) !== -1) {
                setOfChars = "0123456789";
            } else {
                setOfChars = "#!@~$%^&*)-_";
            }
            string += ('0123456789'.indexOf(stringType[ii]) !== -1) && (options.singleDigitStrings === 0) ? generateNumber(options.minValue, options.maxValue, options.roundup, options.decimalplace, options.numberIsmultipleOf) : setOfChars.charAt(Math.floor(Math.random() * setOfChars.length));
        }
    }
    return string;
}

// console.log(stringGenConcept('A0B0C0D0E0'));
// console.log(stringGenConcept('hex', 1));

// let {
//     dataSetSize,
//     minValue = 0,
//     maxValue = dataSetSize,
//     roundup = true,
//     decimalplace = 0,
//     numberIsmultipleOf = -1
// } = options
//minValue, maxValue, roundup, decimalplace, numberIsmultipleOf

// console.log(generateNumber())

console.log(randomDataSet({
        returnDataType: 'array',
        dataSetSize: 50,
        minValue: 0,
        // maxValue: 10,
        roundup: true,
        decimalplace: 4,
        stringCase: 0, //[0- LowerCase...1 UpperCase...2 - TitleCase]
        stringType: '', // '', 'hex' '......' => pattern
        stringLength: 8,
        singleDigitStrings: 1, // or 1 for singleDigits and 0 for more than one digit
        numberIsmultipleOf: 3,
        dataSetTypes: ['string', 'number', 'boolean', 'array', 'object']
    })) //, 'object'

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
//     // dataSetTypes: [],
//     // defaultData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// }))