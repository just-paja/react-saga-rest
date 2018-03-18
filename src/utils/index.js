import * as exenv from 'exenv';

export const isOnServer = () => !exenv.canUseDOM;

export default { isOnServer };
