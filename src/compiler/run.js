const vm = require("vm");

function run(jsCode) {
  const script = new vm.Script(jsCode);
  return script.runInThisContext();
}

module.exports = run;
