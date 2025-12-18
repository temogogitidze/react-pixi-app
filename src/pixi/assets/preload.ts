import { Assets } from "pixi.js";
import { manifest } from "./manifest";

let corePromise: Promise<void> | null = null;

export function preloadCoreAssets() {
    if (corePromise) return corePromise;

    corePromise = (async () => {
        await Assets.init({ manifest });
        await Assets.loadBundle("core");
    })();

    return corePromise;
}
