/**
 * In our blep language, we don't have various variable declarations like javascript.
 * let, var, const is not possible. boop is the only way to define variable.
 *
 * So now set kind: 'var' in every VariableDeclaration node of blepAST
 *
 */

function traverseAndReplaceBark(node) {
  if (
    node.type === "CallExpression" &&
    node.callee.type === "Identifier" &&
    node.callee.name === "bark"
  ) {
    node.callee.type = "MemberExpression";
    node.callee.object = { type: "Identifier", name: "console" };
    node.callee.property = { type: "Identifier", name: "log" };
    node.callee.computed = false;
    node.callee.optional = false;
    return node;
  }

  if (node.type === "ExpressionStatement") {
    node.expression = traverseAndReplaceBark(node.expression);
    return node;
  }

  return node;
}
function transformNodes(blepAST) {
  const jsBody = [];
  for (let node of blepAST) {
    if (node.type === "VariableDeclaration") {
      // set variable kind to 'var'
      node.kind = "var";
    }

    if (node.type === "ExpressionStatement") {
      node = traverseAndReplaceBark(node);
    }
    jsBody.push(node);
  }
  return jsBody;
}

function transform(blepAST) {
  const jsNodes = transformNodes(blepAST.body);
  blepAST.body = jsNodes;
  return blepAST;
}

module.exports = transform;
