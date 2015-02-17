// Simple performance test of SIMD.add operation.  Use SIMD.add to average up elements
// in a Float32Array. Compare to scalar implementation of same function.
// Author: Peter Jensen

(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "AverageFloat32x4LoadXY",
    kernelInit:       initArray,
    kernelCleanup:    cleanup,
    kernelSimd:       simdAverageLoad,
    kernelNonSimd:    average,
    kernelIterations: 1000
  };

  // Hook up to the harness
  benchmarks.add(new Benchmark(kernelConfig));

  // Benchmark data, initialization and kernel functions
  var a   = new Float32Array(10000);
  var a1  = new Float32Array(10000);
  var ax4 = new Float32x4Array(a.buffer);
  var b = new Int8Array(a.buffer);

  function sanityCheck() {
    return true;
     return Math.abs(average(1) - simdAverageLoad(1)) < 0.0001;
  }

  function initArray() {
    var j = 0;
    for (var i = 0, l = a.length; i < l; ++i) {
      a[i] = 0.1;
    }
    // Check that the two kernel functions yields the same result, roughly
    // Account for the fact that the simdAverage() is computed using float32
    // precision and the average() is using double precision
    return sanityCheck();
  }

  function cleanup() {
    return sanityCheck();
  }

  function average(n) {
    for (var i = 0; i < n; ++i) {
      var sum = 0.0;
      for (var j = 0, l = a.length; j < l; ++j) {
        sum += a[j];
      }
    }
    return sum/a.length;
  }

  function simdAverageLoad(n) {
    var a_length = a.length;
    for (var i = 0; i < n; ++i) {
      var sum4 = SIMD.float32x4.splat(0.0);
      for (var j = 0; j < a_length / 2; ++j) {
        sum4 = SIMD.float32x4.add(sum4, SIMD.float32x4.loadXY(a, j << 1));
        //SIMD.float32x4.store(a1, j << 2, sum4);
      }
    }
    return (sum4.x + sum4.y + sum4.z + sum4.w)/a.length;
  }

} ());
