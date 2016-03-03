'use strict';

import Plugin from '../index.js';
import fs from 'fs';
import {parse, transform, traverse, types as t} from 'babel-core';


function load (basename: string): string {
  const filename = `${__dirname}/fixtures/${basename}.js`;
  return fs.readFileSync(filename, 'utf8');
}
function save (basename: string, content:string) {
  const filename = `${__dirname}/fixtures/${basename}.js`;
  fs.writeFileSync(filename, content);
}

function runTest (basename: string, expectedResult: mixed, args: Array = []): void {
  const source = load(basename);
  const transformed = transform(source, {"presets": ["es2015"], plugins: [Plugin]});
  checkCode(basename, transformed.code);
}

function checkCode(basename: string) {
  const filename = `${__dirname}/fixtures/${basename}.js`;
  const source = load(basename);
  const transformedNaked = transform(source, {"presets": [], plugins: [Plugin]}).code;
  if(fs.existsSync(filename.replace('.js', '.expected.js'))) {
    const expected = load(basename + '.expected');
    transformedNaked.should.eql(expected);
  } else {
    save(basename + '.expected', transformedNaked);
  }
}

function run (basename: string, expectedResult: mixed): void {
  it(`should compile macros in "${basename}"`, function () {
    runTest(basename, expectedResult);
  });
}

run.only = function (basename: string, expectedResult: mixed): void {
  it.only(`should compile macros in "${basename}"`, function () {
    try {
      runTest(basename, expectedResult);
    }
    catch (e) {
      if (e.name !== 'AssertionError') {
        console.error(e.stack);
      }
      throw e;
    }
  });
};

function extractPath (scope) {
  const parts = [];
  do {
    parts.unshift(scope.block.type);
  }
  while (scope = scope.parent);
  return parts.join(' ');
}

describe('Babel Macros', function () {
  run("simple");
  run("multiples");
  run("scope");
  run("callback");
});
