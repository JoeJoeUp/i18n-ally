import path from 'path'
import fs from 'fs'
import { workspace, FileSystemWatcher, TextDocument } from 'vscode'
import YAML from 'js-yaml'
import { Framework, ScopeRange } from './base'
import { Config, Global } from '~/core'
import { LanguageId, File, Log } from '~/utils'
import { DefaultDynamicExtractionsRules, DefaultExtractionRules, extractionsParsers } from '~/extraction'

const CustomFrameworkConfigFilename = './.vscode/i18n-ally-custom-framework.yml'

interface CustomFrameworkConfig {
  languageIds?: LanguageId[] | LanguageId
  usageMatchRegex?: string[] | string
  scopeRangeRegex?: string
  refactorTemplates?: string[]
  monopoly?: boolean
  // supportAutoExtraction?: LanguageId[] | LanguageId

  keyMatchReg?: string[] | string // deprecated. use "usageMatchRegex" instead
}

class CustomFramework extends Framework {
  id = 'custom'
  display = 'Custom'

  private watchingFor: string | undefined
  private watcher: FileSystemWatcher | undefined
  private data: CustomFrameworkConfig | undefined

  detection = {
    none: (_: string[], root: string) => {
      return this.load(root)
    },
  }

  load(root: string) {
    this.startWatch(root)
    const filename = path.resolve(root, CustomFrameworkConfigFilename)

    if (!fs.existsSync(filename)) {
      this.data = undefined
      return false
    }

    try {
      const raw = File.readSync(filename)
      this.data = YAML.load(raw) as any
      Log.info(`🍱 Custom framework setting loaded. \n${JSON.stringify(this.data, null, 2)}\n`)
      return true
    }
    catch (e) {
      Log.error(e)
      this.data = undefined
      return false
    }
  }

  get languageIds(): LanguageId[] {
    let id = this.data?.languageIds || []
    if (typeof id === 'string')
      id = [id]

    return id
  }

  get usageMatchRegex(): string[] {
    let id = this.data?.usageMatchRegex ?? this.data?.keyMatchReg ?? []
    if (typeof id === 'string')
      id = [id]

    return id
  }

  supportAutoExtraction = [
    'html',
    'java',
  ]

  // @ts-expect-error
  get monopoly() {
    return this.data?.monopoly || false
  }

  set monopoly(_) {}

  refactorTemplates(keypath: string) {
    return (this.data?.refactorTemplates || ['$1'])
      .map(i => i.replace(/\$1/g, keypath))
  }

  getScopeRange(document: TextDocument): ScopeRange[] | undefined {
    if (!this.data?.scopeRangeRegex)
      return undefined

    if (!this.languageIds.includes(document.languageId as any))
      return

    const ranges: ScopeRange[] = []
    const text = document.getText()
    const reg = new RegExp(this.data.scopeRangeRegex, 'g')

    for (const match of text.matchAll(reg)) {
      if (match?.index == null)
        continue

      // end previous scope
      if (ranges.length)
        ranges[ranges.length - 1].end = match.index

      // start new scope if namespace provides
      if (match[1]) {
        ranges.push({
          start: match.index,
          end: text.length,
          namespace: match[1] as string,
        })
      }
    }

    return ranges
  }

  detectHardStrings(doc: TextDocument) {
    const lang = doc.languageId
    const text = doc.getText()

    if (lang === 'html') {
      return extractionsParsers.html.detect(
        text,
        DefaultExtractionRules,
        DefaultDynamicExtractionsRules,
        Config.extractParserHTMLOptions,
        // <script>
        script => extractionsParsers.babel.detect(
          script,
          DefaultExtractionRules,
          DefaultDynamicExtractionsRules,
          Config.extractParserBabelOptions,
          // (path, recordIgnore) => {
          //   // eslint-disable-next-line no-console
          //   // console.log('path:', path.toString())
          //   // const callee = path.get('callee')
          //   // if (callee.node.name === 't' || callee.node.name === 'scopedT')
          //   recordIgnore(path)
          // },
        ),
      )
    }
    else {
      return extractionsParsers.babel.detect(
        text,
        DefaultExtractionRules,
        DefaultDynamicExtractionsRules,
      )
    }
  }

  startWatch(root?: string) {
    if (this.watchingFor) {
      this.watchingFor = undefined
      if (this.watcher)
        this.watcher.dispose()
    }
    this.watchingFor = root
    if (root) {
      const filename = path.resolve(root, CustomFrameworkConfigFilename)

      this.watcher = workspace.createFileSystemWatcher(filename)

      const reload = () => {
        Log.info('\n🍱 Custom framework setting changed. Reloading...')
        this.watchingFor = undefined
        if (this.watcher) {
          this.watcher.dispose()
          Global.update()
        }
      }

      this.watcher.onDidChange(reload)
      this.watcher.onDidCreate(reload)
      this.watcher.onDidDelete(reload)
    }
  }
}

export default CustomFramework
