"use strict";

function thunkify(fn) {
    const args = [].slice.call(arguments)
        // const args = Array.prototype.slice.call(arguments);
    return function() {
        return fn.apply(null, args.slice(1)) // remove the first argument which is a function from arguments array
    }
}

function trampolinedFxn(fn) {
    // invoke the argument function passed into trampolinedFxn
    let fxn = fn();
    // possible that fxn is still a function
    while (typeof fxn === 'function') {
        // while its a function, keep invoking it
        fxn = fxn();
    }
    return fxn;
}

module.exports = {
    thunkify,
    trampolinedFxn,
}