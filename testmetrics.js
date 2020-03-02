// paramter Constants
const argumentTypes = {
    STRING_TYPE: 'summer',
    NUMBER_TYPE: 'summer',
    OBJECT_PRIMITIES_TYPE: 'winter',
    ARRAY_PRIMITIVES_TYPE: '',
    ARRAY_ALL_TYPE: '',
    ARRAY_INTEGERS_TYPE: '',
    ARRAY_NUMBERS_TYPE: '',
    OBJECT_ALL_TYPE: 'objects_and_others'
}


function formatByteSize(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
    else return (bytes / 1073741824).toFixed(3) + " GiB";
};


function sizeofExecutedObject(object) {
    /*
      sizeof.js
      A function to calculate the approximate memory usage of objects
      Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
      of the CC0 1.0 Universal legal code:
      http://creativecommons.org/publicdomain/zero/1.0/legalcode
    */

    /* Returns the approximate memory usage, in bytes, of the specified object. The
     * parameter is:
     *
     * object - the object whose size should be determined
     */

    // initialise the list of objects and size
    var objects = [object];
    var size = 0;
    // loop over the objects
    for (var index = 0; index < objects.length; index++) {
        // determine the type of the object
        switch (typeof objects[index]) {
            // the object is a boolean
            case 'boolean':
                size += 4;
                break;
                // the object is a number
            case 'number':
                size += 8;
                break;
                // the object is a string
            case 'string':
                size += 2 * objects[index].length;
                break;
                // the object is a generic object
            case 'object':
                // if the object is not an array, add the sizes of the keys
                if (Object.prototype.toString.call(objects[index]) != '[object Array]') {
                    for (var key in objects[index]) size += 2 * key.length;
                }
                // loop over the keys
                for (var key in objects[index]) {
                    // determine whether the value has already been processed
                    var processed = false;
                    for (var search = 0; search < objects.length; search++) {
                        if (objects[search] === objects[index][key]) {
                            processed = true;
                            break;
                        }
                    }
                    // queue the value to be processed if appropriate
                    if (!processed) objects.push(objects[index][key]);
                }
        }
    }
    // return the calculated size
    return size;
}

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
            switch (prmObj.type) {
                case argumentTypes.STRING_TYPE:
                case argumentTypes.NUMBER_TYPE:
                case argumentTypes.OBJECT_PRIMITIES_TYPE:
                case argumentTypes.ARRAY_PRIMITIVES_TYPE:
                case argumentTypes.ARRAY_ALL_TYPE:
                case argumentTypes.ARRAY_INTEGERS_TYPE:
                case argumentTypes.ARRAY_NUMBERS_TYPE:
                case argumentTypes.OBJECT_ALL_TYPE:
            }
        }
        return prmObj.prmObj;
    })

    console.log(processedParams)


}


module.exports = {
    testmetrics,
    argumentTypes,
    sizeofExecutedObject, // dont need this exposed in production
    formatByteSize, // dont need this exposed in production
}