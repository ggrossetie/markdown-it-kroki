# markdown-it-kroki

> This library was designed to embed [Kori.io](https://kroki.io/) diagram into [Marp](https://marp.app/) Slide-deks!!


This library is a pugin for markdown-it to embed figure is created by textual syntax.
To use this package, You can embed **Software Diagram** (like uml) is written by **code** in Marp Slides-deck.

See marp sample code.

## Sample

    ---
    marp: true
    ---


    ## plantuml

    ```plantuml[platuml image]
    @startuml
    left to right direction
    actor Guest as g
    package Professional {
    actor Chef as c
    actor "Food Critic" as fc
    }
    package Restaurant {
    usecase "Eat Food" as UC1
    usecase "Pay for Food" as UC2
    usecase "Drink" as UC3
    usecase "Review" as UC4
    }
    fc --> UC4
    g --> UC1
    g --> UC2
    g --> UC3
    @enduml
    ```

![plantuml-sample](img/plantuml-sample.png)

If you want to write daigram, you write Diagram Language (like [plantuml](https://plantuml.com/), [mermaid.js](https://mermaid-js.github.io/mermaid/#/)) with in fenced code block.

## How to install

You can install `npm install` command like bellow.

```bash
npm install -D @kazumatu981/markdown-it-kroki
```

## How to use

Here is the how to use `markdow-it-kroki`.
This section introduce how to create Marp slides-deck project,
and introduce how to create Marp slides-deck server.

You can find deltail info in [here](https://marp.app/),
and you can learn about marp plugin eco-system, [here](https://marpit.marp.app/usage?id=extend-marpit-by-plugins).

### **[1st step]** Create Slides-deck project

First, for create slides-deck, you have to prepair to **Marp Project** directory.
So First, Create slides-deck project, and init npm package.

```bash
mkdir myslides
cd myslides

npm init -y
```

Secondary, Build Marp Environment.
Install [@marp-team/marp-cli](https://github.com/marp-team/marp-cli).

```bash
npm install -D @marp-team/marp-cli
```

> Off-course you can install as **global package** (like `npm install -g @marp-team/marp-cli`), or **run at-once** (like `npx`).

### **[2nd step]** Download this project and install

```bash
git clone https://github.com/kazumatu981/markdown-it-kroki.git

cd myslides
npm install -D path/to/markdown-it-kroki
```


### **[3rd step]** Create `marp.config.js`.

Here is the configuration file for **Marp**.

```javascript
module.exports = {
    inputDir: './slides',
    engine: ({ marp }) => marp.use(require('@kazumatu981/markdown-it-kroki'), {
        entrypoint: "https://kroki.io",
    })
}
```

### **[4th step]** Create your slides

On `slies` directory. you create slides-deck. like this.

    ---
    marp: true
    ---


    ## mermaid

    ```mermaid[mermaid image]
    flowchart TD
        Start --> Stop
    ```

### **[5th step]** run server

Run marp server.

```bash
marp -s -c marp.config.js
```

## Detail

### Syntax of Markdown

#### Diagram Language

You have to write diagram language by [fenced code block](https://spec.commonmark.org/0.30/#fenced-code-blocks) syntax, start with **triple back quot** and after that the language.

    ```plantuml

This package depends on kroki.io.
If you want to know which is **supported diagram language**,
you will see in [Kroki.io official web site (https://kroki.io/)](https://kroki.io/).

#### Alt Text

You can write Alt-text attribute to IMG tag in HTML.
Write in `square blacket` after **Diagram Language**.

    ```mermaid [check your network config..]

### Options of `constructor`

| property-name    | type     | mean                                                   | defaul value              |
| ---------------- | -------- | ------------------------------------------------------ | ------------------------- |
| `entrypoint`     | `string` | The entry point for Kroki server.                      | `'https://kroki.io'`      |
| `containerClass` | `string` | class name of container (`DIV`-tag `class` attribute). | `'kroki-image-container'` |
| `imageFormat`    | `string` | image format of diagram. see [here](https://kroki.io/) | `'svg'`                   |
| `useImg` | `boolean` | use `<img>` tag for embed diagram. ( *for compatibility for past version* ) | `false` |
