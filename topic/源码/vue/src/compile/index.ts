import { BaseObject, ASTElement } from "../types";

/**
 * 负责编译模版的类
 */
export class Compile {
  constructor(template: string, options: BaseObject) {
    const ast = this.parse(template.trim(), options) // 生成抽象语法树
    if (options.optimize !== false) {
      this.optimize(ast, options) // 优化语法树结构
    }
    const code = this.generate(ast, options) // 代码生成
  }
  parse(template: string, options: BaseObject): ASTElement {
    return {} as ASTElement
  }
  optimize(ast: ASTElement, options: BaseObject) {
    throw new Error("Method not implemented.");
  }
  generate(ast: ASTElement, options: BaseObject): BaseObject {
    const code = ''
    return {
      render: `with(this){${code}}`
    }
  }
}