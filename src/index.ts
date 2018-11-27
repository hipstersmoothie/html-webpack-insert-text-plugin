import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { Compiler } from 'webpack';

type Parent = 'head' | 'body';
interface IAsset {
  target: string;
  parent: Parent;
  text: string;
}

const filter = (assets: IAsset[], parent: Parent, target?: string) =>
  assets
    .filter(item => item.parent === parent)
    .filter(item => !target || item.target === target)
    .map(item => item.text)
    .join('\n');

const insert = (html: string, parent: Parent, content: string) => {
  const tag = parent === 'body' ? `</${parent}>` : `<${parent}>`;
  const tagIndex = html.indexOf(tag);

  return [html.slice(0, tagIndex), content, html.slice(tagIndex)].join('');
};

export default class HtmlWebpackInsertTextPlugin {
  private readonly assets: IAsset[];

  constructor(config: IAsset[]) {
    if (config.length === 0) {
      throw new TypeError('Need asset definitions');
    }

    this.assets = config;
  }

  addAssets = (
    htmlPluginData: HtmlWebpackPlugin.BeforeEmitResponse,
    parent: Parent
  ) => {
    const content = filter(
      this.assets,
      parent,
      htmlPluginData.plugin.options.filename
    );

    htmlPluginData.html = insert(htmlPluginData.html, parent, content);
  };

  apply = (compiler: Compiler) => {
    compiler.hooks.compilation.tap(
      'HtmlWebpackInsertTextPlugin',
      compilation => {
        const hooks = HtmlWebpackPlugin.getHooks(compilation);

        hooks.beforeEmit.tap('HtmlWebpackInsertTextPlugin', htmlPluginData => {
          this.addAssets(htmlPluginData, 'head');
          this.addAssets(htmlPluginData, 'body');

          return htmlPluginData;
        });
      }
    );
  };
}
