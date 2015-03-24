var Doxy = require('./doxy');
var fs = require('fs');

fs.readFile('../ecmascript_simd.js', function cb(err, data) {
    if (err) {
        console.error(err);
        return;
    }

    var comments = new Doxy(data).content();
    var output = '';
    for (var key in comments)
        output += key + '\n'
    console.log(output);
});
