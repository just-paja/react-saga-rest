import { createSelector } from 'reselect'

const callStackTransform = (transformer, item, dataStack) => {
  const transformerArgs = []
  if (transformer.select) {
    transformerArgs.push(dataStack.shift())
  }
  return transformer.transform(item, ...transformerArgs)
}

const transformItem = (transformers, data) => (item) => {
  const dataStack = data.slice()
  return transformers.reduce((aggr, transformer) => (
    (transformer instanceof Function)
      ? transformer(aggr)
      : callStackTransform(transformer, aggr, dataStack)
  ), item)
}

const getTransformerList = (transformOptions) => {
  const transformerList = (transformOptions instanceof Array
    ? transformOptions
    : transformOptions.transformers
  )
  return transformerList || []
}

const getTransformerSelectors = transformers => transformers.filter(transformer => !!transformer.select).map(transformer => transformer.select)

const transformArray = (transform, data, options) => {
  const transformedItems = data.map(transform)
  return !(options instanceof Array) && options.sort
    ? transformedItems.sort(options.sort)
    : transformedItems
}

export default (source, options) => {
  const transformers = getTransformerList(options)
  return createSelector(
    [source, ...getTransformerSelectors(transformers)],
    (state, ...transformationData) => {
      const transform = transformItem(transformers, transformationData)
      return (state.data instanceof Array)
        ? transformArray(transform, state.data, options)
        : transform(state.data)
    }
  )
}
