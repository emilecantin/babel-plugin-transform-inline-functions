function __inline__coalesce (value) {
    return value || ''
}

function control (value) {
    return [value, 42]
}

const foo = __inline__coalesce(options.foo)
