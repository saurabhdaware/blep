const compile = require("./compiler");

/**
 * A language where you define variable with `boop` keyword
 * and print on screen with bark() function
 */
const codeToExecute = `
boop a = "Hello, "; 
boop b = "World!";
bark(a + b);
`;

compile(codeToExecute);
