var Doxy = require('./doxy');
var fs = require('fs');

fs.readFile('../ecmascript_simd.js', function cb(err, data) {
    if (err) {
        console.error(err);
        return;
    }

    var comments = new Doxy(data).content();
    var script = "var print = print || console.log;\n" +
                "print('Not implemented in your browser:')\n";
    for (var key in comments)
        script += "try { if (typeof " + key + " === 'undefined') print('" + key + "'); } catch (e) {}\n";
    console.log(script);
});
