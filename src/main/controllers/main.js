import {franchiseController} from './franchise';
import {seasonController} from './season';

export function initializeIpcControllers() {
  franchiseController();
  seasonController();
}

// module.exports = {
//   initializeIpcControllers,
// };