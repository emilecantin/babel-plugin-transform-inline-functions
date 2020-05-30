/* inline */ function inline1 (value) {
    return value || 'inline1'
}

/*inline*/ function inline2 (value) {
    return value || 'inline2'
}

/* inline */
function inline3 (value) {
    return value || 'inline3'
}

/* inline */

function inline4 (value) {
    return value || 'inline4'
}

/* PURE */ /* inline */ function inline5 (value) {
    return value || 'inline5'
}

/* inline */ /* PURE */ function inline6 (value) {
    return value || 'inline6'
}

/* inline */
/* PURE */
function inline7 (value) {
    return value || 'inline7'
}

function preserve1 (value) {
    return value || 'preserve1'
}

// inline
function preserve2 (value) {
    return value || 'preserve2'
}

//inline
function preserve3 (value) {
    return value || 'preserve3'
}

/* inline */
// inline
function preserve4 (value) {
    return value || 'preserve4'
}

/* inlined */
function preserve5 (value) {
    return value || 'preserve5'
}

inline1(foo)
inline2(foo)
inline3(foo)
inline4(foo)
inline5(foo)
inline6(foo)
inline7(foo)

preserve1(foo)
preserve2(foo)
preserve3(foo)
preserve4(foo)
preserve5(foo)
