import { createMap } from "./methods/createMap";
import { initPreloader } from "./methods/initPreloader";
import { registerServiceWorker } from "./methods/registerServiceWorker";

const init: () => Promise<void> = async (): Promise<void> => {
    registerServiceWorker();
    initPreloader();
    createMap();
}
init();