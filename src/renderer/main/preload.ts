import {Titlebar, TitlebarColor} from "custom-electron-titlebar";
import {contextBridge, ipcRenderer} from "electron";

import icon from "../../../assets/icon.svg";
import {createMessageSender} from "../../common/lib/electron-message/createMessageSender";
import {createMessageSubscriber} from "../../common/lib/electron-message/createMessageSubscriber";
import {createChildReplicant} from "../../common/lib/electron-replicant/createChildReplicant";
import {createCachedReplicantFactory} from "../../common/lib/electron-replicant/createReplicantCache";
import {MessageMap} from "../../common/message/MessageMap";
import {LayerProperties} from "../../common/replicant/LayerProperties";
import {ReplicantMap} from "../../common/replicant/ReplicantMap";
import {API} from "./api";

const repFactory = createCachedReplicantFactory<ReplicantMap>({
  createReplicant: (name) => {
    return createChildReplicant(name, {
      sender: ipcRenderer,
      subscriber: ipcRenderer,
    });
  },
});
const msgSender = createMessageSender<MessageMap>({sender: ipcRenderer});
const msgSubscriber = createMessageSubscriber<MessageMap, unknown>({
  subscriber: ipcRenderer,
});

window.addEventListener("DOMContentLoaded", () => {
  const titlebar = new Titlebar({
    itemBackgroundColor: TitlebarColor.fromHex("#00695C"),
    backgroundColor: TitlebarColor.fromHex("#00695C"),
    icon,
  });

  const baseTitle = "W4S Desktop Overlay";

  titlebar.updateTitle(baseTitle);

  msgSubscriber.on("version", (_, v) => {
    titlebar.updateTitle(`${baseTitle} ${v}`);
  });

  msgSender.send("version");
});

const api: API = {
  replicant(name) {
    return repFactory.createReplicant(name);
  },
  reload(id) {
    msgSender.send("reload", id);
  },
  reloadAll() {
    msgSender.send("reloadAll");
  },
  zoomIn(id) {
    msgSender.send("zoomIn", id);
  },
  zoomOut(id) {
    msgSender.send("zoomOut", id);
  },
  subscribeOpenLayer(listener) {
    const l = (_: unknown, v: LayerProperties) => listener(v);
    msgSubscriber.on("openLayer", l);
    return () => msgSubscriber.off("openLayer", l);
  },
  showLayerSettingsWindow(id) {
    msgSender.send("showLayerSettingsWindow", id);
  },
};

contextBridge.exposeInMainWorld("api", api);
