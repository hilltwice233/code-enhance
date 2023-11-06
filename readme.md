# Code Enhance

[Deutsch](./locales/readme.de.md) |
[日本語](./locales/readme.jp.md) |
[Русский язык](./locales/readme.ru.md) |
[中文](./locales/readme.zh.md)

A vscode toolkit that make coding more comfortable.

This extension is unstable yet,
and had not been published into the vscode extension marketplace.
If you'd like to use it, please download the latest release
and `install from vsix` on your local device.

If you'd like to contribute to this project,
please read [Code of Conduct](./code_of_conduct.md) before commit your code.

## Enhanced git visualization

1. Show committer, relative time and commit summary as the suffix of a line.
2. Show committer, email and absolute time when hover on the suffix.

## Enhanced color theme for multi-languages

Supported languages and file types:

|  Language   | Dark | Light |        VSCode Extension         |
| :---------: | :--: | :---: | :-----------------------------: |
|    C/C++    |  ✔️  |  ✔️   |      `ms-vscode.cpptools`       |
|    Dart     |  ✔️  |  ✔️   |      `Dart-Code.dart-code`      |
|   Ignore    |  ✔️  |  ✔️   |            build-in             |
| JavaScript  |  ✔️  |  ❌   |            build-in             |
|    Json     |  ✔️  |  ✔️   |            build-in             |
|  Markdown   |  ✔️  |  ✔️   |            build-in             |
| Properties  |  ✔️  |  ✔️   |            build-in             |
|    Rust     |  ✔️  |  ❌   |    `rust-lang.rust-analyzer`    |
| ShellScript |  ❌  |  ✔️   | `mads-hartmann.bash-ide-vscode` |
|    Toml     |  ✔️  |  ❌   |   `tamasfe.even-better-toml`    |
| TypeScript  |  ✔️  |  ❌   |            build-in             |
|    Yaml     |  ✔️  |  ✔️   |      `redhat.vscode-yaml`       |

There is a unique CJK mode color theme
on each of the dark mode and the light mode.
If you are using the CJK languages (Chinese, Japanese and Korean) for comments,
Such mode will make the comment normal rather than italic,
which will make characters in such languages more elegant,
and improve the coding experience.

## How to Build

Make sure `npm` is available on your device and install all the dependencies.
Then run the following npm script.

```bash
npm run package
```

Such script will compile all components and output into the
[`extension`](./extension) folder.
If the process finished successfully,
then you can find a `code-enhance-x.y.z.vsix` release under the
[`extension`](./extension) folder.

## License: MIT

This project is licensed under the [MIT License](./license.txt).
It's just a tool. Feel free to use.
