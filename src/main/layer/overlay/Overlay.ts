import {OverlaySettings} from "../../../common/replicant/OverlaySettings";

export type Overlay = {
  apply(settings?: OverlaySettings): void;
  reload(id: string): void;
  reloadAll(): void;
  zoomIn(id: string): void;
  zoomOut(id: string): void;
};
