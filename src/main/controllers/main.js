import {franchiseController} from './franchise';
import {seasonController} from './season';
import { playerController } from './player';
import { scoutController } from './scout';

export function initializeIpcControllers() {
  franchiseController();
  seasonController();
  playerController();
  scoutController();
}

// module.exports = {
//   initializeIpcControllers,
// };