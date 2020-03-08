"use strict";

const {
    randomDataSet,
    randomizeType,
    generateNumber
} = require('./testData')

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

    console.log(processedParams)

}


module.exports = {
    testmetrics
}