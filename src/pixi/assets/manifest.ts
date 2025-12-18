import type { Manifest } from "pixi.js";
import carSrc from "../../assets/RACECAR.png";

export const ASSET_KEYS = {
    car: "core/car",
} as const;

export const manifest: Manifest = {
    bundles: [
        {
            name: "core",
            assets: [{ alias: ASSET_KEYS.car, src: carSrc }],
        },
    ],
};
