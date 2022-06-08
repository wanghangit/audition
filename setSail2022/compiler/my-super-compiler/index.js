// @ts-check
/**
 * Today we're going to write a compiler together. But not just any compiler... A
 * super duper teeny tiny compiler! A compiler that is so small that if you
 * remove all the comments this file would only be ~200 lines of actual code.
 *
 * We're going to compile some lisp-like function calls into some C-like
 * function calls.
 *
 * If you are not familiar with one or the other. I'll just give you a quick intro.
 *
 * If we had two functions `add` and `subtract` they would be written like this:
 *
 *                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
 *
 * Easy peezy right?
 *
 * Well good, because this is exactly what we are going to compile. While this
 * is neither a complete LISP or C syntax, it will be enough of the syntax to
 * demonstrate many of the major pieces of a modern compiler.
 */
const TOKEN_TYPE = {
    PAREN: 'paren',
    NUMBER: 'number',
    STRING: 'string',
    NAME: 'name'
}
const AST_TYPE = {
    PROGRAM: 'Program',
    NUMBER: 'NumberLiteral',
    CALLEXPRESSION: 'CallExpression',
    STRING: 'STRINGLiteral',
    IDENTIFIER: 'Identifier',
    EXPRESSIONSTAMENT: 'ExpressionStatement',
}
const whiteSpaceReg = /\s/;
const numberReg = /[0-9]/;
const nameReg = /[a-zA-Z]/

/**
 * 字符串解析成token
 * 1. 检查括号
 * 2. 跳过空白字符无用处
 * 3. 处理number类型
 * 4. 处理字符串
 * 5. 处理变量name
 * @param {string} input 
 */
function tokenizer(input) {
    let current = 0;
    const tokens = [];
    while (current < input.length) {
        let char = input[current];
        if (char === '(' || char === ')') {
            tokens.push({
                type: TOKEN_TYPE.PAREN,
                value: char
            })
            current++;
            continue;
        }
        if (whiteSpaceReg.test(char)) {
            current++;
            continue;
        }
        if (numberReg.test(char)) {
            let value = '';
            while (numberReg.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({
                type: TOKEN_TYPE.NUMBER,
                value
            })
            continue;
        }
        if (char === '"') {
            let value = '';
            // 需要跳过字符串开头“
            let char = input[++current];
            while (char === '"') {
                value += char;
                char = input[++current];
            }
            // 需要跳过字符串结尾”
            char = input[++current];
            tokens.push({
                type: TOKEN_TYPE.STRING,
                value
            })
            continue;
        }
        if (nameReg.test(char)) {
            let value = '';
            while (nameReg.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({
                type: TOKEN_TYPE.NAME,
                value
            })
            continue;
        }
        throw new Error(`error char is ${char}`)
    }
    return tokens;
}

/**
 * 解析token生成ast语法树
 * 1. 解析number
 * 2. 解析string
 * 3. 解析函数调用(后面第一个为函数名，再后边都是参数，可能存在递归调用，所以生成node也是递归的
 * @param {ReturnType<tokenizer>} tokens 
 */
function parser(tokens) {
    let current = 0;
    function walk() {
        let token = tokens[current];
        if (token.type === TOKEN_TYPE.NUMBER) {
            current++;
            return {
                type: AST_TYPE.NUMBER,
                value: token.value
            }
        }
        if (token.type === TOKEN_TYPE.STRING) {
            current++;
            return {
                type: AST_TYPE.STRING,
                value: token.value
            }
        }
        if (token.type === TOKEN_TYPE.PAREN && token.value === "(") {
            token = tokens[++current];
            const node = {
                type: AST_TYPE.CALLEXPRESSION,
                name: token.value,
                params: []
            }
            token = tokens[++current];
            while (token.type !== TOKEN_TYPE.PAREN
                || token.type === TOKEN_TYPE.PAREN && token.value !== ")"
            ) {
                node.params.push(walk());
                token = tokens[current];
            }
            current++;
            return node;
        }
        throw new TypeError(token.type);
    }
    const ast = {
        type: AST_TYPE.PROGRAM,
        body: []
    }
    while (current < tokens.length) {
        ast.body.push(walk());
    }
    return ast;
}



/**
 * 遍历ast的方法支持自定义visitor
 * @param {*} ast 
 * @param {*} visitor 
 */
function traverser(ast, visitor) {
    function traverseArray(childs, parent) {
        childs.forEach(function (child) {
            traverseNode(child, parent);
        })
    }
    function traverseNode(node, parent) {
        const methods = visitor[node.type];
        if (methods && methods.entry) {
            methods.entry(node, parent)
        }
        switch (node.type) {
            case AST_TYPE.PROGRAM:
                traverseArray(node.body, node);
                break;
            case AST_TYPE.CALLEXPRESSION:
                traverseArray(node.params, node);
                break;
            case AST_TYPE.NUMBER:
            case AST_TYPE.STRING:
                break;
            default:
                throw new TypeError(node.type);
        }
        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }
    traverseNode(ast, null);
}

/**
 * TODO:这里expression有些疑惑
 * 将ast进行转化
 * @param {*} ast 
 */
function transformer(ast) {
    const newAst = {
        type: AST_TYPE.PROGRAM,
        body: []
    }
    ast._context = newAst.body;
    traverser(ast, {
        [AST_TYPE.NUMBER]: {
            entry(node, parent) {
                parent._context.push({
                    type: AST_TYPE.NUMBER,
                    value: node.value
                })
            }
        },
        [AST_TYPE.STRING]: {
            entry(node, parent) {
                parent._context.push({
                    type: AST_TYPE.STRING,
                    value: node.value
                })
            }
        },
        [AST_TYPE.CALLEXPRESSION]: {
            entry(node, parent) {
                let expression = {
                    type: AST_TYPE.CALLEXPRESSION,
                    callee: {
                        type: AST_TYPE.IDENTIFIER,
                        name: node.name
                    },
                    arguments: []
                }
                node._context = expression.arguments;
                if (parent.type !== AST_TYPE.CALLEXPRESSION) {
                    expression = {
                        type: AST_TYPE.EXPRESSIONSTAMENT,
                        expression: expression
                    }
                }
                parent._context.push(expression);
            }
        }
    })
    return newAst;
}

function codeGenerator(node) {
    switch (node.type) {
        case AST_TYPE.PROGRAM:
            console.log(node.body.map(codeGenerator).join('\n'))
            return node.body.map(codeGenerator).join('\n');
        case AST_TYPE.EXPRESSIONSTAMENT:
            return codeGenerator(node.expression) + ';';
        case AST_TYPE.CALLEXPRESSION:
            return codeGenerator(node.callee) + "(" +
                node.arguments.map(codeGenerator).join(", ")
                + ")";
        case AST_TYPE.IDENTIFIER:
            return node.name;
        case AST_TYPE.NUMBER:
            return node.value;
        case AST_TYPE.STRING:
            return `"${node.value}"`
        default:
            throw new TypeError(node.type)
    }
}

function compiler(input){
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    const newAst = transformer(ast);
    const output = codeGenerator(newAst);
    return output;
}

module.exports = {
    tokenizer,
    parser,
    traverser,
    transformer,
    codeGenerator,
    compiler,
  };