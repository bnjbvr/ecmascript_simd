As of March 25th:

** New types:
- float32x4
- int32x4

** Import them with

var float32x4 = global.SIMD.float32x4;
var int32x4 = global.SIMD.int32x4;

** Use these to instantiate values:

SIMD.float32x4: (floatish|double literal) ** 4 -> float32x4
SIMD.int32x4: (intish) ** 4 -> int32x4

Note: the double literal is allowed in SIMD.float32x4 ctor for symmetry with
Math.fround.

Each value instance with these types has 5 method attributes:
- let ScalarType be float for float32x4, signed for int32x4:
  .x -> ScalarType
  .y -> ScalarType
  .z -> ScalarType
  .w -> ScalarType
- .signMask -> signed

** Import operations with
var op = float32x4.operationName;

SIMD.float32x4.abs: float32x4 -> float32x4
SIMD.float32x4.add: float32x4,float32x4 -> float32x4
SIMD.float32x4.and: float32x4,float32x4 -> float32x4
SIMD.float32x4.bitselect: int32x4,float32x4,float32x4 -> float32x4
SIMD.float32x4.check: float32x4 -> float32x4
SIMD.float32x4.div: float32x4,float32x4 -> float32x4
SIMD.float32x4.equal: float32x4,float32x4 -> int32x4
SIMD.float32x4.fromInt32x4Bits: int32x4 -> float32x4
SIMD.float32x4.fromInt32x4: int32x4 -> float32x4
SIMD.float32x4.greaterThan: float32x4,float32x4 -> int32x4
SIMD.float32x4.greaterThanOrEqual: float32x4,float32x4 -> int32x4
SIMD.float32x4.lessThan: float32x4,float32x4 -> int32x4
SIMD.float32x4.lessThanOrEqual: float32x4,float32x4 -> int32x4
SIMD.float32x4.load: Uint8ArrayView,intish -> float32x4
SIMD.float32x4.loadX: Uint8ArrayView,intish-> float32x4
SIMD.float32x4.loadXY: Uint8Array,intish-> float32x4
SIMD.float32x4.loadXYZ: Uint8Array,intish-> float32x4
SIMD.float32x4.max: float32x4,float32x4 -> float32x4
SIMD.float32x4.maxNum: float32x4,float32x4 -> float32x4
SIMD.float32x4.min: float32x4,float32x4 -> float32x4
SIMD.float32x4.minNum: float32x4,float32x4 -> float32x4
SIMD.float32x4.mul: float32x4,float32x4 -> float32x4
SIMD.float32x4.neg: float32x4 -> float32x4
SIMD.float32x4.notEqual: float32x4,float32x4 -> int32x4
SIMD.float32x4.not: float32x4 -> float32x4
SIMD.float32x4.or: float32x4,float32x4 -> float32x4
SIMD.float32x4.reciprocalApproximation: float32x4 -> float32x4
SIMD.float32x4.reciprocalSqrtApproximation: float32x4 -> float32x4
SIMD.float32x4.select: int32x4,float32x4,float32x4 -> float32x4
SIMD.float32x4.shuffle: float32x4,float32x4,(int literal between 0 and 7 inclusive)**4 -> float32x4
SIMD.float32x4.splat: (floatish|double lit) -> void
SIMD.float32x4.sqrt: float32x4 -> float32x4
SIMD.float32x4.store: Uint8Array,intish,float32x4 -> void
SIMD.float32x4.storeX: Uint8Array,intish,float32x4 -> void
SIMD.float32x4.storeXY: Uint8Array,intish,float32x4 -> void
SIMD.float32x4.storeXYZ: Uint8Array,intish,float32x4 -> void
SIMD.float32x4.sub: float32x4,float32x4 -> float32x4
SIMD.float32x4.swizzle: float32x4,(int literal between 0 and 3 inclusive) -> float32x4
SIMD.float32x4.withW: float32x4,(floatish|double lit) -> float32x4
SIMD.float32x4.withX: float32x4,(floatish|double lit) -> float32x4
SIMD.float32x4.withY: float32x4,(floatish|double lit) -> float32x4
SIMD.float32x4.withZ: float32x4,(floatish|double lit) -> float32x4
SIMD.float32x4.xor: float32x4,float32x4 -> float32x4
SIMD.int32x4.add: int32x4,int32x4 -> int32x4
SIMD.int32x4.and: int32x4,int32x4 -> int32x4
SIMD.int32x4.bitselect: int32x4,int32x4,int32x4 -> int32x4
SIMD.int32x4.check: int32x4 -> int32x4
SIMD.int32x4.equal: int32x4,int32x4 -> int32x4
SIMD.int32x4.fromFloat32x4Bits: float32x4 -> int32x4
SIMD.int32x4.fromFloat32x4: float32x4 -> int32x4
SIMD.int32x4.greaterThan: int32x4,int32x4 -> int32x4
SIMD.int32x4.greaterThanOrEqual: int32x4,int32x4 -> int32x4
SIMD.int32x4.lessThan: int32x4,int32x4 -> int32x4
SIMD.int32x4.lessThanOrEqual: int32x4,int32x4 -> int32x4
SIMD.int32x4.load: Uint8ArrayView,intish -> int32x4
SIMD.int32x4.loadX: Uint8ArrayView,intish -> int32x4
SIMD.int32x4.loadXY: Uint8ArrayView,intish -> int32x4
SIMD.int32x4.loadXYZ: Uint8ArrayView,intish -> int32x4
SIMD.int32x4.mul: int32x4,int32x4 -> int32x4
SIMD.int32x4.neg: int32x4 -> int32x4
SIMD.int32x4.notEqual: int32x4,int32x4 -> int32x4
SIMD.int32x4.not: int32x4 -> int32x4
SIMD.int32x4.or: int32x4,int32x4 -> int32x4
SIMD.int32x4.select: int32x4,int32x4,int32x4 -> int32x4
SIMD.int32x4.shiftLeftByScalar: int32x4,intish-> int32x4
SIMD.int32x4.shiftRightArithmeticByScalar: int32x4,intish-> int32x4
SIMD.int32x4.shiftRightLogicalByScalar: int32x4,intish-> int32x4
SIMD.int32x4.shuffle: int32x4,int32x4,(int literal between 0 and 7 inclusive)**4 -> int32x4
SIMD.int32x4.splat: integer -> void
SIMD.int32x4.store: Uint8Array,intish,int32x4 -> void
SIMD.int32x4.storeX: Uint8Array,intish,int32x4 -> void
SIMD.int32x4.storeXY: Uint8Array,intish,int32x4 -> void
SIMD.int32x4.storeXYZ: Uint8Array,intish,int32x4 -> void
SIMD.int32x4.sub: int32x4,int32x4 -> int32x4
SIMD.int32x4.swizzle: int32x4,(int literal between 0 and 3 inclusive)**4 -> int32x4
SIMD.int32x4.withW: int32x4,intish -> int32x4
SIMD.int32x4.withX: int32x4,intish -> int32x4
SIMD.int32x4.withY: int32x4,intish -> int32x4
SIMD.int32x4.withZ: int32x4,intish -> int32x4
SIMD.int32x4.xor: int32x4,int32x4 -> int32x4
