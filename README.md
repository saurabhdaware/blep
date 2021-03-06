# Blep Language 🐶

*Note: I will not be maintaining this project. I made it only to learn about ASTs and thought I can open-source this code so that people can see the code. If you find something that I've implemented in wrong or not ideal way, feel free to send PR but there won't be any new additions to this language*

A simple programming language where you define variables with `boop` keyword and print them with `bark` keyword. Compiler built in JavaScript.

```
boop a = 3;
boop b = 9;
bark(a + b);
```

## How to use

The compiler is built over JavaScript so it requires Node.js installed.

### Install Compiler
```
npm install -g blep
```

### Run Blep Code

Create `hello.blep` file with following content
```js
boop a = 3;
boop b = 9;
bark(a + b);
```

**Execute the code with**
```
blep hello.blep
```

Output
```
12
```

## Local Setup

```sh
git clone https://github.com/saurabhdaware/blep.git
cd blep/
yarn
yarn link # this register blep command in your terminal

blep examples/hello-world.blep
```

You can try changing the code in `src/index.js`

_Note: It's just a toy so bunch of obvious things may not work_

## UseCases

- Absolutely NONE

This is a toy [@saurabhdaware](https://github.com/saurabhdaware) made because he was bored.
