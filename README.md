# babel-plugin-transform-inline-functions

This is a simple babel plugin to inline some specially marked functions.

Examples
--------

In:

```javascript
function __INLINE__test(test) {
  return test;
}
__INLINE__test("Test 1");
__INLINE__test("Test 2");

```

Out:

```javascript
"Test 1";
"Test 2";
```

Usage
-----

Install the plugin:

```
npm install --save babel-plugin-transform-inline-functions

```

Add this to your .babelrc:

```
  "plugins": ["transform-inline-functions"]

```

And start inlining functions in your code! The plugin will inline all functions starting with `__INLINE__` in their respective scope.

IMPORTANT: The plugin will only output the return statement for your original function; having a full function body will probably not do what you'd expect. Keep things simple.
