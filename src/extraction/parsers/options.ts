export interface ExtractionHTMLOptions {
  /**
   * HTML attributes to extract
   *
   * @default ['title', 'alt', 'placeholder', 'label', 'aria-label']
   */
  attributes?: string[]

  /**
   * HTML tags to be ignored
   *
   * @default ['script', 'style']
   */
  ignoredTags?: string[]

  /**
   * HTML tags to be ignored by attributes
   * ['th:text', 'th:utext']
   * @default []
   */
  ignoredTextByAttr?: string[]

  /**
   * Extract Vue v-bind syntax
   *
   * @default true
   */
  vBind?: boolean

  /**
   * TODO: Extract inline text in HTML
   *
   * @default true
   */
  inlineText?: boolean
}

export interface ExtractionBabelOptions {
  /**
   * HTML tags to be ignored
   *
   * @default ['class', 'className', 'key', 'style', 'ref', 'onClick']
   */
  ignoredJSXAttributes?: string[]

  /**
   * Replace some special syntax to pass AST check
   */
  replaceRegex?: string[]
}
