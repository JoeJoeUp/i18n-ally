![](https://github.com/lokalise/i18n-ally/raw/main/screenshots/full-logo-new.png?raw=true)

## Features

### Inline Annotations

![](https://github.com/lokalise/i18n-ally/blob/screenshots/annotation-animated.gif?raw=true)### Hover and Direct Actions

![](https://github.com/lokalise/i18n-ally/blob/screenshots/hover.png?raw=true)### Manage All Translations in One Place

![](https://github.com/lokalise/i18n-ally/blob/screenshots/review-sidebar.png?raw=true)### [Editor UI](https://github.com/lokalise/i18n-ally/wiki/Editor-UI) & [Review System](https://github.com/lokalise/i18n-ally/wiki/Review-&-Collaboration-System)

![](https://github.com/lokalise/i18n-ally/blob/screenshots/review-editor.png?raw=true)### Extract Translations from Code

![](https://github.com/lokalise/i18n-ally/blob/screenshots/extract.png?raw=true)### Report Missing Translations

![](https://github.com/lokalise/i18n-ally/blob/screenshots/problems.png?raw=true)### Machine Translation

![](https://github.com/lokalise/i18n-ally/blob/screenshots/quick-actions.png?raw=true)### Annotations for JSON and YAML

![](https://github.com/lokalise/i18n-ally/blob/screenshots/annotation-locale.png?raw=true)### General Features

- Supports multi-root workspaces
- Supports remote development
- Supports numerous popular frameworks
- Supports [linked locale messages](https://kazupon.github.io/vue-i18n/guide/messages.html#linked-locale-messages)
- Uses i18n for the extension itself, of course. [Translation List](https://github.com/lokalise/i18n-ally#-multilingual-support)

## 🌍 Multilingual Support

This extension itself supports i18n as well. It will be auto-matched to the display language you use in your VS Code editor. We currently support the following languages.

| Language | Maintainer | Contributors |
| --- | --- | --- |
| English | [@antfu](https://github.com/antfu) | [@rubjo](https://github.com/rubjo), [@EdRands](https://github.com/EdRands) |
| Simplified Chinese (简体中文) | [@antfu](https://github.com/antfu) |  |
| Traditional Chinese (繁體中文) | [@antfu](https://github.com/antfu) |  |
| Norwegian (Norsk) |  | [@rubjo](https://github.com/rubjo) |
| Spanish (Español) |  | [@Baltimer](https://github.com/Baltimer) |
| Japanese (日本語) |  | [@isdh](https://github.com/isdh) |
| Dutch (Nederlands) |  | [@Niekvdm](https://github.com/Niekvdm), [@Excalibaard](https://github.com/Excalibaard) |
| Portuguese (Brazilian) |  | [@Ibcs16](https://github.com/Ibcs16) |
| French (Français) |  | [@Nicoxx45](https://github.com/Nicoxx45), [@eri](https://github.com/eri), [@Frank](https://github.com/FrankSAURET) |
| Swedish (Svenska) | [@vladdeSV](https://github.com/vladdeSV) |  |
| Ukrainian (Українська) |  | [@uhodav](https://github.com/uhodav) |
| Russian (Русский) |  | [@uhodav](https://github.com/uhodav) |
| German (Deutsch) | [@alexanderniebuhr](https://github.com/alexanderniebuhr) |  |
| Thai (ภาษาไทย) | [@watchakorn-18k](https://github.com/watchakorn-18k) |  |
| Turkish (Türkçe) |  | [@eri](https://github.com/eri), [@dilekerkut](https://github.com/dilekerkut) |
| Korean (한국어) |  | [@moka-ayumu](https://github.com/moka-ayumu) |
| Hungarian (Magyar) | [@Cs4K1Sr4C](https://github.com/Cs4K1Sr4C) | [@Cs4K1Sr4C](https://github.com/Cs4K1Sr4C) |

[**Help Translate**](https://github.com/lokalise/i18n-ally/wiki/Contribute#working-on-translations)

> 👨‍💻 If you would like to help a language's translation up to date, feel free to put your name in the **Maintainers** field. I will @mention you when needed. Much appreciated.

## ❤️ Thanks

This extension was inspired by [think2011/vscode-vue-i18n](https://github.com/think2011/vscode-vue-i18n), it wouldn't exist without [@think2011](https://github.com/think2011)'s great work.

Support for Vue Single File Component (SFC) is powered by [kazupon/vue-i18n-locale-message](https://github.com/kazupon/vue-i18n-locale-message), which is created by the author of vue-i18n. Thanks for making this!

### Code Contributors

My great thanks to all the awesome contributors:

## VSC扩展包

### Install

先使用yarn安装依赖

```
yarn
```

以下安装是针对VS code扩展开发需要用到的，在安装依赖时已经包含了，这里可以不执行

```
```shell
# start
npm install -g yo generator-code

# VSCE
npm install -g @vscode/vsce
```

### Package

使用以下命令可以生成`.visx`后缀的安装包，可以在vscode的扩展栏选择`Install from VSIX...`

```
# myExtension.vsix generated
vsce package
```

### Publishing

发布到VS Code的Marketplace上，这里需要填一个publisher ID，没有的话要到 m[arketplace.visualstudio.com](http://marketplace.visualstudio.com) 注册一个。

```
# <publisher id>.myExtension published to VS Code Marketplace
vsce publish
```

## 📄 License

[MIT License](https://github.com/lokalise/i18n-ally/blob/master/LICENSE) © 2021-PRESENT [Lokalise](https://github.com/lokalise)

MIT License © 2019-2020 [Anthony Fu](https://github.com/antfu)

MIT License © 2018-2019 [think2011](https://github.com/think2011)