"use strict";

const {
    randomDataSet,
    randomizeType,
    generateNumber
} = require('./testData');

const {
    getObjectSize
} = require('./measure');

const {
    thunkify,
    trampolinedFxn
} = require('./helper');

function testmetrics(
    snippets,
    baseParams,
) {
    // verify that the snippets array contents are 
    if (!snippets) return 'no available functions to test';
    if (!snippets.reduce(function verifyfxnargs(fxndo, f) {
            return !fxndo ? false : typeof f === 'function' ? true : false;
        }, true)) return 'one of more function(s) is missing';

    // process baseParams
    const processedParams = baseParams.map(function pPrms(prmObj) {
        console.log('Each Param :: ', prmObj)
        if (prmObj && prmObj.type) {

        }
        return prmObj.prmObj;
    })

    // console.log(processedParams)

    // generate a multidimensioal Array of the same size as the snippets Argument
    //  this Array keeps track of the functions to be evaluated and a host of other variables
    //  such as the 
    //              BigO data array generated, 
    //              the average time it took for all the iterations
    //   
    //
    //
    //

    // genrate another array of the same size as the number of keys in the baseParams argument
    // this will be the a multidimensional array with columns
    //                                                       number of keys i.e. the number of paramters for each function
    //                                           and  rows
    //                                                       number of iterations to be made as the 
    //                                                       there will be an increased size of dataSet for each iteration

    // begin to conduct the evaluation


}


module.exports = {
    testmetrics
}