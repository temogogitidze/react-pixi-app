import { Assets, type Texture } from "pixi.js";
import { ASSET_KEYS } from "../../pixi/assets/manifest";

export default function Car() {
    const texture = Assets.get<Texture>(ASSET_KEYS.car);
    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            x={240}
            y={240}
            anchor={0.5}
            rotation={Math.PI / 2}
        />
    );
}
