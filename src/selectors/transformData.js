import { createSelector } from 'reselect';

const transformItem = (transformers, data) => item => transformers.reduce(
  (aggr, transformer) => {
    if (transformer instanceof Function) {
      return transformer(aggr);
    }
    const transformerSelection = transformer.select ? data.shift() : null;
    return transformer.transform(aggr, transformerSelection);
  }, item);

const getTransformerList = (transformOptions) => {
  const transformerList = (transformOptions instanceof Array ?
    transformOptions :
    transformOptions.transformers
  );
  return transformerList || [];
};

const getTransformerSelectors = transformers =>
  transformers.filter(transformer => !!transformer.select).map(transformer => transformer.select);

export default (selector, options) => {
  const transformers = getTransformerList(options);
  return createSelector(
    [selector, ...getTransformerSelectors(transformers)],
    (state, ...transformationData) => {
      const transform = transformItem(transformers, transformationData);
      if (state.data instanceof Array) {
        const transformedItems = state.data.map(transform);
        if (options.sort) {
          return transformedItems.sort(options.sort);
        }
        return transformedItems;
      }
      return transform(state.data);
    }
  );
};
