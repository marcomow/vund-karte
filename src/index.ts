import { createMap } from "./methods/createMap";

const init: () => Promise<void> = async (): Promise<void> => {
    createMap();
}
init();