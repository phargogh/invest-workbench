import path from 'path';
import { ipcRenderer } from 'electron';

let USER_DATA = '';

ipcRenderer.invoke('user-data')
.then(response => {
  USER_DATA = response;
});

export const fileRegistry = {
  //  for storing state snapshot files
  CACHE_DIR: path.join(USER_DATA, 'state_cache'),

  // for saving datastack json files prior to investExecute
  TEMP_DIR: path.join(USER_DATA, 'tmp'),

  // to track local, alternate invest binaries
  INVEST_REGISTRY_PATH: path.join(USER_DATA, 'invest_registry.json'),

  // UI spec data
  INVEST_UI_DATA: path.join(__dirname, 'ui_data'),
};
