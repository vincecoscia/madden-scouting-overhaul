import {franchiseController} from './franchise';
import {seasonController} from './season';
import { playerController } from './player';
import { scoutController } from './scout';
import { draftPickController } from './draftPick';

export function initializeIpcControllers() {
  franchiseController();
  seasonController();
  playerController();
  scoutController();
  draftPickController();
}

// module.exports = {
//   initializeIpcControllers,
// };