# Solid Hot Loader

This loader is intended to wrap your Solid Components for HMR automatically. At this time this plugin cannot preserve downstream state so the Component and all its children are replaced.

## Installation

```bash
# NPM
$ npm install --save-dev solid-hot-loader
```

## Usage

You need to add this library to your webpack config. Note that you should carefuly set webpack's [rule condition](https://webpack.js.org/configuration/module/#rule-conditions) so that `solid-hot-loader` is only used for actual component files.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx/,
        use: ['solid-hot-loader'],
        // If and only if all your components are in `path/to/components` directory
        include: path.resolve(__dirname, 'path/to/components')
      }
    ]
  }
}
```

And you have to export each component as default export.

```js
export default MyComponent;
```
