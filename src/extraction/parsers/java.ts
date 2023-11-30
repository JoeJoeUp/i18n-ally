import { BaseJavaCstVisitorWithDefaults, LiteralCtx, parse } from 'java-parser'
import { ExtractionJavaOptions } from './options'
import { DetectionResult } from '~/core'

const defaultOptions: Required<ExtractionJavaOptions> = {
  replaceRegex: [],
}

// Use "BaseJavaCstVisitor" if you need to implement all the visitor methods yourself.
class HardcodePositionCollector extends BaseJavaCstVisitorWithDefaults {
  customResult: DetectionResult[]
  constructor() {
    super()
    this.customResult = []
    this.validateVisitor()
  }

  literal(ctx: LiteralCtx) {
    if (ctx.StringLiteral) {
      this.customResult.push({
        text: ctx.StringLiteral[0].image,
        fullText: ctx.StringLiteral[0].image,
        start: ctx.StringLiteral[0].startOffset,
        end: ctx.StringLiteral[0].endOffset + 1,
        source: 'html-inline',
      })
    }
  }
}

export function detect(
  input: string,
  //   rules: ExtractionRule[] = DefaultExtractionRules,
  //   dynamicRules: ExtractionRule[] = DefaultDynamicExtractionsRules,
  userOptions: ExtractionJavaOptions = {},
): DetectionResult[] {
  const {
    replaceRegex,
  } = Object.assign({}, defaultOptions, userOptions)

  //   const detections: DetectionResult[] = []

  // TODO: Currently only deals with the first Regex in the replaceRegex array
  if (replaceRegex.length > 0)
    input = input.replace(new RegExp(replaceRegex[0], 'gm'), 'undefined')

  const cst = parse(input)
  const hardcodePositionCollector = new HardcodePositionCollector()
  // The CST result from the previous code snippet
  hardcodePositionCollector.visit(cst)
  //   hardcodePositionCollector.customResult.forEach((result) => {
  //     // eslint-disable-next-line no-console
  //     // Log.info(`${result}`)
  //     detections.push(result)
  //   })

  return hardcodePositionCollector.customResult
}
