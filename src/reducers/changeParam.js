export default (attr, actionAttr) => (state, action) => ({
  ...state,
  [attr]: action[actionAttr || attr]
})
