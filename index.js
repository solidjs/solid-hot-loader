const loaderUtils = require('loader-utils');

function loadHmr(file) {
  return `
    import { createSignal, sample } from "solid-js";
    import Comp from ${file};

    const [s, set] = createSignal(Comp),
      Wrapped = props => {
        let c;
        return () => (c = s()) && sample(() => c(props));
      };

    export default Wrapped;

    if (module.hot) {
      module.hot.accept(${file}, () => set(Comp));
    }
  `;
}

module.exports = function load() {};

module.exports.pitch = function pitch(remainingRequest) {
  const file = loaderUtils.stringifyRequest(this, '!!' + remainingRequest);
  const isProduction = this.minimize || process.env.NODE_ENV === 'production';

  if (this.cacheable) {
    this.cacheable();
  }

  if (isProduction) {
    return `export { default } from ${file};`;
  }

  return loadHmr(file);
};