# html-webpack-insert-text-plugin

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier) [![CircleCI](https://img.shields.io/circleci/project/github/hipstersmoothie/html-webpack-insert-text-plugin/master.svg?style=for-the-badge)](https://circleci.com/gh/hipstersmoothie/html-webpack-insert-text-plugin) [![npm](https://img.shields.io/npm/v/html-webpack-insert-text-plugin.svg?style=for-the-badge)](https://www.npmjs.com/package/html-webpack-insert-text-plugin) [![npm](https://img.shields.io/npm/dt/html-webpack-insert-text-plugin.svg?style=for-the-badge)](https://www.npmjs.com/package/html-webpack-insert-text-plugin)

Insert text into the head or body of your HTML

## Installation

You must be running webpack 4.

```bash
npm install --save-dev html-webpack-insert-text-plugin
```

## Usage

Require the plugin in your webpack config

```javascript
import HtmlWebpackInsertPlugin from 'html-webpack-insert-text-plugin';
// or
const HtmlWebpackInsertPlugin = require('html-webpack-insert-text-plugin')
  .default;
```

Add the plugin to your webpack config as follows

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackInjectPlugin([
    {
      target: 'index.html',
      parent: 'head',
      text: 'body { background: red; }'
    },
    {
      target: 'index.html',
      parent: 'body',
      text: '<script>alert('foo')</script>'
    }
  ])
];
```

## Structure

`html-webpack-insert-text-plugin` takes an array of configuration objects. Those object should have the following structure.

- `target` (optional): name of HTML page to target
- `parent`: parent element to add into, only can be `head` or `body`, default value is `head`
- `text`: text to insert into the `parent`
