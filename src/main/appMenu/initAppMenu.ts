import {Menu} from "electron";

export const initAppMenu = () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([]));
};
