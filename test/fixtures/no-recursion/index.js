// confirm we no longer get a "Maximum call stack size exceeded" error if a
// substitution includes a parameter name

function __INLINE__direct (value) {
    return { direct: value }
}

function __INLINE__indirect (value) {
    return { indirect: value }
}

__INLINE__direct(value)

__INLINE__indirect([value])
__INLINE__indirect({ value })
__INLINE__indirect(value(value))
__INLINE__indirect(value(value, [value], { value }))
