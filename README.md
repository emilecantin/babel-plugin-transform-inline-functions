# babel-plugin-transform-inline-functions

[![Build Status](https://travis-ci.org/emilecantin/babel-plugin-transform-inline-functions.svg)](https://travis-ci.org/emilecantin/babel-plugin-transform-inline-functions)
[![NPM Version](https://img.shields.io/npm/v/babel-plugin-transform-inline-functions.svg)](https://www.npmjs.org/package/babel-plugin-transform-inline-functions)

<!-- toc -->

- [NAME](#name)
- [INSTALLATION](#installation)
- [SYNOPSIS](#synopsis)
- [DESCRIPTION](#description)
- [OPTIONS](#options)
  - [comment](#comment)
  - [label](#label)
  - [prefix](#prefix)
  - [remove](#remove)
- [USAGE](#usage)
  - [.babelrc](#babelrc)
  - [CLI](#cli)
  - [API](#api)
- [DEVELOPMENT](#development)
  - [NPM Scripts](#npm-scripts)
- [COMPATIBILITY](#compatibility)
- [CAVEATS](#caveats)
- [SEE ALSO](#see-also)
- [VERSION](#version)
- [AUTHOR](#author)
- [COPYRIGHT AND LICENSE](#copyright-and-license)

<!-- tocstop -->

# NAME

babel-plugin-transform-inline-functions - a Babel plugin to inline selected functions

# INSTALLATION

```sh
$ npm install babel-plugin-transform-inline-functions
```

# SYNOPSIS

`$ cat test.js`

```javascript
function __INLINE__coalesce (value) {
    return value ?? ''
}

const foo = __INLINE__coalesce(options.foo)
```

`$ babel --plugins transform-inline-functions test.js`

```javascript
const foo = options.foo ?? ''
```

# DESCRIPTION

This is a [Babel](https://babeljs.io/)
[plugin](https://babeljs.io/docs/plugins/) which inlines calls to selected
functions within the scope in which the functions are declared. Only functions
which contain a single return statement are inlined. Arguments passed to
inlined functions are substituted for the corresponding parameters in the
function body and (by default) the original function is removed.

Functions can be marked for inlining by using a custom prefix in the function
name, a comment before the function declaration, or a label for the return
statement in the function's body. By default, functions whose names begin with
`"__INLINE__"` are inlined, but this can be modified or disabled via the
plugin's options.

# OPTIONS

The following plugin options are supported.

## comment

- **Type**: `string | false`
- **Default**: `false`

Select functions for inlining by the presence of a block comment before the
`function` keyword in the declaration. If set, the comment body is trimmed and
compared to the option's value, and, if equal, the function is inlined. If set
to false (as it is by default), function declaration comments are not checked.

### Config

```json
{
    "plugins": [
        ["transform-inline-functions", {
            "comment": "inline"
        }]
    ]
}
```

### Input

```javascript
/* inline */ function coalesce (value) {
    return value ?? ''
}

const foo = coalesce(options.foo)
```

### Output

```javascript
const foo = options.foo ?? ''
```

## label

- **Type**: `string | false`
- **Default**: `false`

Select functions for inlining by the presence of a label with this name before
the return statement. If set to false (as it is by default), return statement
labels are not checked.

### Config

```json
{
    "plugins": [
        ["transform-inline-functions", {
            "label": "inline"
        }]
    ]
}
```

### Input

```javascript
function coalesce (value) {
    inline: return value ?? ''
}

const foo = coalesce(options.foo)
```

### Output

```javascript
const foo = options.foo ?? ''
```

## prefix

- **Type**: `string | false`
- **Default**: `"__INLINE__"`

Select functions for inlining whose names start with the specified prefix. If
set to false, function names are not checked.

### Config

```json
{
    "plugins": [
        ["transform-inline-functions", {
            "prefix": "__inline__"
        }]
    ]
}
```

### Input

```javascript
function __inline__coalesce (value) {
    return value ?? ''
}

const foo = __inline__coalesce(options.foo)
```

### Output

```javascript
const foo = options.foo ?? ''
```

## remove

- **Type**: `boolean`
- **Default**: `true`

Remove the inlined function declaration. If set to false, the declaration is preserved.

### Config

```json
{
    "plugins": [
        ["transform-inline-functions", {
            "remove": false
        }]
    ]
}
```

### Input

```javascript
function __INLINE__coalesce (value) {
    return value ?? ''
}

const foo = __INLINE__coalesce(options.foo)
```

### Output

```javascript
function __INLINE__coalesce (value) {
    return value ?? ''
}

const foo = options.foo ?? ''
```

# USAGE

<details>

## .babelrc

`$ cat .babelrc`

```json
{
    "plugins": ["transform-inline-functions"]
}
```

## CLI

```sh
$ babel --plugins transform-inline-functions script.js
```

## API

```javascript
require('@babel/core').transform(code, {
    plugins: ['transform-inline-functions']
})
```

</details>

# DEVELOPMENT

<details>

## NPM Scripts

The following NPM scripts are available:

- doctoc - generate the TOC (table of contents) in the README
- test - run the test suite

</details>

# COMPATIBILITY

- Babel 6+ (only Babel 7+ is tested/supported)
- [Maintained node versions](https://github.com/nodejs/Release#release-schedule)

# CAVEATS

- inlining may bloat your code
- inlining may not speed things up and may even slow things down<sup>1</sup>
- only works with functions that have a single return statement and simple (i.e. non-destructuring) parameters: keep things simple

<sup>1</sup> Particularly on v8, which may have a better idea of what should be
inlined when, and the memory/speed tradeoffs, than the developer.

# SEE ALSO

- [babel-plugin-nofn](https://www.npmjs.com/package/babel-plugin-nofn) - convert some array-method calls to inline loops

# VERSION

1.0.4

# AUTHOR

- [Emile Cantin](https://github.com/emilecantin)

# COPYRIGHT AND LICENSE

Copyright © 2016-2020 by Emile Cantin.

This is free software; you can redistribute it and/or modify it under the terms
of the [ISC License](https://opensource.org/licenses/ISC).
