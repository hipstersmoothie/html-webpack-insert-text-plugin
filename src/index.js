const HtmlWebpackPlugin = require('html-webpack-plugin');

const filter = (assets, section, target) =>
  assets
    .filter(item => item.parent === section)
    .filter(item => item.target === target)
    .map(item => item.text)
    .join('\n');

const insert = (html, tag, content) => {
  const mod = tag === 'body' ? 0 : tagIndex + tag.length;
  const tagIndex = html.indexOf(tag);

  return [
    html.slice(0, tagIndex + mod),
    content,
    html.slice(tagIndex + mod)
  ].join('');
};

export default class HtmlWebpackInjectPlugin {
  constructor(config) {
    if (config.length === 0) {
      throw new TypeError('Need asset definitions');
    }

    this.assets = config;
  }

  addAssets = (htmlPluginData, tag) => {
    const content = filter(
      this.assets,
      tag,
      htmlPluginData.plugin.options.filename
    );

    htmlPluginData.html = insert(
      htmlPluginData.html,
      tag === 'body' ? `</${tag}>` : `<${tag}>`,
      content
    );
  };

  apply = compiler => {
    compiler.hooks.compilation.tap('HtmlWebpackInjectPlugin', compilation => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation);

      hooks.beforeEmit.tap('HtmlWebpackInjectPlugin', htmlPluginData => {
        this.addAssets(htmlPluginData, 'head');
        this.addAssets(htmlPluginData, 'body');

        return htmlPluginData;
      });
    });
  };
}
