function normalizeValue(val) {
  if (/^-?\d+$/.test(val)) {
    return Number(val);
  } else if (val.startsWith('"') || val.startsWith("'")) {
    return val.slice(1, -1);
  }
}

function parseExpression(tokens, current) {
  let operator;
  let tempCurrent = current;
  while (
    tempCurrent < tokens.length &&
    tokens[tempCurrent].type !== "parenClose"
  ) {
    if (tokens[tempCurrent].type === "operator") {
      operator = tokens[tempCurrent].token;
    }
    tempCurrent += 1;
  }

  if (!operator) {
    return parseToken(tokens, current);
  }

  const [leftCurrent, leftNode] = parseToken(tokens, current);
  const [rightCurrent, rightNode] = parseToken(tokens, leftCurrent);

  const node = {
    type: "BinaryExpression",
    left: leftNode,
    operator: operator,
    right: rightNode
  };
  return [rightCurrent, node];
}

function parseToken(tokens, current) {
  const token = tokens[current];
  if (current >= tokens.length) {
    return [tokens.length, null];
  }

  if (token.type === "varDeclareIdentifier") {
    const [newCurrent, initNode] = parseToken(tokens, current + 1);

    return [
      newCurrent,
      {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: token.matches[0].trim() },
            init: initNode
          }
        ]
      }
    ];
  } else if (token.type === "functionIdentifier") {
    const [newCurrent, argumentsNode] = parseExpression(tokens, current + 1);

    let calleeNode = {
      type: "Identifier",
      name: token.matches[0]
    };

    return [
      newCurrent,
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: calleeNode,
          arguments: [argumentsNode]
        }
      }
    ];
  } else if (token.type === "stringLiteral") {
    return [
      current + 1,
      {
        type: "Literal",
        raw: token.token,
        value: normalizeValue(token.token)
      }
    ];
  } else if (token.type === "default") {
    const isStringVal =
      token.token.startsWith('"') || token.token.startsWith("'");
    if (!/^-?\d+$/.test(token.token) && !isStringVal) {
      return [
        current + 1,
        {
          type: "Identifier",
          name: token.token
        }
      ];
    }

    return [
      current + 1,
      {
        type: "Literal",
        raw: token.token,
        value: normalizeValue(token.token)
      }
    ];
  } else if (
    token.type === "space" ||
    token.type === "nextBlock" ||
    token.type === "lineBreak"
  ) {
    return parseToken(tokens, current + 1);
  } else {
    return parseToken(tokens, current + 1);
  }
}

function parse(tokens) {
  let current = 0;
  let ast = {
    type: "Program",
    body: [],
    sourceType: "module"
  };
  let node = null;
  while (current < tokens.length) {
    [current, node] = parseToken(tokens, current);
    if (node) {
      ast.body.push(node);
    }
  }
  return ast;
}

module.exports = parse;
