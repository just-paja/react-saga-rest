import pageReset from './pageReset'

export default (attr, actionAttr) => (state, action) => pageReset({
  ...state,
  [attr]: action[actionAttr || attr]
})
