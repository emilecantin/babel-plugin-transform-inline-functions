function __INLINE__test (arg1, arg2, arg3) {
    return [arg1, arg2, arg3]
}

__INLINE__test(42, true, 'Hello, world!', 3.1415927)
__INLINE__test(42, true, 'Hello, world!')
__INLINE__test(42, true)
__INLINE__test(42)
__INLINE__test()
