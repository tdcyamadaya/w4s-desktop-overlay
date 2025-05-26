import {LayerProperties} from "../replicant/LayerProperties";

export type MessageMap = {
  openLayer: {data: LayerProperties};
  showLayerSettingsWindow: {data: string};
  reload: {data: string};
  reloadAll: {data: unknown};
  version: {data: string};

  "titlebar:minimize": {data: unknown};
  "titlebar:maximize": {data: unknown};
  "titlebar:close": {data: unknown};
  "titlebar:isMaximized": {data: boolean};
};
