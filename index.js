const OPTIONS = {
  comment: false,
  label: false,
  prefix: "__INLINE__",
  remove: true,
};

const argumentsInliningVisitor = {
  Identifier(path) {
    for (let i = 0; i < this.params.length; i++) {
      if (path.node.name === this.params[i].name) {
        if (this.args[i]) {
          path.replaceWith(this.args[i]);
          path.skip(); // don't recurse
        } else {
          path.replaceWithSourceString("undefined");
        }
      }
    }
  },
};

const inlineFunctionVisitor = {
  CallExpression(path) {
    if (path.node.callee.name === this.name) {
      const { params } = this;
      const args = path.node.arguments; // grab these before we replace the node
      const returnStatement = this.types.cloneDeep(this.returnStatement);

      path.replaceWith(returnStatement);
      path.traverse(argumentsInliningVisitor, { args, params });
      path.replaceWith(returnStatement.argument);
    }
  },
};

function findComment(node, want) {
  const comments = node.leadingComments || [];

  for (let i = comments.length - 1; i >= 0; --i) {
    const comment = comments[i];

    if (comment.type !== "CommentBlock") {
      break;
    }

    if (comment.value.trim() === want) {
      return `leadingComments.${i}`;
    }
  }
}

function hasSingleStatement(node) {
  return node.body.body.length === 1;
}

function matchLabel(types, statement, label) {
  return types.isLabeledStatement(statement) && statement.label.name === label;
}

module.exports = function ({ types }, options) {
  const { comment, label, prefix, remove } = Object.assign(
    {},
    OPTIONS,
    options
  );

  if (!(comment || label || prefix)) {
    return {};
  }

  return {
    visitor: {
      FunctionDeclaration(path) {
        const { node } = path;

        let returnStatement;

        if (hasSingleStatement(node)) {
          returnStatement = node.body.body[0];
        } else {
          return;
        }

        const { name } = node.id;

        let commentPath;

        if (prefix && name.startsWith(prefix)) {
          // do nothing
        } else if (label && matchLabel(types, returnStatement, label)) {
          returnStatement = returnStatement.body;
        } else if (comment && (commentPath = findComment(node, comment))) {
          if (remove) {
            // remove the comment so it doesn't get attached to the
            // next declaration
            path.get(commentPath).remove();
          }
        } else {
          return;
        }

        path.parentPath.traverse(inlineFunctionVisitor, {
          name,
          params: node.params,
          returnStatement,
          types,
        });

        if (remove) {
          path.remove();
        }
      },
    },
  };
};
