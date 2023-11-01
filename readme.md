# Code Enhance

A vscode toolkit that make coding more comfortable.

## Color Theme

### Supported languages and file types

|  Language  | Dark | Light |   VSCode Extension   |
| :--------: | :--: | :---: | :------------------: |
|   Ignore   |  ✔️  |  ✔️   |       build-in       |
| JavaScript |  ✔️  |  ❌   |       build-in       |
|    Json    |  ✔️  |  ❌   |       build-in       |
|  Markdown  |  ✔️  |  ❌   |       build-in       |
| Properties |  ✔️  |  ❌   |       build-in       |
| TypeScript |  ✔️  |  ❌   |       build-in       |
|    Yaml    |  ✔️  |  ❌   | `redhat.vscode-yaml` |

### Color theme design philosophy

As for the color,
the dark theme is designed like chalk writing on blackboard,
while the light theme is designed as colored pen writing on paper.
The color scheme is designed as the rainbow,
which is listed in the table below.

<style>
  div.box {
    width:6rem; 
    height:2rem; 
    display: flex;
    align-items: center;
    justify-content: center;
    color: #232323;
  }

  div.red {background-color: #d16d6d;}
  div.orange {background-color: #e8a043;}
  div.yellow {background-color: #f7c42a;}
  div.grass {background-color: #7ba74a;}
  div.green {background-color: #548759;}
  div.cyan {background-color: #6fcad8;}
  div.blue {background-color: #34ade6;}
  div.purple {background-color: #b879dc;}

  div.grey {background-color: #d4d2c6;}
  div.dim {background-color: #5c6063;}
</style>

|                Color                 | Code Type                 |
| :----------------------------------: | :------------------------ |
|    <div class="box red">Red</div>    | Language keywords         |
| <div class="box orange">Orange</div> | Class / Type / Enum names |
| <div class="box yellow">Yellow</div> | Functions and methods     |
|  <div class="box grass">Grass</div>  | Strings and config values |
|  <div class="box green">Green</div>  | Documentation comments    |
|   <div class="box cyan">Cyan</div>   | Operator and annotations  |
|   <div class="box blue">Blue</div>   | Numbers and constants     |
| <div class="box purple">Purple</div> | Namespace and enum values |
|   <div class="box grey">Grey</div>   | Properties and variables  |
|    <div class="box dim">Dim</div>    | Normal comments           |

As for the font style,
functional programming aspects are in normal style,
while object oriented programming aspects are more likely to be italic,
and keywords and special aspects are more likely to be bold.

### CJK comment optimization

There is a unique CJK mode color theme
on each of the dark mode and the light mode.
If you are using the CJK languages (Chinese, Japanese and Korean) for comments,
Such mode will make the comment normal rather than italic,
which will make characters in such languages more elegant,
and improve the coding experience.

<style>
  div.outline {
    text-align:center;
    font-size: 2rem;
    padding: 1rem 1rem 2.5rem 1rem;
  }
</style>

> <div style="opacity:25%;">encoding: utf8, direction: ltr</div>
> <div class="outline">横平竖直</div>

## License: MIT

This project is licensed under the [MIT License](./license.txt).
It's just a tool. Feel free to use.
