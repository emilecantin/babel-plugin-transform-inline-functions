
function testScope() {
  function __INLINE__test(test) {
    return test;
  }
  __INLINE__test("This is inlined");
}

__INLINE__test("This is NOT inlined");
