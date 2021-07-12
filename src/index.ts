import { createMap } from "./methods/createMap";
import { initPreloader } from "./methods/initPreloader";

const init: () => Promise<void> = async (): Promise<void> => {
    initPreloader();
    createMap();
}
init();