var Doxy = require('./doxy');
var fs = require('fs');

fs.readFile('../ecmascript_simd.js', function cb(err, data) {
    if (err) {
        console.error(err);
        return;
    }

    var comments = new Doxy(data).content();
    var output = "";
    for (var key in comments) {
        var paramArray = comments[key].param;

        var inAsmJS = typeof comments[key].asmjs != 'undefined';
        if (!inAsmJS)
            continue;

        if (typeof paramArray === 'undefined') {
            console.log(key, 'has no parameter');
            continue;
        }

        // paramArray === [[paramName, description]]
        var params = paramArray.map(function(subarr) { return subarr[0] })
                               .map(function(val) { return val.replace('{', '').replace('}','') })
                               .map(function(val) { return val.replace('integer', 'intish')
                                                              .replace('double', 'floatish')
                                                              .replace('Number', 'intish') // all Number refer to heap indexes
                                                              .replace('Typed', 'uint8array'); });
        output += key + ": " + params.join(',') + '\n';
    }
    console.log(output);
});
