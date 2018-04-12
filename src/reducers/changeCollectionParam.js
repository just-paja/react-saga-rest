import pageReset from './pageReset';

export default attr => (state, action) => pageReset({
  ...state,
  [attr]: action[attr],
});
