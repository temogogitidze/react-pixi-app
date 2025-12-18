import carSrc from "../../assets/RACECAR.png";

export const ASSET_KEYS = {
    car: "core/car",
} as const;

type AssetDef = { alias: string; src: string };
type BundleDef = { name: string; assets: AssetDef[] };
export type AssetsManifest = { bundles: BundleDef[] };

export const manifest: AssetsManifest = {
    bundles: [
        {
            name: "core",
            assets: [{ alias: ASSET_KEYS.car, src: carSrc }],
        },
    ],
};
