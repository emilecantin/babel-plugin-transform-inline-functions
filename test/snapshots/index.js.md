# Snapshot report for `test/index.js`

The actual snapshot is saved in `index.js.snap`.

Generated by [AVA](https://avajs.dev).

## callback

> callback

    `(location, cb) => {␊
      require.ensure([], (require) => {␊
        cb(null, require("./app/explore/Explore").default);␊
      });␊
    };␊
    `

## comment

> comment

    `/* PURE */␊
    ␊
    /* PURE */␊
    ␊
    /* PURE */␊
    function preserve1(value) {␊
      return value || "preserve1";␊
    } // inline␊
    ␊
    function preserve2(value) {␊
      return value || "preserve2";␊
    } //inline␊
    ␊
    function preserve3(value) {␊
      return value || "preserve3";␊
    }␊
    /* inline */␊
    // inline␊
    ␊
    function preserve4(value) {␊
      return value || "preserve4";␊
    }␊
    /* inlined */␊
    ␊
    function preserve5(value) {␊
      return value || "preserve5";␊
    }␊
    ␊
    foo || "inline1";␊
    foo || "inline2";␊
    foo || "inline3";␊
    foo || "inline4";␊
    foo || "inline5";␊
    foo || "inline6";␊
    foo || "inline7";␊
    preserve1(foo);␊
    preserve2(foo);␊
    preserve3(foo);␊
    preserve4(foo);␊
    preserve5(foo);␊
    `

## disabled

> disabled

    `function __INLINE__inline1(value) {␊
      return value || "prefix";␊
    }␊
    /* inline */␊
    ␊
    function inline2(value) {␊
      return value || "comment";␊
    }␊
    ␊
    function inline3(value) {␊
      inline: return value || "label";␊
    }␊
    ␊
    __INLINE__inline1(foo);␊
    ␊
    inline2(foo);␊
    inline3(foo);␊
    `

## label

> label

    `foo || "inline1";␊
    `

## missing-arguments

> missing-arguments

    `[42, true, "Hello, world!"];␊
    [42, true, "Hello, world!"];␊
    [42, true, undefined];␊
    [42, undefined, undefined];␊
    [undefined, undefined, undefined];␊
    `

## multiples

> multiples

    `"Test 1";␊
    "Test 2";␊
    `

## no-recursion

> no-recursion

    `// confirm we no longer get a "Maximum call stack size exceeded" error if a␊
    // substitution includes a parameter name␊
    ({␊
      direct: value,␊
    });␊
    ({␊
      indirect: [value],␊
    });␊
    ({␊
      indirect: {␊
        value,␊
      },␊
    });␊
    ({␊
      indirect: value(value),␊
    });␊
    ({␊
      indirect: value(value, [value], {␊
        value,␊
      }),␊
    });␊
    `

## prefix

> prefix

    `function control(value) {␊
      return [value, 42];␊
    }␊
    ␊
    const foo = options.foo || "";␊
    `

## remove

> remove

    `function __INLINE__inline1(value) {␊
      return value || "prefix";␊
    }␊
    /* inline */␊
    ␊
    function inline2(value) {␊
      return value || "comment";␊
    }␊
    ␊
    function inline3(value) {␊
      inline: return value || "label";␊
    }␊
    ␊
    foo || "prefix";␊
    foo || "comment";␊
    foo || "label";␊
    `

## scope

> scope

    `function testScope() {␊
      "This is inlined";␊
    }␊
    ␊
    __INLINE__test("This is NOT inlined");␊
    `

## simple

> simple

    `"Mon beau test";␊
    `