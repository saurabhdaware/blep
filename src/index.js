const compile = require("./compiler");

/**
 * A language where you define variable with `boop` keyword
 * and print on screen with bark() function
 */
const codeToExecute = `
boop a = "Hello, "; 
boop b = "World!";
boop num1 = 11;
boop num2 = 58;

bark(a + b);
bark(num1 + num2);
`;

compile(codeToExecute);
