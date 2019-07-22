export default attr => state => ({
  ...state,
  [attr]: !state[attr]
})
