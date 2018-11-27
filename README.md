# html-webpack-insert-plugin

Insert text into the head or body of your HTML

## Installation

You must be running webpack 4.

```bash
npm install --save-dev html-webpack-insert-plugin
```

## Usage

Require the plugin in your webpack config

```javascript
import HtmlWebpackInsertPlugin from 'html-webpack-insert-plugin';
// or
const HtmlWebpackInsertPlugin = require('html-webpack-insert-plugin').default;
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

`html-webpack-insert-plugin` takes an array of configuration objects. Those object should have the following structure.

- `target` (optional): name of HTML page to target
- `parent`: parent element to add into, only can be `head` or `body`, default value is `head`
- `text`: text to insert into the `parent`
