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
        returnDataType = 'array', dataSetSize, minValue = 0, maxValue = dataSetSize, roundup = true, decimalplace = 0, stringCase = 0, stringType = '', stringLength = 8, numberIsmultipleOf = -1, singleDigitStrings = 1, prefereredKeys = [], objectSizeFixed = 0, dataSetTypes = []
    } = options;
    // STRING
    //  stringCase = 0 - LowerCase, 1 - UpperCase, 2 - TitleCase
    //  stringType = '', 'hex', '.......' => for the pattern string generation
    //  stringLength = 8 //especially for use case with hexadecimals
    //  singleDigitStrings: 1 or 0. 0 is dynamic and can make numbers have more than a size/length of 1 but 1 will be just a digit

    // NUMBER
    //  numberIsmultipleOf = -1 ......

    // OBJECTS
    //  prefereredKeys = []
    //  objectSizeFixed = 0 - same as number of keys provided if is more than 1 
    //                    1 - could be less than the number of keys provided.

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
    // console.log(`prefereredKeys ::: ${prefereredKeys}`);
    // console.log(`objectSizeFixed ::: ${objectSizeFixed}`);
    // console.log('dataSetTypes ::: ', dataSetTypes);

    // // console.log(`defaultData ::: ${defaultData}`);


    // return default data if provided
    // const returnedIntialData =  ' debug control
    return options.defaultData ? options.defaultData : function() {
        // when there is no default data provided in the options argument
        //  invoke this IIFE in scope

        // initialize accumulator for returnDataType argument using the ternary operation to nest 3 If-Then for array, object and other primitive types
        let initialDataSet = returnDataType === 'array' ? [] : returnDataType === 'object' ? {} : returnDataType === 'string' ? generateString(options) : returnDataType === 'number' ? -1 : returnDataType === 'boolean' ? false : returnDataSet;
        let objectKeys = [];
        // perform object keys flexibility
        if (prefereredKeys.length > 0) {
            // if we have some preferered keys for our objects
            // need to know if we should make the length of the object flexible
            objectKeys = objectKeys.concat(prefereredKeys);
            // shuffle objectKeys array
            // objectKeys.
            objectKeys = objectKeys.shuffleKeys();
            if (objectSizeFixed == 0) {
                // maintain the same and implement no flexibility
                //  objectSizeFixed = 0 - same as number of keys provided if is more than 1 
                // prefereredKeys = [], objectSizeFixed = 0
            } else {
                // implement flexibility in the numner of keys so keys could be less or equal to preferredKeys.length
                //                    1 - could be less than the number of keys provided.

                // generate a random number between 0 and objectKeys.length 
                let limitOfKeys = randomizeType(objectKeys.length);
                //  trim the objectKeys array based on the random number,
                //      this will mean we can have less number of keys
                objectKeys = objectKeys.slice(0, limitOfKeys + 1)
            }

        }
        return new Array(dataSetSize).fill(0).map(function(n) {
                // if the data set array in the options argument is empty, then generate numbers as default
                return dataSetTypes.length === 0 ? generateNumber(minValue, maxValue, roundup, decimalplace, numberIsmultipleOf) : (function(dataSetTypes) {
                    // invoke magical functions to generate data based on the data set array provided in the options argument randomly using the
                    // IIFE in scope
                    const typeConst = dataSetTypes[randomizeType(dataSetTypes.length)]
                    return (typeConst === 'string') ? generateString(options) : (typeConst === 'number') ? generateNumber(minValue, maxValue, roundup, decimalplace, numberIsmultipleOf) : (typeConst === 'boolean') ? generateBoolean() : (typeConst === 'array' || typeConst === 'object') ? generateObject(options, typeConst, origDataTypes, origDataSetSize) : null;
                })(dataSetTypes);
            })
            // using a reducer, generate return dataSet based returnDataType provided in the options argument
            // print out returnedInitialData  ' debug control
            // return returnedIntialData  ' debug control
            .reduce((returnDataSet, currentData, currentIndex, collectionData) => {
                if (returnDataType === 'number' || returnDataType === 'boolean') {
                    returnDataSet = currentData;
                } else if (returnDataType === 'string') {
                    returnDataSet = `${returnDataSet} ${currentData}`;
                } else if (returnDataType === 'array') {
                    returnDataSet.push(currentData);
                } else if (returnDataType === 'object') {
                    if (objectSizeFixed !== 0) {
                        // if flexibility is activated, we cannot have more data than the number of keys
                        if (currentIndex <= objectKeys.length - 1) {
                            returnDataSet[objectKeys[currentIndex]] = currentData
                        } else if (objectKeys.length === 0) {
                            // i.e. the preferedKeys was empty/[] even though
                            // flexibility was activated
                            // the number of keys hence remains the number of randomly generated numbers
                            returnDataSet[currentIndex] = currentData;
                        }
                        // console.log('Flexibility is Activated here');
                        // console.log('Size of Object was :', collectionData.length)
                        // console.log('Randomly Generated ::', collectionData)
                        // console.log('Size of Object Keys is :', objectKeys.length)
                    } else {
                        if (currentIndex <= objectKeys.length - 1) {
                            returnDataSet[objectKeys[currentIndex]] = currentData;
                        } else {
                            // if flexibilty is not activated, then take all the data as is WHEN the number of keys are exhausted
                            // THIS WILL OCCUR WHEN WE HAVE MORE randomlyGenerated Data in collectionData but less
                            //      keys to use
                            console.log('Flexibility is not activated here');
                            console.log('Size of Object was :', collectionData.length)
                            console.log('Randomly Generated ::', collectionData)
                            console.log('Size of Object Keys is :', objectKeys.length)
                            console.log('currentData is :: ', currentData);
                            console.log('currentIndex is :: ', currentIndex);
                            returnDataSet[currentIndex] = currentData;
                        }
                    }

                    // if (objectSizeFixed === 0 && currentIndex === collectionData.length - 1 && objectKeys.length > collectionData.length) {
                    // THIS WILL OCCUR WHEN WE HAVE more keys to assign randomlyGenerated Data in collectionData
                    //          and THIS will kick in FOR THE ABOVE condition only there is no flexibility 

                    if (currentIndex === collectionData.length - 1 && objectKeys.length > collectionData.length) {
                        // we are @ the last index, do we have more keys unsatisfied from objectKeys
                        //          i.e. randomly generated data is less than the keys we need for this object
                        // generate more data of TYPES string, boolean and number USING key @ index objectsKeys

                        // THIS WILL OCCUR WHEN WE HAVE more keys to assign randomlyGenerated Data in collectionData
                        //          and THIS will kick in whether there is no flexibility or there is flexibility

                        // console.log('Looked like we got here');
                        // console.log('Size of Object was :', collectionData.length)
                        // console.log('Randomly Generated ::', collectionData)
                        // console.log('Size of Object Keys is :', objectKeys.length)

                        const tempTypes = ['string', 'number', 'boolean'];
                        for (let ii = currentIndex + 1; ii <= objectKeys.length - 1; ii++) {
                            const tempConst = tempTypes[randomizeType(tempTypes.length)]
                            returnDataSet[objectKeys[ii]] = (tempConst === 'string') ? generateString(options) : (tempConst === 'number') ? generateNumber(minValue, maxValue, roundup, decimalplace, numberIsmultipleOf) : (tempConst === 'boolean') ? generateBoolean() : generateString(options);
                        }
                    }

                }
                return returnDataSet;
            }, initialDataSet);
    }()

}

Array.prototype.shuffleKeys = function() {
    /*
        Implemeting the Algorithm
        https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method
    */
    for (let ii = this.length - 1; ii > 0; ii--) {
        const jj = Math.floor(Math.random() * ii)
        const temp = this[ii]
        this[ii] = this[jj]
        this[jj] = temp
    }
    return this;
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
            console.log('In here')
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


console.log(
        randomDataSet({
            returnDataType: 'array',
            dataSetSize: 10,
            minValue: 0,
            // maxValue: 10,
            roundup: true,
            decimalplace: 4,
            stringCase: 0, //[0- LowerCase...1 UpperCase...2 - TitleCase]
            stringType: '', // '', 'hex' '......' => pattern
            stringLength: 8,
            singleDigitStrings: 1, // or 1 for singleDigits and 0 for more than one digit
            numberIsmultipleOf: -1,
            prefereredKeys: ['min', 'max', 'level'],
            objectSizeFixed: 0, // 0 - same as number of keys provided if is more than 1 OROR 1 - could be less than the number of keys provided.
            dataSetTypes: ['string', 'number', 'boolean', 'array', 'object']
        })
    ) //, 'object'

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