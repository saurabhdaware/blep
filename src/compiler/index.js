const { generate } = require("escodegen");

const tokenize = require("./tokenizer.js");
const parse = require("./parser.js");
const transform = require("./transformer.js");

const run = require("./run.js");

const operators = ["\\+", "-", "\\*", "\\/", "="];
const tokenSchema = {
  varDeclareIdentifier: /boop (.*?)=/,
  nextBlock: /;/,
  stringLiteral: /"(.*?)"/,
  space: / /,
  lineBreak: /\n/,
  operator: new RegExp(operators.join("|")),
  functionIdentifier: /([\w\d]*?)\(/,
  parenClose: /\)/
};

function compile(codeToExecute) {
  const tokens = tokenize(codeToExecute, tokenSchema, "default");
  const blepAST = parse(tokens);
  const jsAST = transform(blepAST);
  const jsCode = generate(jsAST);
  const output = run(jsCode);
  return output;
}

module.exports = compile;
