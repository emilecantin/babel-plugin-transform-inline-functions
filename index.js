'use strict';

const _ = require("lodash");

const argumentsInliningVisitor = {
  Identifier(path) {
    for(let i = 0; i < this.params.length; i++) {
      if (path.node.name === this.params[i].name) {
        path.replaceWith(this.args[0]);
      }
    };
  }
}
const inlineFnVisitor = {
  CallExpression(path) {
    if (path.node.callee.name === this.fn.id.name) {
      const params = this.fn.params;
      const args = path.node.arguments;
      // console.log(this.fn);
      path.replaceWith(this.opts.types.cloneDeep(this.fn.body));
      path.traverse(argumentsInliningVisitor, {params, args});
      path.replaceWith(path.node.callee.body.body[0].body[0].argument);
    }
  }
};

module.exports = function (opts) {
  return {
    visitor: {
      FunctionDeclaration(path) {
        if (path.node.id.name.startsWith('__INLINE__')) {
          const fn = path.node
          path.parentPath.traverse(inlineFnVisitor, {fn, opts});
          path.remove();
        }
      }
    }
  };
}
