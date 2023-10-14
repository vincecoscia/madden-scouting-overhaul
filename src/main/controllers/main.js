import {franchiseController} from './franchise';
import {seasonController} from './season';
import { playerController } from './player';

export function initializeIpcControllers() {
  franchiseController();
  seasonController();
  playerController();
}

// module.exports = {
//   initializeIpcControllers,
// };