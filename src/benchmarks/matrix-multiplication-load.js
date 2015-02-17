// 4x4 matrix multiplication
// Author: John McCutchan

(function () {

  // Kernel configuration
  var kernelConfig = {
    kernelName:       "MatrixMultiplicationLoad",
    kernelInit:       init,
    kernelCleanup:    cleanup,
    kernelSimd:       simdMultiply,
    kernelNonSimd:    multiply,
    kernelIterations: 10000
  };

  // Hook up to the harness
  benchmarks.add(new Benchmark(kernelConfig));

  // Benchmark data, initialization and kernel functions
  var T1 = new Float32Array(16);
  var T2 = new Float32Array(16);
  var Out = new Float32Array(16);
  var T1x4 = new Float32Array(16);
  var T2x4 = new Float32Array(16);
  var Outx4 = new Float32Array(16);

  function equals(A, B) {
    for (var i = 0; i < 16; ++i) {
      if (A[i] != B[i])
        return false;
    }
    return true;
  }

  function init() {
    T1[0] = 1.0;
    T1[5] = 1.0;
    T1[10] = 1.0;
    T1[15] = 1.0;

    T2[0] = 2.0;
    T2[5] = 2.0;
    T2[10] = 2.0;
    T2[15] = 2.0;

    T1x4[0] = 1.0;
    T1x4[5] = 1.0;
    T1x4[10] = 1.0;
    T1x4[15] = 1.0;

    T2x4[0] = 2.0;
    T2x4[5] = 2.0;
    T2x4[10] = 2.0;
    T2x4[15] = 2.0;

    multiply(1);
    simdMultiply(1);
    return equals(T1, T1x4) && equals(T2, T2x4) && equals(Out, Outx4);
    
  }

  function cleanup() {
    return init(); // Sanity checking before and after are the same
  }

  function multiply(n) {
    for (var i = 0; i < n; i++) {
      var a00 = T1[0];
      var a01 = T1[1];
      var a02 = T1[2];
      var a03 = T1[3];
      var a10 = T1[4];
      var a11 = T1[5];
      var a12 = T1[6];
      var a13 = T1[7];
      var a20 = T1[8];
      var a21 = T1[9];
      var a22 = T1[10];
      var a23 = T1[11];
      var a30 = T1[12];
      var a31 = T1[13];
      var a32 = T1[14];
      var a33 = T1[15];

      var b0 = T2[0];
      var b1 = T2[1];
      var b2 = T2[2];
      var b3 = T2[3];
      Out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      Out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      Out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      Out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

      b0 = T2[4];
      b1 = T2[5];
      b2 = T2[6];
      b3 = T2[7];
      Out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      Out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      Out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      Out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

      b0 = T2[8];
      b1 = T2[9];
      b2 = T2[10];
      b3 = T2[11];
      Out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      Out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      Out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      Out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

      b0 = T2[12];
      b1 = T2[13];
      b2 = T2[14];
      b3 = T2[15];
      Out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      Out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      Out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      Out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    }
  }

  function simdMultiply(n) {
    for (var i = 0; i < n; i++) {
      var a0 = SIMD.float32x4.load(T1x4, 0);
      var a1 = SIMD.float32x4.load(T1x4, 4);
      var a2 = SIMD.float32x4.load(T1x4, 8);
      var a3 = SIMD.float32x4.load(T1x4, 12);

      var b0 = SIMD.float32x4.load(T2x4, 0);
      SIMD.float32x4.store(Outx4, 0, SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b0, 0, 0, 0, 0), a0),
                    SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b0, 1, 1, 1, 1), a1),
                    SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b0, 2, 2, 2, 2), a2),
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b0, 3, 3, 3, 3), a3)))));
      var b1 = SIMD.float32x4.load(T2x4, 4);
      SIMD.float32x4.store(Outx4, 4, SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b1, 0, 0, 0, 0), a0),
                    SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b1, 1, 1, 1, 1), a1),
                    SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b1, 2, 2, 2, 2), a2),
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b1, 3, 3, 3, 3), a3)))));
      var b2 = SIMD.float32x4.load(T2x4, 8);
      SIMD.float32x4.store(Outx4, 8, SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b2, 0, 0, 0, 0), a0),
                    SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b2, 1, 1, 1, 1), a1),
                    SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b2, 2, 2, 2, 2), a2),
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b2, 3, 3, 3, 3), a3)))));
      var b3 = SIMD.float32x4.load(T2x4, 12);
      SIMD.float32x4.store(Outx4, 12, SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b3, 0, 0, 0, 0), a0),
                    SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b3, 1, 1, 1, 1), a1),
                    SIMD.float32x4.add(
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b3, 2, 2, 2, 2), a2),
                      SIMD.float32x4.mul(SIMD.float32x4.swizzle(b3, 3, 3, 3, 3), a3)))));
    }
  }

} ());
