var Doxy = require('./doxy');
var fs = require('fs');

fs.readFile('../ecmascript_simd.js', function cb(err, data) {
    if (err) {
        console.error(err);
        return;
    }

    var comments = new Doxy(data).content();

    var script = "function asmCompile() { var f = Function.apply(null, arguments);\n" +
            "assertEq(!isAsmJSCompilationAvailable() || isAsmJSModule(f), true);" +
            "return f; }\n";

    for (var key in comments) {

        // Ignore signMask
        if (key.indexOf("Object\.") !== -1)
            continue;

        op = key.replace('SIMD\.float32x4', 'f4')
                .replace('SIMD\.int32x4', 'i4')
                .replace('SIMD\.float64x2', 'f2')
                .replace('SIMD\.int16x8', 'i8')
                .replace('SIMD\.int8x16', 'i16');

        // Ignore constructors
        if (op.indexOf('.') === -1)
            continue;

        var code = "try {" +
            "asmCompile('glob', 'ffi', 'heap', \"'use asm'; var i4=glob.SIMD.int32x4; var f4=glob.SIMD.float32x4; var op=${op}; return {};\");" +
        "} catch(e) {" +
            "print('${key} isnt supported in asm.js');"  +
        "}\n";

        code = code.replace("${op}", op)
                   .replace("${key}", key);

        script += code + '\n';
    }
    console.log(script);
});
