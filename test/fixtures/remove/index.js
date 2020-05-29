function __INLINE__inline1 (value) {
    return value || 'prefix'
}

/* inline */ function inline2 (value) {
    return value || 'comment'
}

function inline3 (value) {
    inline: return value || 'label'
}

__INLINE__inline1(foo)
inline2(foo)
inline3(foo)
